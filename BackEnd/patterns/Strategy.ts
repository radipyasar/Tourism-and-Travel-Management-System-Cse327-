//Strategy Design Pattern
import Database from "../db";
import type { RowDataPacket } from "mysql2";

export abstract class Login {
    abstract login(name:String,phone:String,email:String,password:String,callback:Function):void;
}

export class EmailLogin extends Login{
    login(name:String,phone:String,email:String,password:String,callback:Function): void {
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT user_id,name,email FROM users WHERE email = ? AND password = ?";
        db.query(sql,[email,password],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }
}

export class PhoneLogin extends Login{
    login(name:String,phone:String,email:String,password:String,callback:Function): void {
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT user_id,name,phone FROM users WHERE phone = ? AND password = ?";
        db.query(sql,[phone,password],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }  
}

//for admin

export class AdminEmailLOgin extends Login{
     login(name:String,phone:String,email:String,password:String,callback:Function): void {
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT admin_id,name,email FROM admin WHERE email = ? AND password = ?";
        db.query(sql,[email,password],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }
}

export class AdminPhoneLogin extends Login{
    login(name:String,phone:String,email:String,password:String,callback:Function): void {
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT admin_id,name,phone FROM admin WHERE phone = ? AND password = ?";
        db.query(sql,[phone,password],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }  
}


