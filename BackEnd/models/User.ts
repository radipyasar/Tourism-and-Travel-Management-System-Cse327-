import Database from "../db";
import type { RowDataPacket } from "mysql2";

class User {
    private name: String;
    private phone: String;
    private email: String;
    private password: String;

    constructor(
        name: String,
        phone: String,
        email: String,
        password: String
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }

     public getName(): String {
        return this.name;
    }

    public getPhone(): String {
        return this.phone;
    }

    public getEmail(): String {
        return this.email;
    }

    public getPassword(): String {
        return this.password;
    }

    register(callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "INSERT INTO users(name,phone,email,password) VALUES (?,?,?,?)";
        db.query(sql,[this.name,this.phone,this.email,this.password],(err,result) => {
            if(err){
                 callback(err,null);
                 return;
              }
             callback(null,result);
        })
    }
    login(callback:Function):void{
         const db = Database.getInstance().getConnection();
        const sql:string = "SELECT user_id,name,email FROM users WHERE email = ? AND password = ?";
        db.query(sql,[this.email,this.password],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }

}

export default User;