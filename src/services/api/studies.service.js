import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";

class StudiesService {

    searchStudies(filters) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/studies/search', JSON.stringify(filters))
            .then((response) => {
                if (response.status === 200) {
                    state.items = response.data;
                } else {
                    state.error = "Unknown error";
                }
            })
            .catch((error) => {
                state.error = error.response?error.response.data:"Unknown error";
            })
            .then (() => {
                return state;
            });
    }

}

export default new StudiesService();