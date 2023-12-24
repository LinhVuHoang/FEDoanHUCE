import http from "../config"
const URL_LOGIN ="/login";
const URL_SIGNUP = "/sign_up";
const URL_CheckSignUp = "/check_sign_up";
const URL_Account = "/Account"
class LoginService{
    authenticate(data){
        return http.post(URL_LOGIN,data)
    }
    signin(data){
        return http.post(URL_SIGNUP,data)
    }
    getcheckall(){
        return http.get(URL_CheckSignUp)
    }
    UpdateAccount(Email,Role){
        return http.put(URL_Account+"/"+Email+"/"+Role)
    }
    getAccount(params){
        return http.get(URL_Account,{
            params:params
        })
    }
}
export default new LoginService();