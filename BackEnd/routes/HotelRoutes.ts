import express, {Express,Request,Response} from "express";
import HotelController from "../controllers/HotelController";

const router = express.Router();

router.post("/hotel",(req:Request,res:Response) => {
    HotelController.addHotel(req,res);
})

export default router;