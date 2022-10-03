import axios from 'axios';
import api from "./apiManager";
import TokenStorage from "../storage/token.storage";
import UserStorage from "../storage/user.storage";
import moment from "moment";

const login_axios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

class AuthService {

    config () {
        let state = {
            items: [],
            error: ''
        }

        return login_axios
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

    login (username, password, captcha) {
        let state = {
            items: [],
            error: ''
        }

        return login_axios
            .post("auth", { username: username, password: password, captcha: captcha })
            .then((response) => {
                //Clean Storage
                TokenStorage.clean();
                UserStorage.clean();

                if (response.status === 200) {
                    TokenStorage.setAccessToken(response.data.acces_token);
                    TokenStorage.setRefreshToken(response.data.refresh_token);

                    //Load User Settings
                    UserStorage.getUser().then();
                    UserStorage.getPrivileges().then();
                    UserStorage.getSettings().then();
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

    loginReference(ref, birthdate, captcha) {
        let state = {
            items: [],
            error: ''
        }

        if (birthdate instanceof Date) birthdate = moment(birthdate).format("YYYY-MM-DD");

        return login_axios
            .post("/auth/ref", { reference: ref, birthdate: birthdate, captcha: captcha })
            .then((response) => {
                if (response.status === 200) {
                    TokenStorage.setAccessToken(response.data.acces_token);
                    TokenStorage.setRefreshToken(response.data.refresh_token);

                    //Load User Settings
                    UserStorage.getUser().then();
                    UserStorage.getPrivileges().then();
                    UserStorage.getSettings().then();
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
