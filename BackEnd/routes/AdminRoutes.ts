import express, {Express,Request,Response} from "express";
import AdminController from "../controllers/AdminController";

const router = express.Router();

router.post("/admin-login",(req:Request,res:Response) => {
    AdminController.adminLogin(req,res);
})

export default router;