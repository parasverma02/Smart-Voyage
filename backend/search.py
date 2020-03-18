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
totalcost = {}
data = {}

def main():
    global data
    # print("Executing python script")
    data = json.loads(sys.stdin.readline())
    i=0
    startdate = ""
    startdate += data["date"]
    source = db.airportcodes.find_one({'city':data["source"]})
    for city in data["cities"]:
        airport = db.airportcodes.find_one({'city': city["city"]})
        # print(airport)
        city_dict[i] = [airport["code"], city["days"]]
        i = i+1
    i=0
    bruteforce(source["code"], startdate, city_dict)

def bruteforce(source, date, cities):
    global mincost
    global route
    global totalcost
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
    totalcost['totalcost'] = mincost
    # route.append(totalcost)
    # print(route)
    formatjson(route, totalcost)

def search(source, date, cities):
    global route
    global mincost
    start = source
    d1 = getDateTimeFromISO8601String(date)
    d2 = d1 + timedelta(days=1)
    flights = []
    for key in cities:
        x = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": cities[key][0], "departureTime" : {"$gte":d1}, "arrivalTime" : {"$lt":d2}}).sort("flightcost",1).limit(1))
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


def formatjson(finalroute, cost):
    global data
    route = []
    flights = []
    result = {}
    flag = True
    for obj in finalroute:
        info = {}
        depcity = db.airportcodes.find_one({'code': obj["departureAirportFsCode"]})
        if(flag):
            source = depcity['city']
            flag = False
        arrivalcity = db.airportcodes.find_one({'code': obj["arrivalAirportFsCode"]})
        route.append(depcity['city'])
        info["source"] = depcity['city']
        info["destination"] = arrivalcity['city']
        info["departureAirportFsCode"] = obj["departureAirportFsCode"]
        info["arrivalAirportFsCode"] = obj["arrivalAirportFsCode"]
        info["totalFlightTime"] = obj["arrivalTime"] - obj["departureTime"]
        info["departureTime"] = obj["departureTime"]
        info["arrivalTime"] = obj["arrivalTime"]
        info["flightcost"] = obj["flightcost"]
        info["carrierFsCode"] = obj["carrierFsCode"]
        info["flightNumber"] = obj["flightNumber"]
        info["stops"] = obj["stops"]
        flights.append(info)
    route.append(source)
    result["route"] = list(route)
    result["flights"] = list(flights)
    result["totalcost"] = cost["totalcost"]
    result["adults"] = data["adults"]
    result["children"] = data["children"]
    print(result)


def getDateTimeFromISO8601String(s):
    d = dateutil.parser.parse(s)
    return d

if __name__ == '__main__':
    main() 