import express, {Express,Request,Response} from "express";
import GuestController from "../controllers/GuestController";

const router = express.Router();

router.post("/users",(req:Request,res:Response) => {
    GuestController.register(req,res);
})

router.post("/login",(req:Request,res:Response) => {
    GuestController.login(req,res);
})

export default router;