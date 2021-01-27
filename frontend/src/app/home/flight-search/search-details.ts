export class SearchDetails {
    source: string;
    date: Date;
    cities: { city: string, days: Number}[];
    class: string;
    adults: number;
    children: number;

    constructor(source: string,cls: string, date: Date, cities: {city: string, days: Number}[], adults: number, children: number){
        this.source = source;
        this.date = date;
        this.cities = cities;
        this.adults = adults;
        this.children = children;
        this.class = cls; 
    }

    updateAdults(value: number){
        this.adults = value;
    }
    updateChildren(value: number){
        this.children = value;
    }
}