import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";
import Config from "../util/Config"

class EmpresaService{
    
    async cadastrar(data){
        return axios({
            url: Config.API_URL + "company",
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

const empresaService = new EmpresaService()
export default empresaService