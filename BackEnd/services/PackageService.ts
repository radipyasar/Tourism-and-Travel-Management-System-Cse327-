import { PackageBuilder } from "../patterns/Builder";
import { Destination } from "../models/Destination";
import { Hotel } from "../models/Hotel";
import { Transportation } from "../models/Transportation";

class PackageService {
    createPackage(destination:string,hotel:string,transportation:string,days:number,callback:Function){

        if(!destination || !hotel || !transportation || !days){
            callback(new Error("All fields are required"),null);
            return;
        }

        Hotel.getCostPerNight(hotel,(err: Error | null, costPerNight: number | null) => {

            if (err) {
                callback(err, null);
                return;
            }

            if (costPerNight === null) {
                callback(new Error("Hotel not found"), null);
                return;
            }

            Transportation.getCostByType(transportation,(err: Error | null, travelCost: number | null) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                if (travelCost === null) {
                    callback(new Error("Transportation not found"), null);
                    return;
                }

                const travelPackage = new PackageBuilder()
                    .setDestination(destination)
                    .setHotel(hotel)
                    .setTransportation(transportation)
                    .setDays(days)
                    .setCostPerNight(costPerNight)
                    .setTravelCost(travelCost)
                    .build();

                travelPackage.addPackage((err: Error | null) => {

                    if (err) {
                        callback(err, null);
                        return;
                    }

                    callback(null, { cost: travelPackage.getCost() });
                });
            });
        });
    }

    getPackageOptions(callback:Function){
        Destination.getAllCities((err: Error | null, cities: string[]) => {

            if (err) {
                callback(err, null);
                return;
            }

            Hotel.getAllHotelNames((err: Error | null, hotels: string[]) => {

                if (err) {
                    callback(err, null);
                    return;
                }

                Transportation.getAllTypes((err: Error | null, transportations: string[]) => {

                    if (err) {
                        callback(err, null);
                        return;
                    }

                    callback(null, { cities, hotels, transportations });
                });
            });
        });
    }
}

export default new PackageService();