import { Booking, GuideAddedBooking } from "../patterns/Decorator";
import { SimpleBooking } from "../models/Booking";
import { Payment } from "../models/Payment";

class BookingService {

    createBooking(user_id:number,id:number,guide:boolean,payment_method:string,cost:number,callback:Function){

        if(!user_id || !id || !payment_method || !cost){
            callback(new Error("All fields are required"),null);
            return;
        }

        //Decorator pattern - start with a plain booking, then wrap it
        //if the customer asked for a guide.
        let booking:Booking = new SimpleBooking(user_id,id,payment_method,cost);

        if(guide){
            booking = new GuideAddedBooking(booking);
        }

        booking.addBoking((err:Error|null,result:any) => {

            if(err){
                callback(err,null);
                return;
            }

            //result.insertId is the booking_id that was just created.
            const payment = new Payment(result.insertId,user_id,id,payment_method);

            payment.addPayment((err:Error|null) => {

                if(err){
                    callback(err,null);
                    return;
                }

                callback(null,{ message: "Booking confirmed" });
            });
        });
    }
     getBookings(user_id:number,callback:Function){

        if(!user_id){
            callback(new Error("User id is required"),null);
            return;
        }

        SimpleBooking.getByUserId(user_id,(err:Error|null,bookings:any[]) => {

            if(err){
                callback(err,null);
                return;
            }

            callback(null,bookings);
        });
    }
     getAllBookings(callback:Function){

        SimpleBooking.getAll((err:Error|null,bookings:any[]) => {

            if(err){
                callback(err,null);
                return;
            }

            callback(null,bookings);
        });
    }
    verifyBooking(user_id:number,id:number,callback:Function){
        const booking = new SimpleBooking(user_id,id,"",0);
        booking.verifyBooking((err:Error,result:any)=> {
            if(err){
                callback(err,null);
                return
            }
            callback(null,result);
        })
    }
}

export default new BookingService();