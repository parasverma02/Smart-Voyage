import sys
import json

from pymongo import MongoClient
# Connect to the MongoDB, change the connection string per your MongoDB environment
client = MongoClient(port=27017)
# Set the db object to point to the business database
db=client.flightInfo

def main():
    print("Executing python script")
    data = json.loads(sys.stdin.readline())
    print("data:",data["cities"])
    
    print('The number of flights for city1:')
    numofcities = db.documents.find({'arrivalAirportFsCode': data["cities"][1]}).count()
    print(numofcities)
    sys.stdout.flush()

# def search():

if __name__ == '__main__':
    main() 