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

# client = MongoClient(port=27017)
# db=client.flightInfo
city_dict = dict()
totalcost = {}
data = {}
x_search = database.y_search

"""all functions are run from the controller function"""


def controller(source, startdate, dic):
    global final_route
    possible_routes = bruteforce(dic)
    print(possible_routes)
    mincost = 100000000
    for route in possible_routes:
        flight_route = []
        flight_route = deep_search(source, startdate, route)
        print(flight_route)
        if (flight_route == None):
            return None
        else:
            tempcost = 0
            for flight in flight_route:
                tempcost += flight['flightcost']
            if (tempcost < mincost):
                final_route = list(flight_route)
                mincost = tempcost
                print("mincost updated:", mincost)
    return mincost


"""validation to check if same city is entered more than once"""


def check_similar_cities(source, cities):
    count = 0
    for i in cities:
        # print(cities[i][0], "aaa")
        if source == cities[i][0]:
            return False
        for j in cities:
            if cities[i][0] == cities[j][0]:
                count += 1
            else:
                continue
        if count > 1:
            return False
        count = 0
    return True


"""all the inputs are validated before passing to functions"""
def validation(source, startdate, dic):
    total_days = 0
    flag = 0
    global mincost
    for key in dic:
        city = dic[key][0]
        # print(city)
        if not check_city(city) or not check_city(source):
            flag = 0
            print("Error: Incorrect City Code!")
            break

        elif dic[key][1] > 60 or dic[key][1] < 1:
            flag = 0
            print("Error: Enter the correct number of days!")
            break

        elif not check_similar_cities(source, dic):
            flag = 0
            print("Error: Please input unique city names!")
            break

        else:
            flag = 1

        total_days = total_days + dic[key][1]

    if flag == 1:
        if 1 < total_days < 60:
            mincost = controller(source, startdate, dic)
            print(mincost)
        else:
            print("Total number of days more than 60 or less than 1!")
            return False
    else:
        return False
    return True


"""to check that the city code is a 3 digit upper case word"""
def check_city(z):
    count = 0
    if z != "":
        for a in z:
            count += 1
            if a.isalpha() and a.isupper():
                continue
            else:
                return False
        if len(z) == 3:
            return True
        else:
            return False
    else:
        return False


def main():
    startdate = datetime.datetime(2020, 4, 11, 23, 0)
    source = 'YUL'
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    result = validation(source, startdate, dic)



"""all the permutations of path are returned by bruteforce"""
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
        sorted_temp_dict = collections.OrderedDict(sorted(temp_dict.items()))
        possible_routes.append(sorted_temp_dict)
    possible = to_dict(possible_routes)
    return possible


"""to convert ordered dictionary to non ordered dictionary"""
def to_dict(input_ordered_dict):
    return loads(dumps(input_ordered_dict))


"""all the routes of different permutations are calculated here"""
def deep_search(source, dat, cities):
    global num_days
    global city_list
    start = source
    d1 = dat.date()
    # cities = to_dict(cities)
    # d1 = getDateTimeFromISO8601String(date)
    d2 = d1 + timedelta(days=1)
    flights = []

    for key in cities:
        # x = list(db.documents.find({"departureAirportFsCode": start, "arrivalAirportFsCode": cities[key][0], "departureTime" : {"$gte":d1}, "arrivalTime" : {"$lt":d2}}).sort("flightcost",1).limit(1))
        cost = 1000000000
        for item in x_search:
            if item[u'departureAirportFsCode'] == start and item[u'arrivalAirportFsCode'] == cities[key][0] and item[
                u'departureTime'].date() == d1:
                if item[u'flightcost'] < cost:
                    city_list = item
        if not city_list:
        # print(start, cities[key][0], d1, d2)
            return None
        flights.append(city_list)
        city_list = []
        start = cities[key][0]
        num_days = cities[key][1]
        d1 = d1 + timedelta(days=num_days)
        d2 = d2 + timedelta(days=num_days)

    for item in x_search:
        cost = 1000000000
        if item[u'departureAirportFsCode'] == start and item[u'arrivalAirportFsCode'] == source and item[
            u'departureTime'].date() == d1:
            if item[u'flightcost'] < cost:
                city_list = item
    if not city_list:
        return None
    flights.append(city_list)
    return flights


if __name__ == '__main__':
    main()
