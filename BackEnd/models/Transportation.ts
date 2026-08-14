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