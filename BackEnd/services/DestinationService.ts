import { Destination } from "../models/Destination";

class DestinationService {
    addDestination(city:string,country:string,description:string,callback:Function){
        const destination = new Destination(city,country,description);
         destination.addDestination((err: Error | null, result: any) => {

            if (err) {
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    }
}

export default new DestinationService();