import api, {apiGET, apiPOST} from "./apiManager";
import moment from 'moment';

class StudiesService {

    searchStudies(filters) {
        //Format dates
        if (filters.from instanceof Date) filters.from = moment(filters.from).format("YYYY-MM-DD");
        if (filters.to instanceof Date) filters.to = moment(filters.to).format("YYYY-MM-DD");
        if (filters.birthdate instanceof Date) filters.birthdate = moment(filters.birthdate).format("YYYY-MM-DD");

        return apiPOST('studies/search', filters);
    }

    getThumbnail(study_uid, size) {
        return api
            .get('/studies/thumbnail/' + study_uid + '/' + size, {
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
        return apiGET('studies/reports/'+study_uid+'/pdf');
    }

    openReport(key) {
        return api
            .get('studies/reports.download/' + encodeURIComponent(key), {
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
            .get('studies/loginsheet.download/' + encodeURIComponent(key), {
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

    getPermissions(study_uid) {
        return apiGET('studies/permissions.physicians/'+study_uid);
    }

    setPermission(login, study_uid, checked) {
        return apiPOST('studies/permissions.physicians/set/'+study_uid, {
            login: login,
            checked: checked
        });
    }

    prepareDownload(type, rows) {
        return apiPOST('studies/download.prepare', {
            format: type,
            studies: rows
        });
    }

    statusDownload(id) {
        return apiGET('studies/download.status/'+id);
    }

    download(id, config) {
        return api
            .get('studies/download/'+id, config)
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

    delete(study_uid) {
        return apiPOST('studies/delete/'+study_uid);
    }
}

export default new StudiesService();