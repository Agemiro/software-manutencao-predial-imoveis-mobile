import axios from "axios";
import Config from "../util/Config"

class SalaService{
    
    async cadastrar(data){
        return axios({
            url: Config.API_URL + "room",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async obterSalas() {
        return await axios({
            url: Config.API_URL + "room",
            method: "GET",
            timeout: Config.TIMEOUT_REQUEST
        }).then((response) => {
            // console.log(response.data);
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.resolve(error)
        })
    }
}

const salaService = new SalaService();
export default salaService;