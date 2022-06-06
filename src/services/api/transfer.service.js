import api, {apiGET, apiPOST} from "./apiManager";

class TransferService {

    testTransfer(settings) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/transfer/test', settings, {
                timeout: 70000
            })
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) state.error = error.response.data.error || error.message;
                else if (error.message) state.error = error.message;
            })
            .then(() => {
                return state;
            });
    }

    getLocalSite() {
        return apiGET('transfer/localSite/');
    }

    getRemoteSites() {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('transfer/remoteSites')
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) state.error = error.response.data.error || error.message;
                else if (error.message) state.error = error.message;
            })
            .then(() => {
                return state;
            });
    }

    getOrders(filter) {
        return apiPOST('transfer/orders/', filter);
    }

    transfer(aet, studies_uid) {
        return apiPOST('transfer/orders.create/'+aet, studies_uid);
    }

    cancelOrders(study_uid, site_id) {
        return apiPOST('transfer/orders.cancel/'+study_uid+'/'+site_id);
    }

    retryOrders(id) {
        return apiPOST('transfer/orders.retry/'+id);
    }

    getRules() {
        return apiGET('transfer/rules.get/');
    }

    addRule(fields) {
        return apiPOST('transfer/rules.add/', fields);
    }

    editRule(id, fields) {
        return apiPOST('transfer/rules.edit/'+id, fields);
    }

    deleteRule(id) {
        return apiPOST('transfer/rules.delete/'+id);
    }
}

export default new TransferService();