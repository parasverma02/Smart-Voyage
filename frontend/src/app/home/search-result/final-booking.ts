import { Adult } from './adult';
import { Child } from './child';

export class FinalBooking {
    route: string[];
    totalcost: Number;
    adults: Adult[];
    children: Child[];
    flights: {
        source: string;
        destination: string;
        departureAirportFsCode: string;
        arrivalAirportFsCode: string;
        totalFlightTime: string;
        departureTime: Date;
        arrivalTime: Date;
        flightcost: Number;
        carrierFsCode: string;
        flightNumber: Number;
        stops: Number;
    }[];
    
}