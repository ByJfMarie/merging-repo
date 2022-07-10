import api, {apiGET, apiPOST} from "./apiManager";
import moment from "moment";

class LogsService {

    search(filters) {
        //Format dates
        if (filters.date instanceof Date) filters.date = moment(filters.date).format("YYYY-MM-DD");

        return apiPOST('logs/search/', filters);
    }

    download(name) {
        return api
            .get('logs/download/' + encodeURIComponent(name), {
                responseType: 'blob'
            })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
    }
}

export default new LogsService();