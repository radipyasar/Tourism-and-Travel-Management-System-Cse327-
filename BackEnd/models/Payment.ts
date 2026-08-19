import Database from "../db";

export class Payment {
    private booking_id:number;
    private user_id:number;
    private id:number;
    private method:string;

    constructor(booking_id:number,user_id:number,id:number,method:string){
        this.booking_id = booking_id;
        this.user_id = user_id;
        this.id = id;
        this.method = method;
    }

    addPayment(callback:Function){
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO payment(booking_id,user_id,id,method) VALUES (?,?,?,?)";
        db.query(sql,[this.booking_id,this.user_id,this.id,this.method],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    }
}