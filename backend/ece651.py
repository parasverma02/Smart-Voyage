import sys
import re
from itertools import permutations


def main():
    
    #replace the static data with mongo db database
    start_date = 20200320  # yyyymmdd
    start_city = "Toronto"
    datalist = [["Vancouver", 5], ["Calgary", 3], ["Edmonton", 2]]
    # route_list[source, destination, price, date, flight_id]
    Route_list = [["Toronto", "Vancouver", 1200, 20200320, 23], ["Toronto", "Vancouver", 1000, 20200320, 33],
                  ["Toronto", "Calgary", 700, 20200320, 2443], ["Toronto", "Calgary", 900, 20200320, 353],
                  ["Toronto", "Calgary", 1500, 20200320, 66], ["Toronto", "Edmonton", 1100, 20200320, 213],
                  ["Toronto", "Edmonton", 950, 20200320, 38553], ["Toronto", "Edmonton", 1300, 20200320, 646],
                  ["Vancouver", "Toronto", 1100, 20200330, 283], ["Vancouver", "Toronto", 1400, 20200330, 3344],
                  ["Vancouver", "Calgary", 200, 20200325, 273], ["Vancouver", "Calgary", 500, 20200328, 353],
                  ["Vancouver", "Calgary", 1100, 20200327, 66], ["Vancouver", "Edmonton", 1100, 20200325, 213],
                  ["Vancouver", "Edmonton", 1000, 20200328, 383], ["Vancouver", "Edmonton", 1800, 20200327, 6436],
                  ["Edmonton", "Toronto", 300, 20200330, 1123], ["Edmonton", "Toronto", 1300, 20200330, 331],
                  ["Edmonton", "Calgary", 2100, 20200328, 2173], ["Edmonton", "Calgary", 4900, 20200327, 35133],
                  ["Edmonton", "Calgary", 4900, 20200322, 9813],
                  ["Edmonton", "Calgary", 2300, 20200323, 6326], ["Edmonton", "Vancouver", 1100, 20200322, 21423],
                  ["Edmonton", "Vancouver", 2000, 20200325, 33283], ["Edmonton", "Vancouver", 1600, 20200328, 6346],
                  ["Calgary", "Toronto", 3200, 20200330, 1153], ["Calgary", "Toronto", 2500, 20200330, 3311],
                  ["Calgary", "Edmonton", 1100, 20200325, 2123], ["Calgary", "Edmonton", 2290, 20200328, 3833],
                  ["Calgary", "Edmonton", 2500, 20200323, 6366], ["Calgary", "Vancouver", 1170, 20200327, 2823],
                  ["Calgary", "Vancouver", 1470, 20200323, 21123],
                  ["Calgary", "Vancouver", 2040, 20200325, 3883], ["Calgary", "Vancouver", 1240, 20200328, 6146]]

    permut = []
    perm = permutations(datalist)
    for i in list(perm):
        permut.append(i)

    resultant = []
    inc = []

    for j in range(0, len(permut)):
        inc.append(start_city)
        inc.append(start_date)
        for i in range(0, len(permut[j])):
            increment = permut[j][i][1]  # increasing the date to get the next date
            source = permut[j][i][0]
            start_date = start_date + increment
            new_start_date = start_date % 100
            if new_start_date > 30:
                start_date = start_date + 70
                new_start_date = start_date % 10000
                new_start_date = new_start_date / 100
                if new_start_date > 12:
                    start_date = start_date + 8800

            inc.append(source)
            inc.append(start_date)
        inc.append(start_city)
        resultant.append(inc)
        inc = []
        start_date = 20200320
    print(resultant)

    solution_ids = []
    solution_costs = []
    final_route_ids = []
    final_cost_matrix = []
    routes_id2 = 0
    route_cost = 0
    max_list = []
    for i in range(len(resultant)):
        for j in range(len(resultant[i]) - 2):
            for k in range(len(Route_list)):
                if resultant[i][j] == Route_list[k][0] and resultant[i][j + 2] == Route_list[k][1] and resultant[i][
                    j + 1] == Route_list[k][3]:
                    max_list.append(resultant[i][j])
                    max_list.append(resultant[i][j + 1])
                    max_list.append(resultant[i][j + 2])
                    max_list.append(Route_list[k][2])
                    max_list.append(Route_list[k][4])
                    print(max_list)

            if 0 < len(max_list) < 6:
                routes_id2 = max_list[4]
                route_cost = max_list[3]
                print(max_list[4], "4 element")

            elif len(max_list) > 6:
                routes_id = max_list[3]
                for l in range(5, len(max_list), 5):
                    if routes_id < max_list[l + 3]:
                        print(routes_id)
                        routes_id2 = max_list[4]
                        route_cost = max_list[3]
                    else:
                        print(max_list[l + 3])
                        routes_id = max_list[l + 3]
                        max_list[3] = max_list[l + 3]
                        max_list[4] = max_list[l + 4]
                        routes_id2 = max_list[l + 4]
                        route_cost = max_list[l + 3]
            if routes_id2 != 0 and route_cost != 0:
                final_route_ids.append(routes_id2)
                final_cost_matrix.append(route_cost)

            print("fetching corresponding flight ids:", final_route_ids)
            routes_id2 = 0
            route_cost = 0
            max_list = []

        solution_ids.append(final_route_ids)
        solution_costs.append(final_cost_matrix)
        final_route_ids = []
        final_cost_matrix = []
    print("flight ids of each flight in different permutations", solution_ids)
    print("cost of different flights in each permutation:", solution_costs)

    min_cost_matrix = []
    min_cost = 0
    for i in range(len(solution_costs)):
        for j in range(len(solution_costs[i])):
            min_cost += solution_costs[i][j]
        min_cost_matrix.append(min_cost)
        min_cost = 0
    print("cost of different paths or permutations:", min_cost_matrix)

    ind = 0
    abc = min(min_cost_matrix)
    for k in range(len(min_cost_matrix)):
        if abc == min_cost_matrix[k]:
            ind = k
    print("The minimum possible cost of the tour would be:", abc)

    final_route = []
    for i in range(len(solution_ids[ind])):
        final_route.append(solution_ids[ind][i])

    print("The cheapest route with all the destinations traversed would be (with flight ids):", final_route)
    # the data with respect to the flight ids to be fetched to get the whole data of the arrival and departure dates
    # with flight details


if __name__ == '__main__':
    main()
