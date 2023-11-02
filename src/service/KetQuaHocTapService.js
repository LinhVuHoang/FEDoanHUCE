import http from "../config"
const URL_KQHT ="/KetQuaHocTap";
class KetQuaHocTapService{
    getKetQuaHocTap(params){
        return http.get(URL_KQHT,{
            params:params
        })
    }
}
export default new KetQuaHocTapService()