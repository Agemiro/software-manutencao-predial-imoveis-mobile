import axios from "axios";
import Config from "../util/Config"

class FornecedorService{
    
    async cadastrar(data){
        return axios({
            url: Config.API_URL + "supplier",
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
}

const fornecedorService = new FornecedorService();
export default fornecedorService;