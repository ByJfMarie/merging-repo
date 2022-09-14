import {apiGET, apiPOST} from "./apiManager";

class ForwardingService {

    getOrders(filter) {
        return apiPOST('/forwarding/orders', filter);
    }

    forward(aet, studies_uid) {
        return apiPOST('/forwarding/orders.create/'+aet, studies_uid);
    }


    cancelOrders(study_uid, called_aet) {
        return apiPOST('/forwarding/orders.cancel/'+study_uid+'/'+called_aet);
    }

    retryOrders(study_uid, called_aet) {
        return apiPOST('/forwarding/orders.retry/'+study_uid+'/'+called_aet);
    }

    getRules() {
        return apiGET('/forwarding/rules.get/');
    }

    addRule(fields) {
        return apiPOST('/forwarding/rules.add/', fields);
    }

    editRule(id, fields) {
        return apiPOST('/forwarding/rules.edit/'+id, fields);
    }

    deleteRule(id) {
        return apiPOST('/forwarding/rules.delete/'+id);
    }
}

export default new ForwardingService();