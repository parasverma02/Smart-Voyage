import sys
import json

from pymongo import MongoClient
client = MongoClient(port=27017)
db=client.flightInfo
city_dict = dict()



def main():
    print("Executing python script")
    data = json.loads(sys.stdin.readline())
    print("data:",data["cities"])
    i=0
    for city in data["cities"]:
        print(city["city"])
        airport = db.airportcodes.find_one({'city': city["city"]})
        # print(airport)
        city_dict[i] = [airport["code"], city["days"]]
        i = i+1
    print("dictionary is ", city_dict)
    test()
    # search(city_dict)
    # sys.stdout.flush()

def test():
    x = list(db.documents.find({"departureAirportFsCode": "YYZ"}, {"arrivalAirportFsCode": "YVR"}).sort({flightcost:+1}))
    # x = list(db.documents.find({departureAirportFsCode:"YYZ"}))
    print(x)

# def search(cities):
    # for key in cities:
    #     print(len(cities) , cities[key][0])
    #     doc = list(db.documents.aggregate(
    #     [
    #         { $match: {arrivalAirportFsCode: cities[key][0]} }
    #         {
    #         $group:
    #         {
    #             _id: {},
    #             flightcost: { $min: "$flightcost" }
    #         } 
    #         }
    #     ]
    #     ))
    #     print("doc is ", doc)

if __name__ == '__main__':
    main() 