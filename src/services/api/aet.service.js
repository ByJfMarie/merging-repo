import api from "./api";

class AETService {

    search(queryRetrieve, store, forward) {
        let state = {
            items: [],
            error: ''
        }

        let filters = {
            qr: queryRetrieve,
            store: store,
            forward: forward
        }

        return api
            .post('/v2/aet/search', JSON.stringify(filters))
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
            .get('/v2/aet/list')
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
            .get('/v2/aet/echo/'+id)
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
            .post('/v2/aet/add/', JSON.stringify(fields))
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
            .post('/v2/aet/edit/'+id, JSON.stringify(fields))
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
            .post('/v2/aet/delete/'+id)
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

export default new AETService();