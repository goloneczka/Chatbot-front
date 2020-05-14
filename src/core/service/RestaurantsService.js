export default class RestaurantsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }


    getAllCatgories(cityId) {
        return this.httpRequest.get(`food/city/${cityId}/cuisine`).then((data) => {
            return data.map(item => item.cuisine)
        });
    }

    getRestaurantOfCityAndCategory(cityId, category) {
        return this.httpRequest.get(`food/city/${cityId}/cuisine/${category}/restaurant`);
    }

    getAllCities() {
        return this.httpRequest.get("food/city");
    }

    rateRestaurant(mark, restaurantId) {
         return this.httpRequest.post("food/rate", {restaurantId: restaurantId, mark: mark});
    }
}
