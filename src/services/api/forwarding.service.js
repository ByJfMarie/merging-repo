import api from "./api";

class ForwardingService {

    getOrders(filter) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/orders/', JSON.stringify(filter))
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

    forward(aet, studies_uid) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/orders.create/'+aet, JSON.stringify(studies_uid))
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


    cancelOrders(series_uid, called_aet) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/orders.cancel/'+series_uid+'/'+called_aet)
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

    retryOrders(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/orders.retry/'+id)
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

    getRules() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/forwarding/rules.get/')
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

    addRule(fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/rules.add/', JSON.stringify(fields))
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

    editRule(id, fields) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/rules.edit/'+id, JSON.stringify(fields))
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

    deleteRule(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/forwarding/rules.delete/'+id)
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

export default new ForwardingService();