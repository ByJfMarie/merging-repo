import {BASE_URL} from "./apiManager";

class GeneralService {

    getLogoURL() {
        return BASE_URL+'general/logo';
    }

    getHelpFileURL() {
        return BASE_URL+'general/help-file.pdf';
    }

    getLoginSheetFileURL() {
        return BASE_URL+'general/login-sheet.pdf';
    }
}

export default new GeneralService();