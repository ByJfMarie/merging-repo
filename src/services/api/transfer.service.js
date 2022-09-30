import api, {apiDELETE, apiGET, apiPATCH, apiPOST, apiPUT} from "./apiManager";

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
        const params = new URLSearchParams({});

        return apiGET('transfer/orders/', params);
    }

    transfer(studies_uid, site_id) {
        const params = {
            site_id: site_id,
            study_uids: studies_uid
        };

        return apiPOST('transfer/orders/', params);
    }

    cancelOrders(study_uid, site_id) {
        return apiDELETE('transfer/orders/'+study_uid+'/'+site_id);
    }

    retryOrders(study_uid, site_id) {
        return apiPATCH('transfer/orders/'+study_uid+'/'+site_id+'/retry');
    }

    getRules() {
        return apiGET('transfer/rules');
    }

    addRule(fields) {
        return apiPOST('transfer/rules', fields);
    }

    editRule(id, fields) {
        return apiPUT('transfer/rules/'+id, fields);
    }

    deleteRule(id) {
        return apiDELETE('transfer/rules/'+id);
    }
}

export default new TransferService();