import Database from "../db";
import type { QueryError, QueryResult, RowDataPacket } from "mysql2";
import {Login,EmailLogin,PhoneLogin} from "../patterns/Strategy";

class User {
    private name: String;
    private phone: String;
    private email: String;
    private password: String;
    private loginStrategy: Login ;

    constructor(
        name: String,
        phone: String,
        email: String,
        password: String,
        loginStrategy: Login
    ) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.loginStrategy = loginStrategy;
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
    static getById(user_id:Number,callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "SELECT user_id,name,phone,email FROM users WHERE user_id = ?";
        db.query(sql,[user_id],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            const rows = result as RowDataPacket[];
            callback(null, rows.length > 0 ? rows[0] : null);
        })
    }

    static updateById(user_id:Number,name:String,phone:String,email:String,callback:Function):void{
        const db = Database.getInstance().getConnection();
        const sql:string = "UPDATE users SET name = ?, phone = ?, email = ? WHERE user_id = ?";
        db.query(sql,[name,phone,email,user_id],(err,result) => {
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    }
    login(callback:Function):void{
        this.loginStrategy.login(this.name,this.phone,this.email,this.password,
            (err:QueryError|null,result:any) => {
                if(err){
                    callback(err,null);
                    return
                }
                callback(null,result);
            }
        );
    }

}

export default User;