import {apiGET, apiPOST, apiUPLOAD} from "./apiManager";

class SettingsService {

    getDesign() {
        return apiGET('settings/design.get');
    }

    saveDesign(settings) {
        return apiPOST('settings/design.set', settings);
    }

    getEmailing() {
        return apiGET('settings/emailing.get');
    }

    saveEmailing(settings) {
        return apiPOST('settings/emailing.set', settings);
    }

    getLocalServer() {
        return apiGET('settings/localServer.get');
    }

    saveLocalServer(settings) {
        return apiPOST('settings/localServer.set', settings);
    }

    getStorage() {
        return apiGET('settings/storage.get');
    }

    saveStorage(settings) {
        return apiPOST('settings/storage.set', settings);
    }

    getRemoteAET() {
        return apiGET('settings/remoteAET.get');
    }

    saveRemoteAET(settings) {
        return apiPOST('settings/remoteAET.set', settings);
    }

    getTransfer() {
        return apiGET('settings/transfer.get');
    }

    saveTransfer(settings) {
        return apiPOST('settings/transfer.set', settings);
    }

    getReporting() {
        return apiGET('settings/reporting.get');
    }

    saveReporting(settings) {
        return apiPOST('settings/reporting.set', settings);
    }

    getDatabase() {
        return apiGET('settings/database.get');
    }

    saveDatabase(settings) {
        return apiPOST('settings/database.set', settings);
    }

    getPrinters() {
        return apiGET('settings/printers.list');
    }

    uploadLogo(file) {
        const formData = new FormData();
        formData.append("file", file);

        return apiUPLOAD('settings/logo.upload', formData);
    }

    uploadHelp(file) {
        const formData = new FormData();
        formData.append("file", file);

        return apiUPLOAD('settings/help.upload', formData);
    }

    uploadLoginSheet(file) {
        const formData = new FormData();
        formData.append("file", file);

        return apiUPLOAD('settings/loginSheet.upload', formData);
    }

    getRolesPrivileges() {
        return apiGET('settings/privileges.list');
    }

    editPrivileges(privileges) {
        return apiPOST('settings/privileges.set', privileges);
    }
}

export default new SettingsService();