import AdminService from "../services/AdminService";
import express, {Express,Request,Response} from "express";

class AdminController {
    adminLogin(req:Request,res:Response){
        const {medium,password,strategy} = req.body;
        AdminService.login(medium,password,strategy,(err:Error,user:any) => {
            if(err){
                return res.status(500).json({
                    message : "Login failed"
                })
            }
            if(!user){
                return res.status(401).json({
                    message: "Invalid email/password"
                })
            }
            return res.status(200).json({message : "Login successful"});
        })
    }
}

export default new AdminController();