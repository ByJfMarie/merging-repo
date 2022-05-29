import {apiGET, apiPOST} from "./apiManager";

class UsersService {

    me() {
        return apiGET('/users/me');
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