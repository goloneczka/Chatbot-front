export default class RestaurantsService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    uniqBy(a, key) {
        let seen = new Set();
        return a.filter(item => {
            let k = key(item);
            return seen.has(k) ? false : seen.add(k);
        });
    }

    getAllCatgories(cityId) {
        return this.httpRequest.get(`food/city/${cityId}/cuisine`).then((data) => {
            const uniqueArray = this.uniqBy(data, JSON.stringify)
            return uniqueArray.map(item => item.cuisine)
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
