import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";
import moment from 'moment';

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
}

export default new ForwardingService();