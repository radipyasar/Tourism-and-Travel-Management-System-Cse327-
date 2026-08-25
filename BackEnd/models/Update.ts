import Database from "../db";
import { RowDataPacket } from "mysql2";

export class Update {
    private user_id:number;
    private message:string;

    constructor(user_id:number,message:string){
        this.user_id=user_id;
        this.message=message;
    }

    public getUserId(){
        return this.user_id;
    }

    public getMessage(){
        return this.message;
    }

    //One row per notified user.
    addUpdate(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO updates(user_id,message) VALUES (?,?)";
        db.query(sql,[this.user_id,this.message],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    }

    static getByUserId(user_id:number,callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT update_id,message,created_at FROM updates WHERE user_id = ? ORDER BY update_id DESC";
        db.query(sql,[user_id],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result as RowDataPacket[]);
        })
    }
}