import {apiGET, apiPOST, apiUPLOAD} from "./apiManager";

class SystemService {

    getVersion() {
        return apiGET('system/version');
    }

    getContactUs() {
        return apiGET('system/contactus');
    }

    getFaq() {
        return apiGET('system/faq');
    }

    getPrivacyPolicy() {
        return apiGET('system/privacypolicy');
    }

    getTerms() {
        return apiGET('system/terms');
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