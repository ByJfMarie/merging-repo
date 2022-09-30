import {apiDELETE, apiGET, apiPATCH, apiPOST} from "./apiManager";
import moment from "moment";

class QueryRetrieveService {

    query(aet, filters) {
        const params = new URLSearchParams({
            aet: aet,
            patient_id: filters.patient_id,
            patient_name: filters.patient_name,
            referring_physician: filters.referring_physician,
            accession_number: filters.accession_number,
            description: filters.description,
            modalities: filters.modality,
            birthdate: (filters.birthdate instanceof Date)?moment(filters.birthdate).format("YYYY-MM-DD"):'',
            from: (filters.from instanceof Date)?moment(filters.from).format("YYYY-MM-DD"):'',
            to: (filters.to instanceof Date)?moment(filters.to).format("YYYY-MM-DD"):''
        });

        return apiGET('/qr', {params});
    }

    retrieve(retrieve_aet, move_aet, studies) {
        return apiPOST('/qr', {
            aet: retrieve_aet,
            move_aet: move_aet,
            studies: studies
        });
    }

    getOrders(filter) {
        const params = new URLSearchParams({});

        return apiGET('/qr/orders', {params});
    }

    cancelOrders(id) {
        return apiDELETE('/qr/orders/'+id);
    }

    retryOrders(id) {
        return apiPATCH('/qr/orders/'+id+'/retry');
    }
}

export default new QueryRetrieveService();