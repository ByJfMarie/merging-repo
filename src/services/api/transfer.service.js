import {apiGET, apiPOST} from "./apiManager";

class TransferService {

    getLocalSite() {
        return apiGET('transfer/localSite/');
    }

    getRemoteSites() {
        return apiGET('transfer/remoteSites/');
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