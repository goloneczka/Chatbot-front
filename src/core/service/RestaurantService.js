export default class RestaurantService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getAllCatgories() {
        return Promise.resolve(["Burger", "Rybka"]);

        // TODO POBIERAC Z SERWERA
        // return this.httpRequest.get("cities").then((data) => {
        //     const categories = [];
        //     data.forEach(city => categories.push(city.city));
        //     return categories;
        // });
    }
    getRestaurantData(city, category) {
        console.log(city);
        console.log(category);
        return Promise.resolve({name: 'Test 1',
                id: 2,
                address: 'Ul. testowa 1A',
                averageUsersRating: 4.1,
                phoneNumbers: '312343123'
        })
        // TODO POBIERAC Z SERWERA
        // return this.httpRequest.get(`forecasts/city/${city}?date=${date}`).then(data => data);
    }

    getMenuData(restaurantId) {
        console.log(restaurantId);
        return Promise.resolve([{dish: 'kebs', price: 9.99},
            {dish: 'szocik', price: 4},
            {dish: 'pizza', price: 29},
            {dish: 'fryty', price: 6},
            {dish: 'spaghetti', price: 31},
            {dish: 'schabowy', price: 22},
        ])
        // TODO POBIERAC Z SERWERA
    }
    getAvgRate(id){
        console.log(id)
        return Promise.resolve({mark: 2.0})
    }

    rateRestaurant(mark, jokeId) {
        return Promise.resolve({jokeId: jokeId,
            mark: mark})
       // return this.httpRequest.post("jokes/rate", {jokeId: jokeId, mark: mark}).then(data => data);
    }

    getAllCategories()
    {
        // TODO POBIERAC Z SERWERA
        // return this.httpRequest.get("cities").then((data) => {
        //     const citites = [];
        //     data.forEach(city => citites.push(city.city));
        //     return citites;
        // });
    }


}
