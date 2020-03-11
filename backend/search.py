import sys
import json
import datetime
from datetime import timedelta
from pymongo import MongoClient
import dateutil.parser
from itertools import permutations 
import collections

client = MongoClient(port=27017)
db=client.flightInfo
city_dict = dict()
route = []
mincost = 10000000

def main():
    # print("Executing python script")
    data = json.loads(sys.stdin.readline())
    # print("data:",data["cities"])
    i=0
    startdate = ""
    startdate += data["date"][0]
    source = db.airportcodes.find_one({'city':data["source"]})
    for city in data["cities"]:
        airport = db.airportcodes.find_one({'city': city["city"]})
        # print(airport)
        city_dict[i] = [airport["code"], city["days"]]
        i = i+1
    i=0
    bruteforce(source["code"], startdate, city_dict)
    # sys.stdout.flush()

def bruteforce(source, date, cities):
    global mincost
    global route
    l = list(permutations(range(0, len(cities))))
    for perm in l:
        val=0
        temp_dict = {}
        for key in cities:
            temp_dict[perm[val]] = cities[key]
            val+=1
        val = 0
        # print(source, date)
        # print(temp_dict)
        sorted_temp_dict = collections.OrderedDict(sorted(temp_dict.items()))
        search(source, date, sorted_temp_dict)
        # print("proceeding...")
    totalcost = {}
    totalcost['totalcost'] = mincost
    route.append(totalcost)
    # print(mincost)
    print(route)

def search(source, date, cities):
    global route
    global mincost
    start = source
    d1 = getDateTimeFromISO8601String(date)
    d2 = d1 + timedelta(days=1)
    flights = []
    for key in cities:
        x = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": cities[key][0], "departureTime" : {"$gte":d1}, "arrivalTime" : {"$lt":d2}}).sort("flightcost",1).limit(1))
        # print(x)
        if(x==[]):
            # print(start, cities[key][0])
            return
        flights.append(x[0])
        start = cities[key][0]
        num_days = cities[key][1]
        d1 = d1 + timedelta(days=num_days)
        d2 = d2 + timedelta(days=num_days)
    y = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": source, "departureTime" : {"$gte":d1}}).sort("flightcost",1).limit(1))
    if(y!=""):
        flights.append(y[0])
    # print(flights)
    tempcost = 0
    for flight in flights:
        tempcost += flight['flightcost']
    # print("tempcost:", tempcost)
    if(tempcost<mincost):
        route = list(flights)
        mincost = tempcost
        # print("mincost updated")

def getDateTimeFromISO8601String(s):
    d = dateutil.parser.parse(s)
    return d

if __name__ == '__main__':
    main() 