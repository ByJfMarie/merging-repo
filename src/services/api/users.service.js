import {apiGET, apiPOST} from "./apiManager";
import {sha512} from "js-sha512";

class UsersService {

    me() {
        return apiGET('/users/profile/user.get');
    }

    update(data) {
        return apiPOST('/users/profile/user.set', data);
    }

    changePassword(data) {
        let pwd_data = {
            old: sha512(data.old),
            new: sha512(data.new),
            repeat: sha512(data.repeat)
        }

        return apiPOST('/users/profile/password.set', pwd_data);
    }

    privileges() {
        return apiGET('/users/profile/privileges.get');
    }

    settings() {
        return apiGET('/users/profile/settings.get');
    }

    updateSettings(data) {
        return apiPOST('/users/profile/settings.set', data);
    }

    getUsers(filters) {
        return apiPOST('/users/list', filters);
    }

    addUser(fields) {
        return apiPOST('/users/add', fields);
    }

    editUser(id, fields) {
        return apiPOST('/users/edit/' + id, fields);
    }

    deleteUser(id) {
        return apiPOST('/users/delete/' + id);
    }
}

export default new UsersService();