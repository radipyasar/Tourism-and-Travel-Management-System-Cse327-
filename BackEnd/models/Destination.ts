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