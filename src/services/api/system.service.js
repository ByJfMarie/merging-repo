import {apiGET, apiPOST, apiUPLOAD} from "./apiManager";

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

    restartPerennity() {
        return apiPOST('system/perennity.restart');
    }
}

export default new SystemService();