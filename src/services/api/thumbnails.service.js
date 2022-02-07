import api, {URL_USER_AUTH} from "./api";
import TokenService from "./token.service";

class ThumbnailsService {

    getThumbnailForStudy(study_uid, size) {
        return api
            .get('/thumbnails/study/'+study_uid+'/'+ size, {
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

export default new ThumbnailsService();