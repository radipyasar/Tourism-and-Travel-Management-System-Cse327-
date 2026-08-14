import express, {Express,Request,Response} from "express";
import TransportationController from "../controllers/TransportationController";

const router = express.Router();

router.post("/transportation",(req:Request,res:Response) => {
    TransportationController.addTransportation(req,res);
})

export default router;