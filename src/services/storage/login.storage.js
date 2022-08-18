/** JSON  */
import AuthService from "../api/auth.service";

class LoginStorage {

    async getConfig() {
        let cfg = JSON.parse(localStorage.getItem("login.config"));
        if (cfg) return cfg;

        const response = await AuthService.config();
        if (response && !response.error) {
            localStorage.setItem("login.config", JSON.stringify(response.items));
            return JSON.parse(localStorage.getItem("login.config"));
        }
    }

    removeConfig() {
        localStorage.removeItem("login.config");
    }

    clean() {
        this.removeConfig();
    }
}

export default new LoginStorage();