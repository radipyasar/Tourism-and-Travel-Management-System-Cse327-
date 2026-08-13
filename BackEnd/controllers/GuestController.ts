import GuestService from "../services/GuestService";
import express, {Express,Request,Response} from "express";

class GuestController {
    register(req:Request,res:Response){
        const {name,phone,email,password} = req.body;
        GuestService.register(name,phone,email,password,(err:Error) => {
            if(err){
                res.status(500).json({
                    message: "Registration failed"
                })
                return
            }
            res.json({
                message: "Registration successful"
            })
        })
    }
    login(req:Request,res:Response){
        const {email,password} = req.body;//object destructuting 

        GuestService.login(email,password,(err:Error,user:any) => {
            if(err){
                res.status(500).json({ message: "Login failed" });
                return;
            }
            if(!user){
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            res.json({ message: "Login successful"});
        })
    }
}

export default new GuestController();