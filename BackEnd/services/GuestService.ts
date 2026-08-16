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
    getProfile(user_id:Number,callback:Function){
        User.getById(user_id,(err:Error|null,user:any) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,user);
        });
    }

    updateProfile(user_id:Number,name:String,phone:String,email:String,callback:Function){
        if(!name || !phone || !email){
            callback(new Error("All fields are required"),null);
            return;
        }
        User.updateById(user_id,name,phone,email,(err:Error|null,result:any) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
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