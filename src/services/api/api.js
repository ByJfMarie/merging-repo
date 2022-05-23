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
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
const requestArray = [];

miAPI.interceptors.request.use(

    async config => {
        let token = await TokenService.getLocalAccessToken();
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

    function (response) {
        if (requestArray.length !== 0) {
            requestArray.forEach(function (x, i) {
                if (response.config.url === x.url) {
                    requestArray.splice(i, 1);
                }
            });
        }
        return response;
    },

    function (error) {
        const originalRequest = error.config;
        requestArray.push(originalRequest);
        let reqData = {
            token: TokenService.getLocalAccessToken(),
            refresh_token: TokenService.getLocalRefreshToken()
        };
        if (error.response.status === 401 || error.response.status === 403) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;
                return axios({
                    method: 'post',
                    url: BASE_URL+URL_REFRESH_TOKEN,
                    data: reqData
                })
                    .then(res => {
                        let response = res.data;
                        if (res.status === 200) {
                            TokenService.updateLocalAccessToken(response.acces_token);
                            TokenService.updateLocalAccessTokenExp(response.access_token_exp);
                            TokenService.updateLocalRefreshToken(response.refresh_token);
                            if (requestArray.length !== 0) {
                                requestArray.forEach(x => {
                                    try {
                                        x.headers.Authorization = `Bearer ${response.acces_token}`;
                                        miAPI(x)
                                    } catch (e) {
                                        console.log(e)
                                    }
                                });
                            }
                            return miAPI(originalRequest);
                        }
                    })
                    .catch(err => {
                        let error = "Your session has expired!";
                        //if (error.response && error.response.statusText) error = _error.response.statusText;
                        swal("Erreur", error, "error", {
                            buttons: false,
                            timer: 2000,
                        }).then(() => {
                            AuthService.logout();
                        })
                        return;
                    });
            }
        }
        return Promise.reject(error);
    }
);

export default miAPI;