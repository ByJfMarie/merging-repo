/** JSON  */
import privilegesAdmin from "../../assets/json/privilegesAdmin.json";
import privilegesPatient from "../../assets/json/privilegesPatient.json";
import privilegesDoctor from "../../assets/json/privilegesDoctor.json";
import privilegesRadiologist from "../../assets/json/privilegesRadiologist.json";

class TokenService {

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.acces_token;
    }

    updateLocalAccessToken(token) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.acces_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getLocalAccessTokenExp() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.access_token_exp;
    }

    updateLocalAccessTokenExp(exp) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.access_token_exp = exp;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refresh_token;
    }

    updateLocalRefreshToken(token) {
        const user = JSON.parse(localStorage.getItem("user"));
        user.refresh_token = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    setUser(user) {
        switch (user.role) {
            case 'administrator':
                user.priviledges = privilegesAdmin;
                break;
            case 'patient':
                user.priviledges = privilegesPatient;
                break;
            case 'physician':
                user.priviledges = privilegesDoctor;
                break;
            case 'radiologist':
                user.priviledges = privilegesRadiologist;
                break;
        }

        localStorage.setItem("user", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();