//Observer Design Pattern
import { Update } from "../models/Update";
import { Subscriber } from "../models/Subscriber";

//Every observer must be able to react to a message from the subject.
export interface Observer {
    update(message:string):void;
}

//One observer stands for one user. Its reaction is to store the message
//so that user sees it on the Recent Updates page.
export class UserObserver implements Observer {

    private user_id:number;

    constructor(user_id:number){
        this.user_id=user_id;
    }

    update(message:string): void {

        const newUpdate = new Update(this.user_id,message);

        newUpdate.addUpdate((err:Error|null) => {
            if(err){
                console.log(err);
            }
        })
    }
}

//The admin is the subject. Users subscribe to it when they register,
//and it notifies all of them when a package is created.
//The subscriber list is kept in the database, because registering and
//creating a package are two different requests.
export class AdminSubject {

    public addObserver(user_id:number,callback:Function):void{
        Subscriber.add(user_id,callback);
    }

    public notify(message:string):void{

        Subscriber.getAll((err:Error|null,rows:any[]) => {

            if(err){
                console.log(err);
                return;
            }

            rows.forEach((row) => {
                const observer:Observer = new UserObserver(row.user_id);
                observer.update(message);
            })
        })
    }
}

//One shared subject, so registration and package creation talk to the same one.
export const adminSubject = new AdminSubject();