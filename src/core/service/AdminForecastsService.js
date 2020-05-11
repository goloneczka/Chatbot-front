export default class AdminForecastsService {

    constructor(adminForecastsRepository) {
        this.adminForecastsRepository = adminForecastsRepository;
    }

    getCountries() {
        return this.adminForecastsRepository.getCountries()
    }

    getCitiesForCountry(country) {
        return this.adminForecastsRepository.getCitiesForCountry(country)
    }

    addCountry(name) {
        let data = {
            "country": name
        }
        return this.adminForecastsRepository.addCountry(data)
    }

    validateCountry(country, errorContent) {
        let errors = []

        if(country.name.length === 0) 
            errors.push(errorContent.nameContent)
            
        return errors
    }

    editCountry(oldCountry, newCountry) {
        return this.adminForecastsRepository.editCountry(newCountry, oldCountry.country)
    }

    removeCountry(name){
        return this.adminForecastsRepository.removeCountry(name)
    }

    validateCity(city, errorContent) {
        let errors = []

        if(city.name.length === 0) 
            errors.push(errorContent.nameContent)
        
        if(city.latitude.length === 0) 
            errors.push(errorContent.latitudeContent)
        
        if(city.longitude.length === 0) 
            errors.push(errorContent.longitudeContent)

        if(city.country.length === 0) 
            errors.push(errorContent.countryContent)

        return errors
    }

    addCity(city) {
        return this.adminForecastsRepository.addCity(city)
    }

    editCity(oldCity, newCity) {
        return this.adminForecastsRepository.editCity(newCity, oldCity.city)
    }

    removeCity(name){
        return this.adminForecastsRepository.removeCity(name)
    }

}