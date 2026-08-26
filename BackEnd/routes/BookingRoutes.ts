import express, {Express,Request,Response} from "express";
import BookingController from "../controllers/BookingController";

const router = express.Router();

router.post("/booking-verification",(req:Request,res:Response) => {
    BookingController.verifyBooking(req,res);
})

router.post("/booking",(req:Request,res:Response) => {
    BookingController.createBooking(req,res);
})


router.get("/bookings/:id",(req:Request,res:Response) => {
    BookingController.getBookings(req,res);
})

router.get("/bookings",(req:Request,res:Response) => {
    BookingController.getAllBookings(req,res);
})

export default router;