import User from "../models/User";
import {Login,EmailLogin,PhoneLogin} from "../patterns/Strategy";

class GuestService {
    register(name:String,phone:String,email:String,password:String,callback:Function){
        const start = new EmailLogin();
        const user = new User(name,phone,email,password,start);
         user.register((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
    login(medium:String,password:String,strategy:String,callback:Function){
        let loginStrategy:EmailLogin | PhoneLogin;
        if(strategy==="phone"){
            loginStrategy = new PhoneLogin();
            const user: User = new User("",medium,"",password,loginStrategy);
            user.login((err: Error | null, loggedInUser: User | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, loggedInUser);
          });
        }else{
            loginStrategy = new EmailLogin();
            const user: User = new User("","",medium,password,loginStrategy);
            user.login((err: Error | null, loggedInUser: User | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, loggedInUser);
          });
        }
        
    }
}

export default new GuestService();