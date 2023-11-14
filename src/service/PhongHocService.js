import http from "../config"
const URL_LSPH ="/LichSuPH";
class PhongHocService{
    getLichSuPH(params){
        return http.get(URL_LSPH,{
            params:params
        })
    }
}

export default new PhongHocService()