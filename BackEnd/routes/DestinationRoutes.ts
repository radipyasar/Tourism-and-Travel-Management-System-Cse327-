import express, {Express,Request,Response} from "express";
import DestinationController from "../controllers/DestinationController";

const router = express.Router();

router.post("/destination",(req:Request,res:Response) => {
    DestinationController.addDestination(req,res);
})

export default router;