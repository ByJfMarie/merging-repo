import {apiPOST} from "./apiManager";
import moment from "moment";

class QueryRetrieveService {

    query(aet, filters) {
        //Format dates
        if (filters.from instanceof Date) filters.from = moment(filters.from).format("YYYY-MM-DD");
        if (filters.to instanceof Date) filters.to = moment(filters.to).format("YYYY-MM-DD");

        return apiPOST('/qr/studies.query/'+aet, filters);
    }

    retrieve(retrieve_aet, move_aet, studies) {
        return apiPOST('/qr/studies.retrieve/'+retrieve_aet+'/'+move_aet, studies);
    }

    getOrders(filter) {
        return apiPOST('/qr/orders/', filter);
    }

    cancelOrders(id) {
        return apiPOST('/qr/orders.cancel/'+id);
    }

    retryOrders(id) {
        return apiPOST('/qr/orders.retry/'+id);
    }
}

export default new QueryRetrieveService();