import { Hotel } from "../models/Hotel";

class HotelService {
    addHotel(hotelName:string,city:string,costPerNight:number,callback:Function){
        const hotel = new Hotel(hotelName,city,costPerNight);
         hotel.addHotel((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
}

export default new HotelService();