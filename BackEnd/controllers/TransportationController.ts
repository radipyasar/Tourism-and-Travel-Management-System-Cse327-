import TransportationService from "../services/TransportationService";
import express, {Express,Request,Response} from "express";

class TransportationController {
    addTransportation(req:Request,res:Response){
        const {transportationType,company,ticketCost} = req.body;
        TransportationService.addTransportation(transportationType,company,ticketCost,(err:Error) => {
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

export default new TransportationController();