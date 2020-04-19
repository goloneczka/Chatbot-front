export default class WeatherService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }
    getAllCities() {
        return this.httpRequest.get("cities").then((data) => {
            const cities = [];
            data.forEach(city => cities.push(city.city));
            return cities;
        });
    }
    getWeatherData(city, date) {
        return this.httpRequest.get(`forecasts/city/${city}?date=${date}`).then(data => data);
    }
}
