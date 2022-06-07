import api, {apiGET, apiPOST} from "./apiManager";

class PluginsService {

    list(force_refresh) {
        return apiGET('/plugins/list?force-refresh='+(force_refresh || false));
    }

    install(id) {
        return apiPOST('/plugins/install/'+id);
    }

    uninstall(id) {
        return apiPOST('/plugins/uninstall/'+id);
    }

    delete(id) {
        return apiPOST('/plugins/delete/'+id);
    }
}

export default new PluginsService();