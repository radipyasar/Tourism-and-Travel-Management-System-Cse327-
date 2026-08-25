import Database from "../db";
import { RowDataPacket } from "mysql2";

export class Subscriber {

    //Called when a user registers - the user starts following the admin.
    static add(user_id:number,callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO subscribers(user_id) VALUES (?)";
        db.query(sql,[user_id],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    }

    //The full subscriber list, used when the admin notifies everyone.
    static getAll(callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT user_id FROM subscribers";
        db.query(sql,(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result as RowDataPacket[]);
        })
    }
}