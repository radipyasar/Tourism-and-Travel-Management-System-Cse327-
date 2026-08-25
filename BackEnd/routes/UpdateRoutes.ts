import express, {Express,Request,Response} from "express";
import UpdateController from "../controllers/UpdateController";

const router = express.Router();

router.get("/updates/:id",(req:Request,res:Response) => {
    UpdateController.getUpdates(req,res);
})

export default router;