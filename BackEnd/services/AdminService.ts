import Admin from "../models/Admin";
import { Login } from "../patterns/Strategy";
import { FactorRegistry, Strategy } from "../patterns/Factory";

class AdminService {
    login(medium:String,password:String,strategy:string,callback:Function){

        //Factory pattern - the registry hands back a factory, the factory builds the strategy.
        FactorRegistry.finalizeFactories();
        const key = Strategy[strategy as keyof typeof Strategy];
        const factory = FactorRegistry.getInstance().getFactory(key);

        if(!factory){
            callback(new Error("Invalid login strategy"),null);
            return;
        }

        const loginStrategy:Login = factory.createLogin();

        //medium fills both slots - each strategy reads only the field it queries on.
        const admin = new Admin("",medium,medium,password,loginStrategy);

        admin.login((err: Error | null, loggedInAdmin: Admin | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, loggedInAdmin);
        });
    }
}

export default new AdminService();