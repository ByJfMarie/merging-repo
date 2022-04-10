import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";

class StudiesService {

    searchStudies(filters) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .post('/v2/studies/search', JSON.stringify(filters))
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

    getThumbnail(study_uid, size) {
        return api
            .get('/v2/studies/thumbnail/'+study_uid+'/'+ size, {
                responseType: 'blob'
            })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
    }

    getReports(study_uid) {
        let state = {
            items: [],
            error: ''
        }

        return api
            .get('/v2/studies/reports/'+study_uid+'/pdf')
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

    openReport(key) {
        return api
            .get('/v2/studies/reports.download/'+encodeURIComponent(key), {
                responseType: 'blob'
            })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
    }

    openLoginSheet(key) {
        return api
            .get('/v2/studies/loginsheet.download/'+encodeURIComponent(key), {
                responseType: 'blob'
            })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
    }
}

export default new StudiesService();