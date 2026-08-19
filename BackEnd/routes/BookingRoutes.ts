import express, {Express,Request,Response} from "express";
import BookingController from "../controllers/BookingController";

const router = express.Router();

router.post("/booking",(req:Request,res:Response) => {
    BookingController.createBooking(req,res);
})

export default router;