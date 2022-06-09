import api from "./apiManager";
import TokenStorage from "../storage/token.storage";
import UserStorage from "../storage/user.storage";

class AuthService {

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

    logout() {
        api.post( "token/logout", {}).then(response => {});
        TokenStorage.clean();
        UserStorage.clean();
        window.location.href = "/login";
    }
}

export default new AuthService();
