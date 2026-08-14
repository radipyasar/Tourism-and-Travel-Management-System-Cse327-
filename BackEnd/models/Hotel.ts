import Database from "../db";
import type { QueryError, QueryResult, RowDataPacket } from "mysql2";

export class Hotel {
    private hotelName:string;
    private city:string;
    private costPerNight:number;

    constructor(hotelName:string,city:string,costPerNight:number){
        this.hotelName=hotelName;
        this.city=city;
        this.costPerNight=costPerNight;
    }
    public getHotelName(){
        return this.hotelName;
    }
    public getCity(){
        return this.city;
    }
    public getCostPerNight(){
        return this.costPerNight;
    }
    static getAllHotelNames(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT hotel_name FROM hotel";
        db.query(sql,(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
            const rows = result as RowDataPacket[];
            callback(null, rows.map((row) => row.hotel_name as string));
        })
    }
    static getCostPerNight(hotelName:string,callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT cost_per_night FROM hotel WHERE hotel_name = ?";
        db.query(sql,[hotelName],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? Number(rows[0]!.cost_per_night) : null);
        })
    }
    addHotel(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO hotel(hotel_name,city,cost_per_night) VALUES (?,?,?)";
        db.query(sql,[this.hotelName,this.city,this.costPerNight],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
}