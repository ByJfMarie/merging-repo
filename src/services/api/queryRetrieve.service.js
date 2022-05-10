import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";

class QueryRetrieveService {

    listAet(queryRetrieve, store, forward) {
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
            .post('/v2/qr/aets', JSON.stringify(filters))
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

    query(aet, filters) {
        let state = {
            items: [],
            error: ''
        }

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
}

export default new QueryRetrieveService();