import api, {apiGET, apiPOST, apiPUT, apiDELETE} from "./apiManager";

class AETService {

    search(queryRetrieve, store, forward) {

        const params = new URLSearchParams({
            qr: queryRetrieve,
            store: store,
            forward: forward
        });

        return apiGET('/aets', {params})
    }

    all() {

        return apiGET('aets/all')
    }

    echoAET(id) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/aets/'+id+'/echo/', {
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
        return apiPOST('/aets',  {...default_fields, ...fields});
    }

    editAET(id, fields) {
        return apiPUT('/aets/'+id, fields);
    }

    deleteAET(id) {
        return apiDELETE('/aets/'+id);
    }
}

export default new AETService();