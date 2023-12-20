import http from "../config"
const URL_GetAll = "QLDHP";
const URL_GetDS ="QLDHP";
class QuanLyDiemHPService{
    getAll(params){
        return http.get(URL_GetAll,{
            params:params
        })
    }
    Update(Id,status){
        return http.put(URL_GetAll+"/"+Id+"/"+status)
    }
    getDS(params){
        return http.get(URL_GetDS,{
            params:params
        })
    }
}
export default new QuanLyDiemHPService()