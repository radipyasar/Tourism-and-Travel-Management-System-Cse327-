import Database from "../db";
import type { QueryError, QueryResult, RowDataPacket } from "mysql2";

export class Transportation {
    private type:string;
    private company:string;
    private cost:number;

    constructor(type:string,company:string,cost:number){
        this.type=type;
        this.company=company;
        this.cost=cost;
    }
    public getType(){
        return this.type;
    }
    public getCompany(){
        return this.company;
    }
    public getCost(){
        return this.cost;
    }
    static getAllTypes(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT type,company FROM transportation ORDER BY type,company";
        db.query(sql,(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
            const rows = result as RowDataPacket[];
            callback(null, rows.map((row) => ({type : row.type as string, company : row.company as string})));
        })
    }
    static getCostByType(type:string,company:string,callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT cost FROM transportation WHERE type = ? AND company = ?";
        db.query(sql,[type,company],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? Number(rows[0]!.cost) : null);
        })
    }
    addTransportation(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO transportation(type,company,cost) VALUES (?,?,?)";
        db.query(sql,[this.type,this.company,this.cost],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
}