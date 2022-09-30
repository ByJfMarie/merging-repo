import miAPI, {apiDELETE, apiGET, apiPATCH, apiPOST, apiPUT} from "./apiManager";
import {sha512} from "js-sha512";
import moment from "moment";

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

        return apiPUT('/users/profile/password.set', pwd_data);
    }

    resetPassword(user, new_password, repeat_password) {
        let pwd_data = {
            new: sha512(new_password),
            repeat: sha512(repeat_password)
        }

        return apiPATCH('/users/'+user+'/password', pwd_data);
    }

    privileges() {
        let state = {
            items: [],
            error: ''
        }

        return miAPI
            .get('/users/profile/privileges')
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) {
                    state.error = error.response.data.error || error.message;
                    return state;
                }
                else if (error.message) {
                    state.error = error.message;
                }
            })
            .then(() => {
                return state;
            });
    }

    settings() {
        let state = {
            items: [],
            error: ''
        }

        return miAPI
            .get('/users/profile/settings')
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) {
                    state.error = error.response.data.error || error.message;
                    return state;
                }
                else if (error.message) {
                    state.error = error.message;
                }
            })
            .then(() => {
                return state;
            });
    }

    updateSettings(data) {
        return apiPUT('/users/profile/settings', data);
    }

    getUsers(filters) {
        return apiGET('/users', filters);
    }

    addUser(fields) {
        if (fields.birthdate instanceof Date) fields.birthdate = moment(fields.birthdate).format("YYYY-MM-DD");

        return apiPOST('/users', fields);
    }

    editUser(id, fields) {
        if (fields.birthdate instanceof Date) fields.birthdate = moment(fields.birthdate).format("YYYY-MM-DD");

        return apiPUT('/users/' + id, fields);
    }

    deleteUser(id) {
        return apiDELETE('/users/' + id);
    }
}

export default new UsersService();