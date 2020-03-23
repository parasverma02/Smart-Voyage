export class FlightDateTime{
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;

    getMonthName(num: number){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[num];
    }
    getDayName(num: number){
        var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
        return days[num];
    }
}