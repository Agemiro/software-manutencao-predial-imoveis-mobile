//import AsyncStorage from "@react-native-async-storage/async-storage"
//import axios from "axios"

class UsuarioService{
    
    /*async cadastrar(data){
        return axios({
            url: Config.API_URL + "user",
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

    async login(data){
        return axios({
            url: Config.API_URL + "user/login",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }*/

    retornaTipoCargo(data){
        this.usuarioLogado(data);
        if(data === "A"){
            return "Principal ADM";
        }else if(data === "C"){
            return "Principal Chefe de Setor";
        }
        else if(data === "P"){
            return "Principal Prestador";
        }
        else if(data === "G"){
            return "Principal Gerente";
        }
    }

}

const usuarioService = new UsuarioService()
export default usuarioService