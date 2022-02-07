/*import axios from "axios"
import PryApi from './PryApi';

axios.defaults.withCredentials = true;

export default class PryApiStudies {

    PryAPI = new PryApi();

    url = "http://demo.perennity.io:9990";

    getThumbnailsFiles(study_id, size) {
        return fetch(this.url + '/thumbnails/study/'+study_id+'/'+ size, {
            method: 'GET',
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + this.PryAPI.getAccessToken()
            }
        }).then(rsp => {
        
            return rsp;
        })
        .catch(err => {
            //console.log(err)
        });
    }

}*/