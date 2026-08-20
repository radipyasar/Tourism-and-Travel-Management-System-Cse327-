import BookingService from "../services/BookingService";
import express, {Express,Request,Response} from "express";

class BookingController {

    createBooking(req:Request,res:Response){
        const {user_id,id,guide,payment_method,cost} = req.body;
        BookingService.createBooking(Number(user_id),Number(id),Boolean(guide),payment_method,Number(cost),(err:Error) => {
            if(err){
                res.status(500).json({
                    message: "Booking failed"
                })
                return
            }
            res.json({
                message: "Booking confirmed"
            })
        })
    }
    verifyBooking(req:Request,res:Response){
        const {user_id,id} = req.body;
        BookingService.verifyBooking(Number(user_id),Number(id),(err:Error,result:any) => {
            if(err){
                res.status(500).json({
                    message: "Verification failed"
                })
                return
            }
            res.json(result);
        })
    }
}

export default new BookingController();