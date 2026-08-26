import User from "../models/User";
import {Login,EmailLogin} from "../patterns/Strategy";
import { FactorRegistry, Strategy } from "../patterns/Factory";
import { adminSubject } from "../patterns/Observer";

class GuestService {
    register(name:String,phone:String,email:String,password:String,callback:Function){
        const start = new EmailLogin();
        const user = new User(name,phone,email,password,start);
         user.register((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            //Observer pattern - the new user subscribes to the admin.
            //result.insertId is the user_id that was just created.
            adminSubject.addObserver(result.insertId,(err: Error | null) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                callback(null, result);
            });
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

        //Factory pattern - the registry hands back a factory, the factory builds the strategy.
        FactorRegistry.finalizeFactories();
        const key = Strategy[String(strategy) as keyof typeof Strategy];
        const factory = FactorRegistry.getInstance().getFactory(key);

        if(!factory){
            callback(new Error("Invalid login strategy"),null);
            return;
        }

        const loginStrategy:Login = factory.createLogin();

        //medium fills both slots - each strategy reads only the field it queries on.
        const user:User = new User("",medium,medium,password,loginStrategy);

        user.login((err: Error | null, loggedInUser: User | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, loggedInUser);
        });
    }
}

export default new GuestService();