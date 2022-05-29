import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AuthService from "./auth.service";
import swal from "sweetalert";

export const BASE_URL = "http://localhost:9999/v2/";
export const URL_REFRESH_TOKEN = "token/refresh";

const miAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiGET = (url) => {
    let state = {
        items: [],
        error: ''
    }

    return miAPI
        .get(url)
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = "Unknown error";
            }
        })
        .catch((error) => {
            if (!error.status) {
                networkError();
                return;
            }
            state.error = error.response ? error.response.data : "Unknown error";
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
            if (!error.status) {
                networkError();
                return;
            }
            state.error = error.response ? error.response.data : "Unknown error";
        })
        .then(() => {
            return state;
        });
}

const networkError = () => {
    let error = "No response from the server!";
    //if (error.response && error.response.statusText) error = _error.response.statusText;
    swal("Erreur", error, "error", {
        buttons: false,
        timer: 2000,
    }).then(() => {
        AuthService.logout();
    })
}

// Obtain the fresh token each time the function is called
function getAccessToken(){
    let user = JSON.parse(localStorage.getItem("user"));
    return user?.acces_token;
}
function getRefreshToken() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
}

// Use interceptor to inject the token to requests
miAPI.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return request;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest =>
    axios
        .post(BASE_URL+URL_REFRESH_TOKEN,
            {
                token: getAccessToken(),
                refresh_token: getRefreshToken()
            })
        .then(tokenRefreshResponse => {
            const user = JSON.parse(localStorage.getItem("user"));
            user.acces_token = tokenRefreshResponse.data.acces_token;
            user.refresh_token = tokenRefreshResponse.data.refresh_token;
            localStorage.setItem("user", JSON.stringify(user));

            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.acces_token;
            return Promise.resolve();
        })
        .catch(() => {
            let error = "Your session has expired!";
            //if (error.response && error.response.statusText) error = _error.response.statusText;
            swal("Erreur", error, "error", {
                buttons: false,
                timer: 2000,
            }).then(() => {
                AuthService.logout();
            })
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