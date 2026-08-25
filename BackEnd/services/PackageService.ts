import { PackageBuilder } from "../patterns/Builder";
import { Destination } from "../models/Destination";
import { Hotel } from "../models/Hotel";
import { Transportation } from "../models/Transportation";
import { Package } from "../models/Package";
import { adminSubject } from "../patterns/Observer";

class PackageService {
    createPackage(destination:string,hotel:string,transportation:string,company:string,days:number,callback:Function){

        if(!destination || !hotel || !transportation || !company || !days){
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

            Transportation.getCostByType(transportation,company,(err: Error | null, travelCost: number | null) => {

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
                    .setCompany(company)
                    .setDays(days)
                    .setCostPerNight(costPerNight)
                    .setTravelCost(travelCost)
                    .build();

                travelPackage.addPackage((err: Error | null) => {

                    if (err) {
                        callback(err, null);
                        return;
                    }

                    //Observer pattern - package is saved, so notify every subscribed user.
                    adminSubject.notify("New Package Added: " + destination);

                    callback(null, { cost: travelPackage.getCost() });
                });
            });
        });
    }
    getAllPackages(callback:Function){
        Package.getAll((err: Error | null, packages: any[]) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, packages);
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

                Transportation.getAllTypes((err: Error | null, transportations: {type:string,company:string}[]) => {

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