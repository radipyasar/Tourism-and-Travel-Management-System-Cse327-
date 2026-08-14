import Database from "../db";

export class Package {
    private destination:string;
    private hotel:string;
    private transportation:string;
    private days:number;
    private cost:number;

    constructor(destination:string,hotel:string,transportation:string,days:number,cost:number){
        this.destination=destination;
        this.hotel=hotel;
        this.transportation=transportation;
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
    public getDays(){
        return this.days;
    }
    public getCost(){
        return this.cost;
    }
    addPackage(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO package(destination,hotel,transportation,days,cost) VALUES (?,?,?,?,?)";
        db.query(sql,[this.destination,this.hotel,this.transportation,this.days,this.cost],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
}