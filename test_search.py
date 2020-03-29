from bson import ObjectId

import search
import sys
import json
import datetime
from datetime import timedelta
from pymongo import MongoClient
import dateutil.parser
import unicodedata
from itertools import permutations
import collections

client = MongoClient(port=27017)
db=client.flightInfo


def test_bruteforce():
    assert search.bruteforce({0: ['YYZ', 4], 1: ['YVR', 5]}) == [{'0': ['YYZ', 4], '1': ['YVR', 5]}, {'0': ['YVR', 5], '1': ['YYZ', 4]}]


def test_deep_search():
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 4], '1': ['YVR', 5]}) == None
    """[{ 'departureTime': datetime.datetime(2020, 4, 11, 23, 0), 'arrivalTerminal': 1, 'flightcost': 281, 'flightNumber':
124, 'stops': 0, 'departureTerminal': 2, 'arrivalTime': datetime.datetime(2020, 4, 12, 2, 0),
'arrivalAirportFsCode': 'YVR', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e607'), 'departureAirportFsCode': 'YUL',
'carrierFsCode': 'ACA'}, {'departureTime': datetime.datetime(2020, 4, 16, 22, 0), 'arrivalTerminal': 2,
'flightcost': 286, 'flightNumber': 212, 'stops': 0, 'departureTerminal': 2, 'arrivalTime': datetime.datetime(2020,
4, 17, 1, 0), 'arrivalAirportFsCode': 'YYZ', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e671'), 'departureAirportFsCode':
'YVR', 'carrierFsCode': 'ACA'}, {'departureTime': datetime.datetime(2020, 4, 20, 15, 0), 'arrivalTerminal': 3,
'flightcost': 605, 'flightNumber': 179, 'stops': 0, 'departureTerminal': 1, 'arrivalTime': datetime.datetime(2020,
4, 20, 17, 0), 'arrivalAirportFsCode': 'YUL', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e6c7'), 'departureAirportFsCode':
'YYZ', 'carrierFsCode': 'ACA'}]"""
