//Builder Design Pattern
import { Package } from "../models/Package";

export class PackageBuilder {
    private destination:string = "";
    private hotel:string = "";
    private transportation:string = "";
    private company:string = "";
    private days:number = 0;
    private costPerNight:number = 0;
    private travelCost:number = 0;

    public setDestination(destination:string):PackageBuilder{
        this.destination=destination;
        return this;
    }
    public setHotel(hotel:string):PackageBuilder{
        this.hotel=hotel;
        return this;
    }
    public setTransportation(transportation:string):PackageBuilder{
        this.transportation=transportation;
        return this;
    }
    public setCompany(company:string):PackageBuilder{
        this.company=company;
        return this;
    }
    public setDays(days:number):PackageBuilder{
        this.days=days;
        return this;
    }
    public setCostPerNight(costPerNight:number):PackageBuilder{
        this.costPerNight=costPerNight;
        return this;
    }
    public setTravelCost(travelCost:number):PackageBuilder{
        this.travelCost=travelCost;
        return this;
    }
    private calculateCost():number{
        //hotel stay + return ticket
        return (this.costPerNight * this.days) + (this.travelCost * 2);
    }
    public build():Package{
        return new Package(this.destination,this.hotel,this.transportation,this.company,this.days,this.calculateCost());
    }
}