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


# validate the permutations of the input
def test_bruteforce():
    # minimal test suite for statement coverage of bruteforce
    # test case 1:
    assert search.bruteforce({0: ['YYZ', 4], 1: ['YVR', 5]}) == [{'0': ['YYZ', 4], '1': ['YVR', 5]},
                                                                 {'0': ['YVR', 5], '1': ['YYZ', 4]}]
    # test suite for statement coverage ends here

    # minimum test suite for path coverage of bruteforce
    # test case 1: no cities provided that is empty dictionary
    assert search.bruteforce({}) == [{}]
    # test case 2: cities provided with boundary mid values
    assert search.bruteforce({0: ['YYZ', 4], 1: ['YVR', 5], 2: ['YEL', 4]}) == [{'0': ['YYZ', 4], '1': ['YVR', 5], '2': ['YEL', 4]},
                                                                 {'0': ['YYZ', 4], '1': ['YEL', 4], '2': ['YVR', 5]},
                                                                 {'0': ['YVR', 5], '1': ['YYZ', 4], '2': ['YEL', 4]},
                                                                 {'0': ['YEL', 4], '1': ['YYZ', 4], '2': ['YVR', 5]},
                                                                 {'0': ['YVR', 5], '1': ['YEL', 4], '2': ['YYZ', 4]},
                                                                 {'0': ['YEL', 4], '1': ['YVR', 5], '2': ['YYZ', 4]}]
    # test case 3: cities provided with minimal value
    assert search.bruteforce({0: ['YVR', 5]}) == [{'0': ['YVR', 5]}]
    # test suite for path coverage ends here


def test_deep_search():
    # minimal test suite for statement coverage of deep_search function
    # minimal test case 1:
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

    # minimal test case 2:
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

    # test case 3:
    dic2 = {0: ['YYZ', 10], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 4:
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None
    # minimal test suite for statement coverage ends here

    # minimal test suite for path coverage of deep_search function
    # test case 1: found correct route from database
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

    # test case 2: matching data for all cities
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

    # test case 3: no matching data for first city
    dic2 = {0: ['YYZ', 10], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 4: no matching data in database for second city
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 5: no cities other than source
    dic2 = {}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 6: no source city
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 7: last route not found that is from YEV to YUL
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9], 2: ['YEV', 6]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 8: Initial route not found from YUL to YEL
    dic2 = {0: ['YEL', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None

    # test case 9: Flight on 21 April not found in dataset
    dic2 = {0: ['YYZ', 10], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.deep_search('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None
    # minimal test suite for path coverage ends here


# test case to find the minimum cost among the possible routes
def test_controller():
    # minimum test suite for controller for statement coverage
    # test case 1:
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == 1172
    # test case 2:
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 9]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None
    # minimal test suite ends for statement coverage

    # Test Suite for path coverage of controller
    # test case 1: no possible permutations from bruteforce
    dic2 = {}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None
    # test case 2: for no flight routes from database but permutations are there
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 15]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) is None
    # test case 3: we have permutations and flight routes possible, and addition of flight costs with temp cost lesser
    # than mincost
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == 1172
    # test case 4: temp cost is larger than the mincost
    dic2 = {0: ['YVR', 5], 1: ['YYZ', 4]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.controller('YUL', datetime.datetime(2020, 4, 11, 23, 0), dic) == 1172
    # test suite for path coverage ends here


# test case to check if the format of the input is correct such as city codes, num of days and so on
def test_validation():
    """This is the minimum test suite for validation function for statement coverage"""
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 4], '1': ['YVR', 5]}) == True  # test case 1
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YY', 4], '1': ['YVR', 5]}) == False  # test case 2
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 0], '1': ['YVR', 5]}) == False  # test case 3
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 56], '1': ['YVR', 5]}) == False  # test case 4
    assert search.validation('YU', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 4], '1': ['YVR', 5]}) == False  # test case 5
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YUL', 0], '1': ['YVR', 5]}) == False  # test case 6
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['Yyz', 1], '1': ['YVR', 5]}) == False  # test case 7
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['', 0], '1': ['YVR', 5]}) == False  # test case 8
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 0], '1': ['YYZ', 5]}) == False  # test case 9
    # the minimum test suite ends here for statement coverage

    # test suite for minimal path coverage
    # test  case 1: empty base case
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0), {}) == False
    # test  case 2: city entered invalid
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YY', 4], '1': ['YVR', 5]}) == False
    # test  case 3: source and cities format is invalid
    assert search.validation('Yhj', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['yyz', 3], '1': ['YVR', 5]}) == False
    # test  case 4: source city format is invalid
    assert search.validation('Yul', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 2], '1': ['YVR', 5]}) == False
    # test case 5:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['yyz', 3], '1': ['YVR', 5]}) == False
    # test case 6:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 5], '1': ['YVR', 56]}) == False
    # test  case 7:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 0], '1': ['YVR', 0]}) == False
    # test  case 8:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 70], '1': ['YVR', 5]}) == False
    # test  case 9:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 0], '1': ['YVR', 5]}) == False
    # test  case 10:
    assert search.validation('YYZ', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 5], '1': ['YVR', 5]}) == False
    # test case 11:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 4], '1': ['YYZ', 5]}) == False
    # test case 12:
    assert search.validation('YUL', datetime.datetime(2020, 4, 11, 23, 0),
                             {'0': ['YYZ', 4], '1': ['YVR', 5]}) == True
    # test suite for code coverage for validation is done


def test_check_city():
    # minimal test case for path coverage
    # test case 1: valid input
    assert search.check_city('YYZ') == True
    # test case 2: city code has to be 3 Digit code
    assert search.check_city('YY') == False
    # test case 3: code can not be in lower case
    assert search.check_city('yyz') == False
    # test case 4: length more than expected
    assert search.check_city('YYZU') == False
    # test suite for coverage ends here


def test_check_similar_cities():
    # minimal test case for path coverage
    # test case 1: both invalid input
    dic2 = {}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('', dic) == False

    # test case 2: empty dictionary input
    dic2 = {}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('YUL', dic) == False

    # test case 3: no source input
    dic2 = {}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('', dic) == False

    # test case 4: valid input
    dic2 = {0: ['YYZ', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('YUL', dic) == True

    # test case 5: source and other city has similar name which is invalid
    dic2 = {0: ['YUL', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('YUL', dic) == False

    # test case 6: two cities have similar name
    dic2 = {0: ['YVR', 4], 1: ['YVR', 5]}
    dic = collections.OrderedDict(sorted(dic2.items()))
    assert search.check_similar_cities('YUL', dic) == False
    # mininal test suite ends here for path coverage







