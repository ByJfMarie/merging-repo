import api, {apiGET, apiUPLOAD} from "./apiManager";

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
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('system/perennity.restart',
                null,
                {timeout: 60000})
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = "Unknown error";
                if (error.response) state.error = error.response.data.error || error.message;
                else if (error.message) state.error = error.message;
            })
            .then(() => {
                return state;
            });
    }
}

export default new SystemService();