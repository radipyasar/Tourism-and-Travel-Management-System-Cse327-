import { Transportation } from "../models/Transportation";

class TransportationService {
    addTransportation(type:string,company:string,cost:number,callback:Function){
        const transportation = new Transportation(type,company,cost);
         transportation.addTransportation((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
}

export default new TransportationService();