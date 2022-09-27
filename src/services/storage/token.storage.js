import secureLocalStorage from "react-secure-storage";

class TokenStorage {

    getAccessToken() {
        return secureLocalStorage.getItem("user.access_token");
    }

    /*getLocalAccessTokenExp() {
        const user = JSON.parse(localStorage.getItem("user.auth"));
        return user?.access_token_exp;
    }*/

    getRefreshToken() {
        return secureLocalStorage.getItem("user.refresh_token");
    }

    /*getToken() {
        return JSON.parse(localStorage.getItem("user.auth"));
    }*/

    setAccessToken(token) {
        secureLocalStorage.setItem("user.access_token", token);
    }

    setRefreshToken(token) {
        secureLocalStorage.setItem("user.refresh_token", token);
    }

    clean() {
        secureLocalStorage.removeItem("user.access_token");
        secureLocalStorage.removeItem("user.refresh_token");
    }
}

export default new TokenStorage();