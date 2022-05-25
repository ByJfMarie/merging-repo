import axios from 'axios';
import createAuthRefreshInterceptor, {AxiosAuthRefreshOptions} from 'axios-auth-refresh';
import AuthService from "./auth.service";

export const BASE_URL = "http://localhost:9999/";
export const URL_REFRESH_TOKEN = "v2/token/refresh";

const miAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

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
            AuthService.logout();
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