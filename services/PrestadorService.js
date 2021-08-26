import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Config from "../util/Config"

class PrestadorService{
    async obterAll() {
        return await axios({
            url: Config.API_URL + "users/providers",
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

const prestadorService = new PrestadorService()
export default prestadorService