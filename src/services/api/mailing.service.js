import api, {apiGET, apiPOST} from "./apiManager";

class MailingService {

    test(recipient, settings) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/mailing/'+encodeURIComponent(recipient)+'/test', settings, {
                timeout: 70000
            })
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

export default new MailingService();