import {apiGET, apiUPLOAD} from "./apiManager";

class SystemService {

    getVersion() {
        return apiGET('system/version');
    }

    getLicense() {
        return apiGET('system/license.get');
    }

    setLicense(file) {
        const formData = new FormData();
        formData.append("file", file);

        return apiUPLOAD('system/license.set', formData);
    }
}

export default new SystemService();