import http from "../config"
const URL_GetAll = "QLDHP";
const URL_GetDS ="QLDHPDS";
class QuanLyDiemHPService{
    getAll(params){
        return http.get(URL_GetAll,{
            params:params
        })
    }
    Update(IDLopHocPhan){
        return http.put(URL_GetDS+"/"+IDLopHocPhan)
    }
    getDS(params){
        return http.get(URL_GetDS,{
            params:params
        })
    }
}
export default new QuanLyDiemHPService()