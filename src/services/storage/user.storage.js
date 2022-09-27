import UsersService from "../api/users.service";
import secureLocalStorage from "react-secure-storage";

class UserStorage {

    async getUser() {
        let user = secureLocalStorage.getItem("user.me");
        if (user) return user;

        const response = await UsersService.me();
        if (response && !response.error) {
            secureLocalStorage.setItem("user.me", response.items);
            return secureLocalStorage.getItem("user.me");
        }
    }

    async getPrivileges() {
        let privileges = secureLocalStorage.getItem("user.privileges");
        if (privileges) return privileges;

        const response = await UsersService.privileges();
        if (response && !response.error) {
            secureLocalStorage.setItem("user.privileges", response.items);
            return secureLocalStorage.getItem("user.privileges");
        }
    }

    async getSettings(refreshIsNull=true) {
        let settings = secureLocalStorage.getItem("user.settings");
        if (settings) return settings;
        if (!refreshIsNull) return null;

        const response = await UsersService.settings();
        if (response && !response.error) {
            secureLocalStorage.setItem("user.settings", response.items);
            return secureLocalStorage.getItem("user.settings");
        }

        return [];
    }

    removeUserProfile() {
        secureLocalStorage.removeItem("user.me");
    }

    removeUserPrivileges() {
        secureLocalStorage.removeItem("user.privileges");
    }

    removeUserSettings() {
        secureLocalStorage.removeItem("user.settings");
    }

    clean() {
        this.removeUserProfile();
        this.removeUserPrivileges();
        this.removeUserSettings();
    }
}

export default new UserStorage();