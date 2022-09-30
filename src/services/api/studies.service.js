import api, {apiDELETE, apiGET, apiPOST} from "./apiManager";
import moment from 'moment';

class StudiesService {

    searchStudies(filters) {
        const params = new URLSearchParams({
            patient_id: filters.patient_id,
            patient_name: filters.patient_name,
            referring_physician: filters.referring_physician,
            accession_number: filters.accession_number,
            description: filters.description,
            modalities: filters.modality,
            birthdate: (filters.birthdate instanceof Date)?moment(filters.birthdate).format("YYYY-MM-DD"):'',
            from: (filters.from instanceof Date)?moment(filters.from).format("YYYY-MM-DD"):'',
            to: (filters.to instanceof Date)?moment(filters.to).format("YYYY-MM-DD"):'',
            show_deleted: filters.showDeleted
        });

        return apiGET('/studies', {params});
    }

    getThumbnail(study_uid, size) {
        return api
            .get('/studies/'+study_uid+'/thumbnail/' + size, {
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
        return apiGET('studies/'+study_uid+'/reports/pdf');
    }

    openReport(key) {
        return api
            .get('studies/reports/' + encodeURIComponent(key)+'/download', {
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
            .get('studies/loginsheet/' + encodeURIComponent(key)+'/download', {
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
        return apiGET('studies/'+study_uid+'/permissions');
    }

    setPermission(login, study_uid, checked) {
        return apiPOST('studies/'+study_uid+'/permissions', {
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

    share(studies, to, comment, valid_until) {
        let end_date = null;
        if (valid_until instanceof Date) end_date = moment(valid_until).format("YYYY-MM-DD");

        return apiPOST('studies/share', {
            study_uids: studies,
            recipients: to,
            comments: comment,
            valid_until: end_date
        });
    }

    delete(study_uid) {
        return apiDELETE('studies/'+study_uid);
    }
}

export default new StudiesService();