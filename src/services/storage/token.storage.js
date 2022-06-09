/** JSON  */
import privilegesAdmin from "../../assets/json/privilegesAdmin.json";
import privilegesPatient from "../../assets/json/privilegesPatient.json";
import privilegesDoctor from "../../assets/json/privilegesDoctor.json";
import privilegesRadiologist from "../../assets/json/privilegesRadiologist.json";

class TokenStorage {

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user.auth"));
        return user?.acces_token;
    }

    getLocalAccessTokenExp() {
        const user = JSON.parse(localStorage.getItem("user.auth"));
        return user?.access_token_exp;
    }

    getToken() {
        return JSON.parse(localStorage.getItem("user.auth"));
    }

    setToken(data) {
        localStorage.setItem("user.auth", JSON.stringify(data));
    }

    clean() {
        localStorage.removeItem("user.auth");
    }
}

export default new TokenStorage();