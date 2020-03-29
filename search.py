import sys
import json
import datetime
from datetime import timedelta

from bson import ObjectId
from pymongo import MongoClient
import dateutil.parser
from itertools import permutations
import collections
from json import loads, dumps
import database






client = MongoClient(port=27017)
db=client.flightInfo
city_dict = dict()
totalcost = {}
data = {}
x_search = database.y_search


def main():
    global data, final_route
    # print("Executing python script")
    data = json.loads(sys.stdin.readline())
    i = 0
    startdate = ""
    startdate += data["date"]
    source = db.airportcodes.find_one({'city':data["source"]})
    for city in data["cities"]:
        airport = db.airportcodes.find_one({'city': city["city"]})
        # print(airport)
        city_dict[i] = [airport["code"], city["days"]]
        i = i + 1
    i = 0
    possible_routes = bruteforce(city_dict)
    mincost = 100000000
    for route in possible_routes:
        flight_route = []
        flight_route = deep_search(source["code"], startdate, route)
        if(flight_route == None):
            pass
        else:
            tempcost = 0
            for flight in flight_route:
                # print("f = ",flight['flightcost'])
                tempcost += flight['flightcost']
            # print("tempcost:", tempcost)
            if(tempcost<mincost):
                final_route = list(flight_route)
                mincost = tempcost
                # print("mincost updated:", mincost)
    mincost = 100000
    formatjson(final_route, mincost)


def bruteforce(cities):
    flight_route = []
    possible_routes = []
    l = list(permutations(range(0, len(cities))))
    for perm in l:
        val = 0
        temp_dict = {}
        for key in cities:
            temp_dict[perm[val]] = cities[key]
            val += 1
        val = 0
        # print(source, date)
        sorted_temp_dict = collections.OrderedDict(sorted(temp_dict.items()))
        possible_routes.append(sorted_temp_dict)
    possible = to_dict(possible_routes)
    return possible


def to_dict(input_ordered_dict):
    return loads(dumps(input_ordered_dict))


def deep_search(source, date, cities):
    start = source
    d1 = date
    #d1 = getDateTimeFromISO8601String(date)
    d2 = d1 + timedelta(days=1)

    flights = []
    x = []

    for key in cities:
        #x = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": cities[key][0], "departureTime" : {"$gte":d1}, "arrivalTime" : {"$lt":d2}}).sort("flightcost",1).limit(1))
        city_list = []
        for item in x_search:
            if item[u'departureAirportFsCode'] == start and item[u'arrivalAirportFsCode'] == cities[key][0] and item[u"departureTime"] == d1 and item[u'arrivalTime'] == d2:
                city_list.append(item)
        cost = 1000000000
        flight_number = 0
        if not city_list:
            # print(start, cities[key][0], d1, d2)
            return None
        for item in city_list:
            if item[u'flightcost'] < cost:
                cost = item[u'flightcost']
                flight_number = item[u'flightNumber']

        for item in x_search:
            if item[u'flightNumber'] == flight_number and item[u'flightcost'] == cost:
                flights.append(item)
                flights = sorted(flights)
                start = cities[key][0]
                num_days = cities[key][1]
                d1 = d1 + timedelta(days=num_days)
                d2 = d2 + timedelta(days=num_days)
                break

    destination_list = []
    for item in x_search:
        if item[u'departureAirportFsCode'] == start and item[u'arrivalAirportFsCode'] == source and item[u'departureTime'] == d1 and item[u'arrivalTime'] == d2:
            destination_list.append(item)
    cost = 1000000000
    flight_number = 0
    for item in destination_list:
        if item[u'flightcost'] < cost:
            cost = item[u'flightcost']
            flight_number = item[u'flightNumber']
    for item in x_search:
        if item[u'flightNumber'] == flight_number and item[u'flightcost'] == cost :
            flights.append(item)
            break
    return flights


def formatjson(final_route, cost):
    global data
    route = []
    flights = []
    result = {}
    flag = True
    for obj in final_route:
        info = {}
        depcity = db.airportcodes.find_one({'code': obj["departureAirportFsCode"]})
        if flag:
            source = depcity['city']
            flag = False
        td = obj["arrivalTime"] - obj["departureTime"]
        days = td.days
        hours, remainder = divmod(td.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        travel_duration = str(hours) + 'h ' + str(minutes) + 'm'
        arrivalcity = db.airportcodes.find_one({'code': obj["arrivalAirportFsCode"]})
        route.append(depcity['city'])
        info["source"] = depcity['city']
        info["destination"] = arrivalcity['city']
        info["departureAirportFsCode"] = obj["departureAirportFsCode"]
        info["arrivalAirportFsCode"] = obj["arrivalAirportFsCode"]
        info["totalFlightTime"] = travel_duration
        info["departureTime"] = obj["departureTime"].isoformat()
        info["arrivalTime"] = obj["arrivalTime"].isoformat()
        info["flightcost"] = obj["flightcost"]
        info["carrierFsCode"] = obj["carrierFsCode"]
        info["flightNumber"] = obj["flightNumber"]
        info["stops"] = obj["stops"]
        flights.append(info)
    route.append(source)
    result["route"] = list(route)
    result["flights"] = list(flights)
    result["totalcost"] = cost
    result["adults"] = data["adults"]
    result["children"] = data["children"]
    print(json.dumps(result))


def getDateTimeFromISO8601String(s):
    d = dateutil.parser.parse(s)
    return d


if __name__ == '__main__':
    main()
