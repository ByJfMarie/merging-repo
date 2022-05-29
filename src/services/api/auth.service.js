import api from "./apiManager";
import TokenService from "./token.service";

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
                    TokenService.setUser(response.data);
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
        TokenService.removeUser();
        window.location.href = "/login";
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default new AuthService();
