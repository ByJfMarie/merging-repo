import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";
import moment from "moment";

class SettingsService {

    getDesign() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/design.get')
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

    getUsers(filters) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/users.get', JSON.stringify(filters))
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
            .post('/v2/settings/users.add/', JSON.stringify(fields))
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
            .post('/v2/settings/users.edit/'+id, JSON.stringify(fields))
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
            .post('/v2/settings/users.delete/'+id)
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

    getEmailing() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/emailing.get')
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

    getLocalServer() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/localServer.get')
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

    getStorage() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/storage.get')
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

    getAETs() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/aets.get')
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

    echoAET(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/aets.echo/'+id)
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

    addAET(fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/aets.add/', JSON.stringify(fields))
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

    editAET(id, fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/aets.edit/'+id, JSON.stringify(fields))
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

    deleteAET(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/aets.delete/'+id)
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

export default new SettingsService();