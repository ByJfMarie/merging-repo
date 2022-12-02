import {apiDELETE, apiGET, apiPOST} from "./apiManager";

class PluginsService {

    list(force_refresh) {
        const params = new URLSearchParams({
            force_refresh: force_refresh,
        });

        return apiGET('/plugins/list', {params});
    }

    install(id) {
        return apiPOST('/plugins/'+id+'/install');
    }

    uninstall(id) {
        return apiPOST('/plugins/'+id+'/uninstall');
    }

    delete(id) {
        return apiDELETE('/plugins/'+id);
    }
}

export default new PluginsService();