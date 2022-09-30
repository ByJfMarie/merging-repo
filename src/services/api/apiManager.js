import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AuthService from "./auth.service";
import TokenStorage from "../storage/token.storage";
import swal from "sweetalert";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const URL_REFRESH_TOKEN = "token/refresh";

const miAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiGET = (url, config) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .get(url, config)
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
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

export const apiPOST = (url, data) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .post(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = "Unknown error";
            }
        })
        .catch((error) => {
            console.log(error.response);

            state.error = "Unknown error";
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (error.response.status===401 || error.response.status===403) return state;
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

export const apiPATCH = (url, data) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .patch(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = "Unknown error";
            }
        })
        .catch((error) => {
            console.log(error.response);

            state.error = "Unknown error";
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (error.response.status===401 || error.response.status===403) return state;
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

export const apiPUT = (url, data) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .put(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = "Unknown error";
            }
        })
        .catch((error) => {
            console.log(error.response);

            state.error = "Unknown error";
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (error.response.status===401 || error.response.status===403) return state;
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

export const apiDELETE = (url, data) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .delete(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = "Unknown error";
            }
        })
        .catch((error) => {
            console.log(error.response);

            state.error = "Unknown error";
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (error.response.status===401 || error.response.status===403) return state;
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

export const apiUPLOAD = (url, data) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
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
                else networkError(state.error, 5000);
            }
            else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            }
            else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
}

const networkError = (message, timer) => {
    swal("Error", message, "error", {
        buttons: false,
        timer: {timer},
    }).then(() => {
        //AuthService.logout();
    })
}

// Obtain the fresh token each time the function is called
/*function getAccessToken(){
    return TokenStorage.getLocalAccessToken();
}
function getRefreshToken() {
    return TokenStorage.getRefreshToken();
}*/

// Use interceptor to inject the token to requests
miAPI.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${TokenStorage.getAccessToken()}`;
    return request;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest =>
    axios
        .post(BASE_URL+URL_REFRESH_TOKEN,
            {
                token: TokenStorage.getAccessToken(),
                refresh_token: TokenStorage.getRefreshToken()
            })
        .then(tokenRefreshResponse => {
            TokenStorage.setAccessToken(tokenRefreshResponse.data.acces_token);
            TokenStorage.setRefreshToken(tokenRefreshResponse.data.refresh_token);

            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.acces_token;
            return Promise.resolve();
        })
        .catch(() => {

            //Don't display error when not logged in
            const token = TokenStorage.getAccessToken();
            if (!token) {
                AuthService.logout();
                return;
            }

            let error = "Your session has expired!";
            //if (error.response && error.response.statusText) error = _error.response.statusText;
            swal("Error", error, "error", {
                buttons: false,
                timer: 2000,
            }).then(() => {
                AuthService.logout();
            });
        });

// Instantiate the interceptor
createAuthRefreshInterceptor(
    miAPI,
    refreshAuthLogic,
    {
        statusCodes: [ 401, 403 ]
    }
);

export default miAPI;