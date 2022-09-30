import {apiGET, apiPOST, apiPATCH, apiPUT, apiDELETE} from "./apiManager";

class ForwardingService {

    getOrders(filter) {
        const params = new URLSearchParams({});

        return apiGET('/forwarding/orders', params);
    }

    createOrder(aet, studies_uid) {
        const params = {
            aet: aet,
            study_uids: studies_uid
        };

        return apiPOST('/forwarding/orders', params);
    }


    cancelOrders(study_uid, called_aet) {
        return apiDELETE('/forwarding/orders/'+study_uid+'/'+called_aet);
    }

    retryOrders(study_uid, called_aet) {
        return apiPATCH('/forwarding/orders/'+study_uid+'/'+called_aet+'/retry');
    }

    getRules() {
        return apiGET('/forwarding/rules');
    }

    addRule(fields) {
        return apiPOST('/forwarding/rules', fields);
    }

    editRule(id, fields) {
        return apiPUT('/forwarding/rules/'+id, fields);
    }

    deleteRule(id) {
        return apiDELETE('/forwarding/rules/'+id);
    }
}

export default new ForwardingService();