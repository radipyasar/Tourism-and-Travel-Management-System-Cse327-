import PackageService from "../services/PackageService";
import express, {Express,Request,Response} from "express";

class PackageController {
    createPackage(req:Request,res:Response){
        const {destination,hotel,transportation,company,days} = req.body;
        PackageService.createPackage(destination,hotel,transportation,company,days,(err:Error,result:any) => {
            if(err){
                res.status(500).json({
                    message: "Package creation failed"
                })
                return
            }
            res.json({
                message: "Package created successfully",
                cost: result.cost
            })
        })
    }

    getPackageOptions(req:Request,res:Response){
        PackageService.getPackageOptions((err:Error,result:any) => {
            if(err){
                res.status(500).json({
                    message: "Could not load options"
                })
                return
            }
            res.json(result);
        })
    }
}

export default new PackageController();