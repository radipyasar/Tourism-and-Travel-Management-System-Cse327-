import Admin from "../models/Admin";

class AdminService {
    adminLogin(email:String,password:String,callback:Function){
        const admin = new Admin("","",email,password);
        admin.adminLogin((err: Error | null, loggedInAdmin: Admin | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, loggedInAdmin);
        });
    }
}

export default new AdminService();