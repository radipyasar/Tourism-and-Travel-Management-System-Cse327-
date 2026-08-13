import mysql from "mysql2";
import type { Connection } from "mysql2";

//Singleton Design Pattern
class Database {

    private static instance: Database | null = null;
    private connection: Connection;

    private constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "travel_planner"
        });

        this.connection.connect((err) => {
            if (err) {
                console.log("Connection failed");
                console.log(err);
                return;
            }
            console.log("Connected");
        });
    }

    public static getInstance(): Database {
        if (Database.instance === null) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getConnection(): Connection {
        return this.connection;
    }
}

export default Database;