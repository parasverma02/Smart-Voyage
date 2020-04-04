from datetime import timedelta
import datetime

from bson import ObjectId

y_search = [{'departureTime': datetime.datetime(2020, 4, 1, 16, 0), u'arrivalTerminal': 2, u'flightcost': 256, u'flightNumber':
138, u'stops': 0, u'departureTerminal': 3, u'arrivalTime': datetime.datetime(2020, 4, 1, 18, 0),
u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53b'), u'departureAirportFsCode': u'YEG',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 21, 0), u'arrivalTerminal': 1,
u'flightcost': 221, u'flightNumber': 139, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 2, 2, 0), u'arrivalAirportFsCode': u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53c'), u'departureAirportFsCode':
u'YEG', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 0, 0), u'arrivalTerminal': 2,
u'flightcost': 296, u'flightNumber': 162, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 1, 3, 0), u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53a'), u'departureAirportFsCode':
u'YEG', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 18, 0), u'arrivalTerminal': 1,
u'flightcost': 285, u'flightNumber': 243, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 1, 22, 0), u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53d'), u'departureAirportFsCode':
u'YEG', u'carrierFsCode': u'ACA'},{u'departureTime': datetime.datetime(2020, 4, 1, 0, 0), u'arrivalTerminal': 2, u'flightcost': 640, u'flightNumber':
180, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 1, 5, 0), u'arrivalAirportFsCode':
u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53e'), u'departureAirportFsCode': u'YUL', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 1, 18, 0), u'arrivalTerminal': 1, u'flightcost': 262, u'flightNumber':
124, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 1, 21, 0),
u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e53f'), u'departureAirportFsCode': u'YUL',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 15, 0), u'arrivalTerminal': 3,
u'flightcost': 212, u'flightNumber': 222, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 1, 20, 0), u'arrivalAirportFsCode': u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e540'), u'departureAirportFsCode':
u'YUL', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 12, 0), u'arrivalTerminal': 3,
u'flightcost': 286, u'flightNumber': 111, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 1, 15, 0), u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e541'), u'departureAirportFsCode':
u'YUL', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 4, 0), u'arrivalTerminal': 3,
u'flightcost': 673, u'flightNumber': 178, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 1, 6, 0), u'arrivalAirportFsCode': u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e542'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 20, 0), u'arrivalTerminal': 2,
u'flightcost': 690, u'flightNumber': 132, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 1, 22, 0), u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e543'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'},{u'departureTime': datetime.datetime(2020, 4, 1, 5, 0), u'arrivalTerminal': 1, u'flightcost': 228, u'flightNumber':
158, u'stops': 0, u'departureTerminal': 3, u'arrivalTime': datetime.datetime(2020, 4, 1, 8, 0), u'arrivalAirportFsCode':
u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e544'), u'departureAirportFsCode': u'YVR', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 1, 20, 0), u'arrivalTerminal': 2, u'flightcost': 216, u'flightNumber':
212, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 2, 0, 0), u'arrivalAirportFsCode':
u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e545'), u'departureAirportFsCode': u'YVR', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 1, 9, 0), u'arrivalTerminal': 3, u'flightcost': 621, u'flightNumber': 104,
u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 1, 12, 0), u'arrivalAirportFsCode':
u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e546'), u'departureAirportFsCode': u'YWG', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 1, 18, 0), u'arrivalTerminal': 1, u'flightcost': 698, u'flightNumber':
213, u'stops': 0, u'departureTerminal': 3, u'arrivalTime': datetime.datetime(2020, 4, 1, 22, 0),
u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e547'), u'departureAirportFsCode': u'YWG',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 1, 0), u'arrivalTerminal': 3, u'flightcost':
627, u'flightNumber': 148, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 1, 4, 0),
u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e548'), u'departureAirportFsCode': u'YWG',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 9, 0), u'arrivalTerminal': 3, u'flightcost':
219, u'flightNumber': 247, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 1, 11, 0),
u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e549'), u'departureAirportFsCode': u'YWG',
u'carrierFsCode': u'ACA'},{u'departureTime': datetime.datetime(2020, 4, 1, 21, 0), u'arrivalTerminal': 3, u'flightcost': 671, u'flightNumber':
250, u'stops': 0, u'departureTerminal': 3, u'arrivalTime': datetime.datetime(2020, 4, 2, 2, 0), u'arrivalAirportFsCode':
u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54a'), u'departureAirportFsCode': u'YYZ', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 1, 16, 0), u'arrivalTerminal': 3, u'flightcost': 668, u'flightNumber':
179, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 1, 21, 0),
u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54b'), u'departureAirportFsCode': u'YYZ',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 21, 0), u'arrivalTerminal': 3,
u'flightcost': 660, u'flightNumber': 218, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 1, 23, 0), u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54c'), u'departureAirportFsCode':
u'YYZ', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 1, 17, 0), u'arrivalTerminal': 2,
u'flightcost': 605, u'flightNumber': 165, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 1, 21, 0), u'arrivalAirportFsCode': u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54d'), u'departureAirportFsCode':
u'YYZ', u'carrierFsCode': u'ACA'},{u'departureTime': datetime.datetime(2020, 4, 2, 0, 0), u'arrivalTerminal': 1, u'flightcost': 300, u'flightNumber':
139, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 2, 3, 0), u'arrivalAirportFsCode':
u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e550'), u'departureAirportFsCode': u'YEG', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 2, 5, 0), u'arrivalTerminal': 1, u'flightcost': 276, u'flightNumber': 243,
u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020, 4, 2, 10, 0), u'arrivalAirportFsCode':
u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e551'), u'departureAirportFsCode': u'YEG', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 2, 1, 0), u'arrivalTerminal': 2, u'flightcost': 661, u'flightNumber': 180,
u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 2, 3, 0), u'arrivalAirportFsCode':
u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e552'), u'departureAirportFsCode': u'YUL', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 2, 3, 0), u'arrivalTerminal': 1, u'flightcost': 222, u'flightNumber': 124,
u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 2, 8, 0), u'arrivalAirportFsCode':
u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e553'), u'departureAirportFsCode': u'YUL', u'carrierFsCode': u'ACA'},
{u'departureTime': datetime.datetime(2020, 4, 2, 0, 0), u'arrivalTerminal': 3, u'flightcost': 242, u'flightNumber': 222,
u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 2, 2, 0), u'arrivalAirportFsCode':
u'YWG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e554'), u'departureAirportFsCode': u'YUL', u'carrierFsCode': u'ACA'},{u'departureTime': datetime.datetime(2020, 4, 2, 10, 0), u'arrivalTerminal': 2, u'flightcost': 245, u'flightNumber':
162, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 2, 13, 0),
u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54e'), u'departureAirportFsCode': u'YEG',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 2, 16, 0), u'arrivalTerminal': 2,
u'flightcost': 226, u'flightNumber': 138, u'stops': 0, u'departureTerminal': 3, u'arrivalTime': datetime.datetime(2020,
4, 2, 21, 0), u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e54f'), u'departureAirportFsCode':
u'YEG', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 2, 5, 0), u'arrivalTerminal': 3,
u'flightcost': 265, u'flightNumber': 111, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 2, 9, 0), u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e555'), u'departureAirportFsCode':
u'YUL', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 2, 17, 0), u'arrivalTerminal': 3,
u'flightcost': 685, u'flightNumber': 178, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 2, 20, 0), u'arrivalAirportFsCode': u'YEG', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e556'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 2, 23, 0), u'arrivalTerminal': 2,
u'flightcost': 672, u'flightNumber': 132, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 3, 2, 0), u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e557'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'},{ u'departureTime': datetime.datetime(2020, 4, 11, 23, 0), u'arrivalTerminal': 1, u'flightcost': 281, 'flightNumber':
124, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020, 4, 12, 2, 0),
u'arrivalAirportFsCode': u'YVR', '_id': ObjectId('5e75a9e3b6ffc75bf8e7e607'), u'departureAirportFsCode': u'YUL',
u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 16, 22, 0), u'arrivalTerminal': 2,
u'flightcost': 286, u'flightNumber': 212, u'stops': 0, u'departureTerminal': 2, u'arrivalTime': datetime.datetime(2020,
4, 17, 1, 0), u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e671'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 20, 15, 0), u'arrivalTerminal': 3,
u'flightcost': 605, u'flightNumber': 179, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 20, 17, 0), u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e6c7'), u'departureAirportFsCode':
u'YYZ', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 11, 15, 0), u'arrivalTerminal': 3,
u'flightcost': 601, u'flightNumber': 333, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 11, 17, 0), u'arrivalAirportFsCode': u'YYZ', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e6d7'), u'departureAirportFsCode':
u'YUL', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 15, 14, 0), u'arrivalTerminal': 3,
u'flightcost': 680, u'flightNumber': 22, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 15, 19, 0), u'arrivalAirportFsCode': u'YVR', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e6a7'), u'departureAirportFsCode':
u'YYZ', u'carrierFsCode': u'ACA'}, {u'departureTime': datetime.datetime(2020, 4, 20, 11, 0), u'arrivalTerminal': 3,
u'flightcost': 690, u'flightNumber': 11, u'stops': 0, u'departureTerminal': 1, u'arrivalTime': datetime.datetime(2020,
4, 20, 17, 0), u'arrivalAirportFsCode': u'YUL', u'_id': ObjectId('5e75a9e3b6ffc75bf8e7e6b7'), u'departureAirportFsCode':
u'YVR', u'carrierFsCode': u'ACA'}]