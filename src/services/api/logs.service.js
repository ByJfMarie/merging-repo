import api, {apiGET, apiPOST} from "./apiManager";

class LogsService {

    search(filter) {
        return apiPOST('logs/search/', filter);
    }
}

export default new LogsService();