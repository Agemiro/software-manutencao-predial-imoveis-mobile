import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Config from "../util/Config"

class UsuarioService{
    
    async cadastrar(data){
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
    }

    async getUser() {
        let user = await AsyncStorage.getItem("USER");
        user = JSON.parse(user);
        return user;
    }

    async setUser(user) {
        AsyncStorage.setItem("USER", JSON.stringify(user))
    }

}

const usuarioService = new UsuarioService()
export default usuarioService