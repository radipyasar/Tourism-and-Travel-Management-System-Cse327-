import User from "../models/User";

class GuestService {
    register(name:String,phone:String,email:String,password:String,callback:Function){
        const user = new User(name,phone,email,password);
         user.register((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
    login(email:String,password:String,callback:Function){
       const user = new User("","",email,password);
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