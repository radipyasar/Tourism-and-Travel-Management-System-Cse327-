import { Update } from "../models/Update";

class UpdateService {
    getUpdates(user_id:number,callback:Function){

        if(!user_id){
            callback(new Error("User id is required"),null);
            return;
        }

        Update.getByUserId(user_id,(err: Error | null, updates: any[]) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, updates);
        });
    }
}

export default new UpdateService();