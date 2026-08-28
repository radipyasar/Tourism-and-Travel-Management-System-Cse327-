import Database from "../db";
import type { QueryError, QueryResult, RowDataPacket } from "mysql2";

export class Destination {
    private city:string;
    private country:string;
    private description:string;

    constructor(city:string,country:string,description:string){
        this.city=city;
        this.country=country;
        this.description=description;
    }
    public getCity(){
        return this.city;
    }
    public getCountry(){
        return this.country;
    }
    public getDescription(){
        return this.description;
    }
    static getAllCities(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT city,country FROM destination";
        db.query(sql,(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
            const rows = result as RowDataPacket[];
            callback(null, rows.map((row) => ({
                city: row.city as string,
                country: row.country as string
            })));
        })
    }
    addDestination(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO destination(city,country,description) VALUES (?,?,?)";
        db.query(sql,[this.city,this.country,this.description],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
}