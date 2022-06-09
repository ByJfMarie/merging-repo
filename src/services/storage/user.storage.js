/** JSON  */
import privilegesAdmin from "../../assets/json/privilegesAdmin.json";
import privilegesPatient from "../../assets/json/privilegesPatient.json";
import privilegesDoctor from "../../assets/json/privilegesDoctor.json";
import privilegesRadiologist from "../../assets/json/privilegesRadiologist.json";
import UsersService from "../api/users.service";

class UserStorage {

    getUser() {
        return JSON.parse(localStorage.getItem("user.me"));
    }

    setUser(data) {
        localStorage.setItem("user.me", JSON.stringify(data));
    }

    getPrivileges() {
        return JSON.parse(localStorage.getItem("user.privileges"));
    }

    setPrivileges(data) {
        localStorage.setItem("user.privileges", JSON.stringify(data));
    }

    async getSettings() {
        let settings = JSON.parse(localStorage.getItem("user.settings"));
        if (settings) return settings;

        const response = await UsersService.settings();
        if (response && response.items) {
            localStorage.setItem("user.settings", JSON.stringify(response.items));
            return JSON.parse(localStorage.getItem("user.settings"));
        }
    }

    setSettings(data) {
        localStorage.setItem("user.settings", JSON.stringify(data));
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