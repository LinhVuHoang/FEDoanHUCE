import http from "../config"
const URL_SVDSDangKyHocPhan = "SV_DangKyMonHoc"

class DangKyHocPhanService{
    getSVDSDangKyHocPhan(params){
        return http.get(URL_SVDSDangKyHocPhan,{
            params:params
        })
    }
}
export default new DangKyHocPhanService()