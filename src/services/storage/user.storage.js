/** JSON  */
import privilegesAdmin from "../../assets/json/privilegesAdmin.json";
import privilegesPatient from "../../assets/json/privilegesPatient.json";
import privilegesDoctor from "../../assets/json/privilegesDoctor.json";
import privilegesRadiologist from "../../assets/json/privilegesRadiologist.json";
import UsersService from "../api/users.service";

class UserStorage {

    async getUser() {
        let user = JSON.parse(localStorage.getItem("user.me"));
        if (user) return user;

        const response = await UsersService.me();
        if (response && !response.error) {
            localStorage.setItem("user.me", JSON.stringify(response.items));
            return JSON.parse(localStorage.getItem("user.me"));
        }
    }

    async getPrivileges() {
        let privileges = JSON.parse(localStorage.getItem("user.privileges"));
        if (privileges) return privileges;

        const response = await UsersService.privileges();
        if (response && !response.error) {
            localStorage.setItem("user.privileges", JSON.stringify(response.items));
            return JSON.parse(localStorage.getItem("user.privileges"));
        }
    }

    async getSettings(refreshIsNull=true) {
        let settings = JSON.parse(localStorage.getItem("user.settings"));
        if (settings) return settings;
        if (!refreshIsNull) return null;

        const response = await UsersService.settings();
        if (response && !response.error) {
            localStorage.setItem("user.settings", JSON.stringify(response.items));
            return JSON.parse(localStorage.getItem("user.settings"));
        }

        return [];
    }

    removeUserProfile() {
        localStorage.removeItem("user.me");
    }

    removeUserPrivileges() {
        localStorage.removeItem("user.privileges");
    }

    removeUserSettings() {
        localStorage.removeItem("user.settings");
    }

    clean() {
        this.removeUserProfile();
        this.removeUserPrivileges();
        this.removeUserSettings();
    }
}

export default new UserStorage();