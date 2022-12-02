import api, {apiGET} from "./apiManager";
import moment from "moment";

class LogsService {

    search(filters) {
        const params = new URLSearchParams({
            name: filters.name,
            date: (filters.date instanceof Date)?moment(filters.date).format("YYYY-MM-DD"):''
        });

        return apiGET('logs/search', {params});
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