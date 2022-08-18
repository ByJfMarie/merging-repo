import api from "./apiManager";
import TokenStorage from "../storage/token.storage";
import UserStorage from "../storage/user.storage";

class AuthService {

    config () {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get("auth/config")
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) {
                    state.error = error.response.data.error || error.message;
                    if (error.response.status===401 || error.response.status===403) return state;
                }
                else if (error.message) {
                    state.error = error.message;
                }
            })
            .then(() => {
                return state;
            });
    }

    login (username, password) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post("auth", { username: username, password: password })
            .then((response) => {
                if (response.status === 200) {
                    TokenStorage.setToken(response.data);
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response?error.response.data:"Unknown error";;
            })
            .then (() => {
                return state;
            });
    }

    loginReference(ref, birthdate) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post("auth/ref", { reference: ref, birthdate: birthdate })
            .then((response) => {
                if (response.status === 200) {
                    TokenStorage.setToken(response.data);
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response?error.response.data:"Unknown error";;
            })
            .then (() => {
                return state;
            });
    }

    logout() {
        api.post( "token/logout", {}).then(response => {});
        TokenStorage.clean();
        UserStorage.clean();
        window.location.href = "/login";
    }
}

export default new AuthService();
