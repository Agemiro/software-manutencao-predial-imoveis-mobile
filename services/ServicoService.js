import axios from "axios"
import Config from "../util/Config"

class ServicoService{
    
    async cadastrar(data){
        return axios({
            url: Config.API_URL + "service",
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

    async obterServicos(data){
        return axios({
            url: Config.API_URL + "services",
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

    async obterNotificacoes() {
        return await axios({
            url: Config.API_URL + "service/notifications",
            method: "GET",
            timeout: Config.TIMEOUT_REQUEST
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.resolve(error)
        })
    }

    async obterAll() {
        return await axios({
            url: Config.API_URL + "service",
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

const servicoService = new ServicoService()
export default servicoService