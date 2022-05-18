import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";
import moment from "moment";

class AETService {

    search(queryRetrieve, store, forward) {
        let state = {
            items: [],
            error: ''
        }

        let filters = {
            qr: queryRetrieve,
            store: store,
            forward: forward
        }

        return api
            .post('/v2/aet/search', JSON.stringify(filters))
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response ? error.response.data : "Unknown error";
            })
            .then(() => {
                return state;
            });
    }
}

export default new AETService();