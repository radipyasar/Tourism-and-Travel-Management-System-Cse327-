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
    getProfile(req:Request,res:Response){
        const user_id = req.params.id;
        GuestService.getProfile(Number(user_id),(err:Error,user:any) => {
            if(err){
                res.status(500).json({ message: "Failed to fetch profile" });
                return;
            }
            if(!user){
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.json(user);
        })
    }

    updateProfile(req:Request,res:Response){
        const user_id = req.params.id;
        const {name,phone,email} = req.body;
        GuestService.updateProfile(Number(user_id),name,phone,email,(err:Error) => {
            if(err){
                res.status(500).json({ message: "Update failed" });
                return;
            }
            res.json({ message: "Profile updated" });
        })
    }
    login(req:Request,res:Response){
        const {medium,password,strategy} = req.body;//object destructuting 

        GuestService.login(medium,password,strategy,(err:Error,user:any) => {
            if(err){
                res.status(500).json({ message: "Login failed" });
                return;
            }
            if(!user){
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            res.json({ message: "Login successful", user_id: user.user_id });
        })
    }
}

export default new GuestController();