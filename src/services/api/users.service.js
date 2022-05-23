import api from "./api";

class UsersService {

    getUsers(filters) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/users/list', JSON.stringify(filters))
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response ? error.response.data : "Unknown error";
            })
            .then(() => {
                return state;
            });
    }

    addUser(fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/users/add/', JSON.stringify(fields))
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response ? error.response.data : "Unknown error";
            })
            .then(() => {
                return state;
            });
    }

    editUser(id, fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/users/edit/' + id, JSON.stringify(fields))
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response ? error.response.data : "Unknown error";
            })
            .then(() => {
                return state;
            });
    }

    deleteUser(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/users/delete/' + id)
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response ? error.response.data : "Unknown error";
            })
            .then(() => {
                return state;
            });
    }

}

export default new UsersService();