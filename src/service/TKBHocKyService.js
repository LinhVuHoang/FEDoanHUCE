import http from "../config"
const URL_TKB = "TKB_HocKy";
const URL_DotHK = "TKB_Dot";
const URL_DSSV = "TKB_DS_Sinhvien";
const URL_LichThi = "TKB_LichThi"
class TKBHocKyService{
    getTKBHocKy(params){
        return http.get(URL_TKB,{
            params:params
        })
    }
    getTKBLichThi(params){
        return http.get(URL_LichThi,{
            params:params
        })
    }
    getDotHocKy(){
        return http.get(URL_DotHK)
    }
    getdssv(MaLopHocPhan,MaLopHoc,TenDot){
        return http.get(URL_DSSV+"/"+MaLopHocPhan+"/"+MaLopHoc+"/"+TenDot)
    }
}
export default new TKBHocKyService()