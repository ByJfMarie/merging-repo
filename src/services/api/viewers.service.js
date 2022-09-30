import {apiGET, apiPOST} from "./apiManager";

class ViewersService {

    getURL(study_uid, viewer_id) {
        const params = new URLSearchParams({
            viewer_id: viewer_id,
            study_uid: study_uid
        });

        return apiGET('/viewers/url',{params});
    }

    getViewers() {
        return apiGET('/viewers');
    }
}

export default new ViewersService();