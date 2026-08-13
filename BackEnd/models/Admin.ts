import Database from "../db";
import type { QueryError, QueryResult, RowDataPacket } from "mysql2";
import { Login } from "../patterns/Strategy";

class Admin {
    private name: String;
    private phone: String;
    private email: String;
    private password: String;
    private loginStrategy: Login;

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
        this.loginStrategy=loginStrategy;
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

export default Admin;