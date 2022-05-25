import api from "./apiManager";
import moment from "moment";

class QueryRetrieveService {

    query(aet, filters) {
        let state = {
            items: [],
            error: ''
        }

        //Format dates
        if (filters.from instanceof Date) filters.from = moment(filters.from).format("YYYY-MM-DD");
        if (filters.to instanceof Date) filters.to = moment(filters.to).format("YYYY-MM-DD");

        return api
            .post('/v2/qr/studies.query/'+aet, JSON.stringify(filters))
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

    retrieve(retrieve_aet, move_aet, studies) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/qr/studies.retrieve/'+retrieve_aet+'/'+move_aet, JSON.stringify(studies))
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
            .post('/v2/qr/orders/', JSON.stringify(filter))
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

    cancelOrders(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/qr/orders.cancel/'+id)
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
            .post('/v2/qr/orders.retry/'+id)
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

export default new QueryRetrieveService();