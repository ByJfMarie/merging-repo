import {apiGET, apiPOST} from "./apiManager";

class ViewersService {

    getURL(study_uid, viewer) {
        return apiPOST('/viewers/url.generate',{
            viewer_id: viewer,
            study_uid: study_uid
        });
    }

    getViewers() {
        return apiGET('/viewers/list');
    }
}

export default new ViewersService();