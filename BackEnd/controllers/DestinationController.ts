import DestinationService from "../services/DestinationService";
import express, {Express,Request,Response} from "express";

class DestinationController {
    addDestination(req:Request,res:Response){
        const {city,country,description} = req.body;
        DestinationService.addDestination(city,country,description,(err:Error) => {
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
}

export default new DestinationController();