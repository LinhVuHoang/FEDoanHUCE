import http from "../config"
const URL_TKB = "TKB_HocKy";
const URL_DotHK = "TKB_Dot";
const URL_DSSV = "TKB_DS_Sinhvien";
class TKBHocKyService{
    getTKBHocKy(params){
        return http.get(URL_TKB,{
            params:params
        })
    }
    getDotHocKy(){
        return http.get(URL_DotHK)
    }
    getdssv(MaLopHocPhan,MaLopHoc){
        return http.get(URL_DSSV+"/"+MaLopHocPhan+"/"+MaLopHoc)
    }
}
export default new TKBHocKyService()