//Decorator Design Pattern
import Database from "../db";

export interface Booking {
    addBoking(callback:Function):void;
}

abstract class BookingDecorator implements Booking {
    protected booking:Booking;
    constructor(booking:Booking){
        this.booking = booking;
    }
    abstract addBoking(callback: Function): void;
}

export class GuideAddedBooking extends BookingDecorator {

    addBoking(callback: Function): void {

        //First let the booking underneath save itself.
        this.booking.addBoking((err:Error,result:any) => {

            if(err){
                callback(err,null);
                return;
            }

            //Then add the guide to the row that was just inserted.
            const db = Database.getInstance().getConnection();
            const sql:string = "UPDATE booking SET guide = TRUE WHERE booking_id = ?";

            db.query(sql,[result.insertId],(err) => {

                if(err){
                    callback(err,null);
                    return;
                }

                callback(null,result);
            })
        })
    }
}

