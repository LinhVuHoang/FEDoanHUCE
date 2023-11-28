import http from "../config"
const URL_GetAll = "QLDHP";
const URL_GetDS ="QLDHP";
class QuanLyDiemHPService{
    getAll(params){
        return http.get(URL_GetAll,{
            params:params
        })
    }
    Update(IDLopHocPhan,status){
        return http.put(URL_GetAll+"/"+IDLopHocPhan+"/"+status)
    }
    getDS(params){
        return http.get(URL_GetDS,{
            params:params
        })
    }
}
export default new QuanLyDiemHPService()