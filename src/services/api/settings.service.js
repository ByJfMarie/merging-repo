import api from "./apiManager";

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

    saveDesign(settings) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/design.set', JSON.stringify(settings))
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

    saveEmailing(settings) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/emailing.set', JSON.stringify(settings))
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

    saveLocalServer(settings) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/settings/localServer.set', JSON.stringify(settings))
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

    getRemoteAET() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/remoteAET.get')
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

    getTransfer() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/transfer.get')
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

    getReporting() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/reporting.get')
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

    getDatabase() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/settings/database.get')
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