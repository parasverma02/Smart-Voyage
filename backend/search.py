import sys
import json

from pymongo import MongoClient
client = MongoClient(port=27017)
db=client.flightInfo
city_dict = dict()
flights = []

def main():
    print("Executing python script")
    data = json.loads(sys.stdin.readline())
    print("data:",data["cities"])
    i=0
    date = data["startdate"]
    source = db.airportcodes.find_one({'city':data["sourcecity"]})
    print(source)
    for city in data["cities"]:
        print(city["city"])
        airport = db.airportcodes.find_one({'city': city["city"]})
        # print(airport)
        city_dict[i] = [airport["code"], city["days"]]
        i = i+1
    print("dictionary is ", city_dict)
    search(source["code"], date, city_dict)
    # sys.stdout.flush()

def search(source, date, cities):
    start = source
    print(start)
    for key in cities:
        x = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": cities[key][0]}).sort("flightcost",1).limit(1))
        flights.append(x[0])
        start = cities[key][0]
    print(start, source)
    y = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": source}).sort("flightcost",1).limit(1))
    print(y)
    # flights.append(x[0])
    print("Flight info:", flights)

if __name__ == '__main__':
    main() 