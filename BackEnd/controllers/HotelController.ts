import HotelService from "../services/HotelService";
import express, {Express,Request,Response} from "express";

class HotelContoller {
    addHotel(req:Request,res:Response){
        const {hotelName,city,costPerNight} = req.body;
        HotelService.addHotel(hotelName,city,costPerNight,(err:Error) => {
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

export default new HotelContoller();