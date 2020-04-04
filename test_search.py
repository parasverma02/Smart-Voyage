import pytest
from bson import ObjectId
import fetch
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
db = client.flightInfo


def test_bruteforce():
    assert search.bruteforce({0: ['YYZ', 4], 1: ['YVR', 5]}) == [{'0': ['YYZ', 4], '1': ['YVR', 5]},
                                                                 {'0': ['YVR', 5], '1': ['YYZ', 4]}]


def test_deep_search():
    """minimal test case 1:"""
    dic2 = {0: ['YVR', 5], 1: ['YYZ', 4]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == [
        {'departureTime': datetime.datetime(2020, 4, 11, 23, 0), 'arrivalTerminal': 1, 'flightcost': 281,
         'flightNumber': 124, 'stops': 0, 'departureTerminal': 2, 'arrivalTime': datetime.datetime(2020, 4, 12, 2, 0),
         'arrivalAirportFsCode': 'YVR', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e607'), 'departureAirportFsCode': 'YUL',
         'carrierFsCode': 'ACA'},
        {'departureTime': datetime.datetime(2020, 4, 16, 22, 0), 'arrivalTerminal': 2, 'flightcost': 286,
         'flightNumber': 212, 'stops': 0, 'departureTerminal': 2, 'arrivalTime': datetime.datetime(2020, 4, 17, 1, 0),
         'arrivalAirportFsCode': 'YYZ', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e671'), 'departureAirportFsCode': 'YVR',
         'carrierFsCode': 'ACA'},
        {'departureTime': datetime.datetime(2020, 4, 20, 15, 0), 'arrivalTerminal': 3, 'flightcost': 605,
         'flightNumber': 179, 'stops': 0, 'departureTerminal': 1, 'arrivalTime': datetime.datetime(2020, 4, 20, 17, 0),
         'arrivalAirportFsCode': 'YUL', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e6c7'), 'departureAirportFsCode': 'YYZ',
         'carrierFsCode': 'ACA'}]

    """minimal test case 2"""
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == [
        {'departureTime': datetime.datetime(2020, 4, 11, 15, 0), 'arrivalTerminal': 3, 'flightcost': 601,
         'flightNumber': 333, 'stops': 0, 'departureTerminal': 1, 'arrivalTime': datetime.datetime(2020, 4, 11, 17, 0),
         'arrivalAirportFsCode': 'YYZ', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e6d7'), 'departureAirportFsCode': 'YUL',
         'carrierFsCode': 'ACA'},
        {'departureTime': datetime.datetime(2020, 4, 15, 14, 0), 'arrivalTerminal': 3, 'flightcost': 680,
         'flightNumber': 22, 'stops': 0, 'departureTerminal': 1, 'arrivalTime': datetime.datetime(2020, 4, 15, 19, 0),
         'arrivalAirportFsCode': 'YVR', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e6a7'), 'departureAirportFsCode': 'YYZ',
         'carrierFsCode': 'ACA'},
        {'departureTime': datetime.datetime(2020, 4, 20, 11, 0), 'arrivalTerminal': 3, 'flightcost': 690,
         'flightNumber': 11, 'stops': 0, 'departureTerminal': 1, 'arrivalTime': datetime.datetime(2020, 4, 20, 17, 0),
         'arrivalAirportFsCode': 'YUL', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e6b7'), 'departureAirportFsCode': 'YVR',
         'carrierFsCode': 'ACA'}]

    dic2 = {0: ['YYZ', 10], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == None

    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == None


def test_controller():
    """test case to find the minimum cost among the possible routes"""
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == 1172

    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == None


def test_validation():
    """test case to check if the format of the input is correct such as city codes, num of days and so on"""
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 4], '1': ['YVR', 5]}) == True

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YY', 4], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 0], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 56], '1': ['YVR', 5]}) == False

    assert search.validation('YU', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 4], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YUL', 0], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['Yyz', 1], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['', 0], '1': ['YVR', 5]}) == False

    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {'0': ['YYZ', 0], '1': ['YYZ', 5]}) == False



