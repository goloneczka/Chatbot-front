import {httpRequest} from '../../App'
export default {
    getCountries() {
        return httpRequest.get('admin/forecasts/countries')
    },
    getCitiesForCountry(country) {
        return httpRequest.get('admin/forecasts/countries/' + country + '/cities')
    },
    addCountry(data) {
        return httpRequest.post('admin/forecasts/countries', data)
    },
    editCountry(data, oldCountryName) {
        return httpRequest.put('admin/forecasts/countries/'+ oldCountryName, data)
    },
    removeCountry(id) {
        return httpRequest.delete('admin/forecasts/countries/'+id)
    },
    addCity(data) {
        return httpRequest.post('admin/forecasts/cities', data)
    },
    editCity(data, oldCityName) {
        return httpRequest.put('admin/forecasts/cities/'+ oldCityName, data)
    },
    removeCity(id) {
        return httpRequest.delete('admin/forecasts/cities/'+id)
    },
}