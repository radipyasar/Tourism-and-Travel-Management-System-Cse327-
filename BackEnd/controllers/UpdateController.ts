import UpdateService from "../services/UpdateService";
import express, {Express,Request,Response} from "express";

class UpdateController {
    getUpdates(req:Request,res:Response){
        const user_id = req.params.id;
        UpdateService.getUpdates(Number(user_id),(err:Error,result:any) => {
            if(err){
                res.status(500).json({
                    message: "Could not load updates"
                })
                return
            }
            res.json(result);
        })
    }
}

export default new UpdateController();