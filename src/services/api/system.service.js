import {apiGET, apiPOST} from "./apiManager";

class SystemService {

    getVersion() {
        return apiGET('system/version');
    }

    getLicense() {
        return apiGET('system/license.get');
    }
}

export default new SystemService();