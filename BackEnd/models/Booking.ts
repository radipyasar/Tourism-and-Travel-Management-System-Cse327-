import { Booking } from "../patterns/Decorator";
import Database from "../db";
import { RowDataPacket } from "mysql2";

export class SimpleBooking implements Booking{

    private user_id:number;
    private id:number;
    private payment_method:string;
    private total_cost:number;

    constructor(user_id:number,id:number,payment_method:string,total_cost:number){
        this.user_id = user_id;
        this.id = id;
        this.payment_method = payment_method;
        this.total_cost = total_cost;
    }

    addBoking(callback:Function): void {
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO booking(user_id,id,payment_method,total_cost) VALUES (?,?,?,?)";
        db.query(sql,[this.user_id,this.id,this.payment_method,this.total_cost],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    }
     static getByUserId(user_id:number,callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT b.booking_id,b.guide,b.total_cost,b.payment_method,p.destination,p.hotel,p.transportation,p.company,p.days FROM booking b JOIN package p ON b.id = p.id WHERE b.user_id = ? ORDER BY b.booking_id DESC";
        db.query(sql,[user_id],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result as RowDataPacket[]);
        })
    }
    static getAll(callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT b.booking_id,b.guide,b.total_cost,b.payment_method,u.name,u.email,u.phone,p.destination,p.hotel,p.transportation,p.company,p.days FROM booking b JOIN users u ON b.user_id = u.user_id JOIN package p ON b.id = p.id ORDER BY b.booking_id DESC";
        db.query(sql,(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result as RowDataPacket[]);
        })
    }
    verifyBooking(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT COUNT(*) AS total_rows FROM booking WHERE user_id = ? AND id = ?";
        db.query(sql,[this.user_id,this.id],(err,result) => {
            if(err){
                callback(err,null);
                return
            }
            const rows = result as RowDataPacket[];
            callback(null,rows);
        })
    }
}