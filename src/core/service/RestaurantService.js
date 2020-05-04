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
                averageUsersRating: 2.0,
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
    getAllCities()
    {
        // TODO POBIERAC Z SERWERA
        // return this.httpRequest.get("food/city").then((data) => {
        //     console.log(data);
        //     return data;
        // });
        return Promise.resolve([{id: 1, city:'jarocin'}, {id: 2, city:'Plock'}])
    }


}
