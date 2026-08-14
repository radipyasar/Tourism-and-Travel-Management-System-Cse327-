import express, {Express,Request,Response} from "express";
import PackageController from "../controllers/PackageController";

const router = express.Router();

router.get("/package-options",(req:Request,res:Response) => {
    PackageController.getPackageOptions(req,res);
})

router.post("/package",(req:Request,res:Response) => {
    PackageController.createPackage(req,res);
})

export default router;