export default class WeatherService{

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getAllCities(){
        return this.httpRequest.get("cities").then((data) => console.log(data));
    }

    getWeatherData(city, time){
        console.log(city,time)

    }
}
