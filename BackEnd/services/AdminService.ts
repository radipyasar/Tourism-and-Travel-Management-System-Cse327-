import Admin from "../models/Admin";
import { AdminEmailLOgin,AdminPhoneLogin } from "../patterns/Strategy";

class AdminService {
    login(medium:String,password:String,strategy:string,callback:Function){
        let loginStrategy: AdminEmailLOgin | AdminPhoneLogin;
        if(strategy==="phone"){
            loginStrategy = new AdminPhoneLogin();
            const admin = new Admin("",medium,"",password,loginStrategy);
            admin.login((err: Error | null, loggedInAdmin: Admin | null) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                callback(null, loggedInAdmin);
            });
        }else{
            loginStrategy = new AdminEmailLOgin();
            const admin = new Admin("","",medium,password,loginStrategy);
            admin.login((err: Error | null, loggedInAdmin: Admin | null) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                callback(null, loggedInAdmin);
            });
        }
        
    }
}

export default new AdminService();