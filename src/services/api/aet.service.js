import {apiGET, apiPOST} from "./apiManager";

class AETService {

    search(queryRetrieve, store, forward) {
        return apiPOST('/aet/search', {
            qr: queryRetrieve,
            store: store,
            forward: forward
        });
    }

    getAETs() {
        return apiGET('/aet/list');
    }

    echoAET(id) {
        return apiGET('/aet/echo/'+id);
    }

    addAET(fields) {
        return apiPOST('/aet/add', fields);
    }

    editAET(id, fields) {
        return apiPOST('/aet/edit'+id, fields);
    }

    deleteAET(id) {
        return apiPOST('/aet/delete'+id);
    }
}

export default new AETService();