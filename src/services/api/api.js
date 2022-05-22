import axios from 'axios';
import TokenService from "./token.service";
import AuthService from './auth.service';
import swal from "sweetalert";

export const BASE_URL = "http://localhost:9999/";
export const URL_USER_AUTH = "v2/auth";
export const URL_REFRESH_TOKEN = "v2/token/refresh";
export const URL_USER_LOGOUT = "v2/token/logout";

//Define the miAPI as axios
const miAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

miAPI.interceptors.request.use(

    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' +token;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Add the interceptor for the response to handle the authentication issues
// This interceptor will check if the response status is 401 and will store the
// current request. On 401, it will call the refresh token API and try to restore
// the token. On success, we will post the original request again.
miAPI.interceptors.response.use(

    res => {
        return res;
    },

    err => {
        //Log the error
        //console.log("error: "+JSON.stringify(error));
        const originalConfig = err.config;
        if (originalConfig.url !== URL_USER_AUTH && originalConfig.url !== URL_USER_LOGOUT && err.response) {

            //Access Token was expired
            if ((err.response.status == 401 || err.response.status == 403) && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    axios.post(BASE_URL+URL_REFRESH_TOKEN, {
                        token: TokenService.getLocalAccessToken(),
                        refresh_token: TokenService.getLocalRefreshToken(),
                    }).then(rs => {
                        TokenService.updateLocalAccessToken(rs.data.acces_token);
                        TokenService.updateLocalAccessTokenExp(rs.data.access_token_exp);
                        TokenService.updateLocalRefreshToken(rs.data.refresh_token);
                        return miAPI(originalConfig);
                    }).catch(error => {
                        if ((err.response.status == 401 || err.response.status == 403)) {
                            let msg = "Your session has expired!";
                            //if (error.response && error.response.statusText) error = _error.response.statusText;
                            swal("Erreur", msg, "error", {
                                buttons: false,
                                timer: 2000,
                            }).then(() => {
                                AuthService.logout();
                            })
                            return;
                        }
                        return Promise.reject(error);
                    });
                } catch (_error) {
                    let error = "Your session has expired!";
                    //if (error.response && error.response.statusText) error = _error.response.statusText;
                    swal("Erreur", error, "error", {
                        buttons: false,
                        timer: 2000,
                    }).then(() => {
                        AuthService.logout();
                    })
                    return;
                }
            }
        }

        return Promise.reject(err);
    }
);

export default miAPI;