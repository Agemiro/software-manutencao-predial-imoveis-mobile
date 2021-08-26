import axios from "axios"
import Config from "../util/Config"

class ProdutoService{
    
    async cadastrar(data){
        return axios({
            url: Config.API_URL + "building-material",
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

    async obterAll() {
        return await axios({
            url: Config.API_URL + "building-material",
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

const produtoService = new ProdutoService()
export default produtoService