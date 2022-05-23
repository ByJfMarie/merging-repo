import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";
import moment from 'moment';

class TransferService {

    getLocalSite() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/transfer/localSite/')
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

    getRemoteSites() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/transfer/remoteSites/')
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

    getOrders(filter) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/transfer/orders/', JSON.stringify(filter))
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

    transfer(aet, studies_uid) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/transfer/orders.create/'+aet, JSON.stringify(studies_uid))
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


    cancelOrders(study_uid, site_id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/transfer/orders.cancel/'+study_uid+'/'+site_id)
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
            .post('/v2/transfer/orders.retry/'+id)
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
            .get('/v2/transfer/rules.get/')
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
            .post('/v2/transfer/rules.add/', JSON.stringify(fields))
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
            .post('/v2/transfer/rules.edit/'+id, JSON.stringify(fields))
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
            .post('/v2/transfer/rules.delete/'+id)
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

export default new TransferService();