export class SearchResult {
    route: string[];
    totalcost: Number;
    adults: Number;
    children: Number;
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