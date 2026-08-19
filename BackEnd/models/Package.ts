import Database from "../db";
import { RowDataPacket } from "mysql2";

export class Package {
    private destination:string;
    private hotel:string;
    private transportation:string;
    private company:string;
    private days:number;
    private cost:number;

    constructor(destination:string,hotel:string,transportation:string,company:string,days:number,cost:number){
        this.destination=destination;
        this.hotel=hotel;
        this.transportation=transportation;
        this.company=company;
        this.days=days;
        this.cost=cost;
    }
    public getDestination(){
        return this.destination;
    }
    public getHotel(){
        return this.hotel;
    }
    public getTransportation(){
        return this.transportation;
    }
    public getCompany(){
        return this.company;
    }
    public getDays(){
        return this.days;
    }
    public getCost(){
        return this.cost;
    }
    static getAll(callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT id,destination,hotel,transportation,company,days,cost FROM package";
        db.query(sql,(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result as RowDataPacket[]);
        })
    }
    addPackage(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO package(destination,hotel,transportation,company,days,cost) VALUES (?,?,?,?,?,?)";
        db.query(sql,[this.destination,this.hotel,this.transportation,this.company,this.days,this.cost],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
}