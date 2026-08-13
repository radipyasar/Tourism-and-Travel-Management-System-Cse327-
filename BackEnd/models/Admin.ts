import Database from "../db";
import type { RowDataPacket } from "mysql2";

class Admin {
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

    adminLogin(callback:Function):void{
         const db = Database.getInstance().getConnection();
        const sql:string = "SELECT admin_id,name,email FROM admin WHERE email = ? AND password = ?";
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

export default Admin;