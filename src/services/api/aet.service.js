import api, {apiGET, apiPOST} from "./apiManager";

class AETService {

    search(queryRetrieve, store, forward) {
        return apiPOST('/aet/search', {
            qr: queryRetrieve,
            store: store,
            forward: forward
        });
    }

    getAETs() {
        return apiGET('/aet/list');
    }

    echoAET(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/aet/echo/'+id, {
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

    addAET(fields) {
        const default_fields = {
            title: '',
            ip: '',
            port: -1,
            description: '',
            store: false,
            forward: false,
            qr: false
        };
        return apiPOST('/aet/add',  {...default_fields, ...fields});
    }

    editAET(id, fields) {
        return apiPOST('/aet/edit/'+id, fields);
    }

    deleteAET(id) {
        return apiPOST('/aet/delete/'+id);
    }
}

export default new AETService();