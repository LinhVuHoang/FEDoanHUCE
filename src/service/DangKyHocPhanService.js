import http from "../config"
const URL_SVDSDangKyHocPhan = "SV_DangKyMonHoc"
const URL_DS_LHP_SiSo = "DS_LHP_SiSo"
const URL_DSSV_LHP_SiSo="DSSV_LHP_SiSo"
class DangKyHocPhanService{
    getSVDSDangKyHocPhan(params){
        return http.get(URL_SVDSDangKyHocPhan,{
            params:params
        })
    }
    getDSLHPSiSo(params){
        return http.get(URL_DS_LHP_SiSo,{
            params:params
        })
    }
    getDSSVLHPSiSo(MaMonHoc,MaLopHoc,TenDot){
        return http.get(URL_DSSV_LHP_SiSo+"/"+MaMonHoc+"/"+MaLopHoc+"/"+TenDot)
    }
}
export default new DangKyHocPhanService()