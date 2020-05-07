<template>
    <div class="admin-forecasts-city-list">
        <AdminNavbar />
        <div class="container mt-5">
             <h3 class="text-left title">
                <div v-if="showCities && cities.length > 0">
                    {{ $t('adminForecasts.citiesTitle') }}  {{this.$route.params.countryId}} - <button class="ml-4 btn btn-outline-secondary" v-on:click="addCityShowModal" >{{ $t('adminForecasts.buttonAddCityHeader') }}</button>
                </div>
            </h3>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <div class="row">
                <div v-if="showCities" class="col-12">
                    <div v-if="cities.length == 0">
                        <div class="text-center mt-4">   
                            <h4>{{ $t('adminForecasts.emptyListOfCitiesTitle') }}</h4>
                        </div>
                    </div>
                    <div v-else>
                        <city-item v-for="(city) in cities" :city="city" :key="city.city" v-on:editCity="editCityModal($event)" v-on:removeCity="removeCityShowAlert($event)"/>
                    </div>
                </div>
                <div v-else-if="showLoading" class="col-12">
                     <h3 class="text-center">{{ $t('adminForecasts.loadingTitle') }}</h3>
                </div>
            </div>
        </div>
        <b-modal id="add-city-modal" :title="$t('adminForecasts.modalAddCityTitle')" hide-footer>
            <ul v-if="addCity.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in addCity.errors" :key="error">{{error}}</li>
            </ul>
            
            <form @submit="addNewCitySubmit" @submit.prevent>
                <div class="form-group">
                    <label for=".inputCity">{{ $t('adminForecasts.modalNewCity') }}</label>
                    <input type="text" class="form-control inputCity" v-model="addCity.city">
                </div>
                <div class="form-group">
                    <label for=".inputLatitude">{{ $t('adminForecasts.modalNewLatitude') }}</label>
                    <input type="text" class="form-control inputLatitude" v-model="addCity.latitude">
                </div>
                <div class="form-group">
                    <label for=".inputLongitude">{{ $t('adminForecasts.modalNewLongitude') }}</label>
                    <input type="text" class="form-control inputLongitude" v-model="addCity.longitude">
                </div>
                <div class="form-group">
                    <label for=".inputCountry">{{ $t('adminForecasts.modalNewCityCountry') }}</label>
                    <input disabled type="text" class="form-control inputCountry" v-model="addCity.country">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">{{ $t('adminForecasts.modalAddCitySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="edit-city-modal" :title="$t('adminForecasts.modalEditCityTitle')" hide-footer>
            <ul v-if="editCity.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editCity.errors" :key="error">{{error}}</li>
            </ul>
            
            <form  @submit="editCitySubmit" @submit.prevent>
                <div class="form-group">
                    <label for=".inputCity">{{ $t('adminForecasts.modalNewCity') }}</label>
                    <input type="text" class="form-control inputCity" v-model="editCity.cityNew">
                </div>
                <div class="form-group">
                    <label for=".inputLatitude">{{ $t('adminForecasts.modalNewLatitude') }}</label>
                    <input type="text" class="form-control inputLatitude" v-model="editCity.latitudeNew">
                </div>
                <div class="form-group">
                    <label for=".inputLongitude">{{ $t('adminForecasts.modalNewLongitude') }}</label>
                    <input type="text" class="form-control inputLongitude" v-model="editCity.longitudeNew">
                </div>
                <div class="form-group">
                    <label for=".inputCountry">{{ $t('adminForecasts.modalNewCityCountry') }}</label>
                    <input disabled type="text" class="form-control inputCountry" v-model="editCity.countryNew">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">{{ $t('adminForecasts.modalEditCitySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="remove-city-alert-modal" :title="$t('adminForecasts.modalRemoveCityTitle')" hide-footer>
            <ul v-if="removeCityAlert.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in removeCityAlert.errors" :key="error">{{error}}</li>
            </ul>
            <div class="text-center">
                <p>{{ $t('adminForecasts.modalRemoveCityTextAlert') }}</p>
                <button class="btn btn-danger btn-sm"  v-on:click="removeCitySubmit">{{ $t('adminForecasts.modalRemoveCityButton') }}</button>
            </div>
        </b-modal>
    </div>
</template>
<script>
import AdminNavbar from "../AdminNavbar"
import CityItem from "./CityItem"
import AdminForecastsRepository from "../../../core/repository/AdminForecastsRepository"
import AdminForecastsService from "../../../core/service/AdminForecastsService"
const service = new AdminForecastsService(AdminForecastsRepository)
export default {
    name: 'AdminForecastsCityList',
    components: {
        AdminNavbar,
        CityItem
    },
    data(){
        return {
            showLoading: true,
            showCities: false,
            cities: [],
            error: '',
            addCity: {
                errors: [],
                city: '',
                latitude: '',
                longitude: '',
                country: ''
            },
            editCity: {
                errors: [],
                cityOld: '',
                cityNew: '',
                latitudeOld: '',
                latitudeNew: '',
                longitudeOld: '',
                longitudeNew: '',
                countryOld: '',
                countryNew: '',
            },
            removeCityAlert: {
                errors: '',
                city: ''
            },
        }
    },
    mounted(){
        service.getCitiesForCountry(this.$route.params.countryId)
            .then(
                response =>  {
                    this.showLoading = false
                    if(response.errors) {
                        this.error = this.$t('adminForecasts.errorListOfCities') + response.errors[0]
                    }
                    else {
                        this.cities = response
                        this.showCities = true
                    }
        });
    },
    methods: {
        addCityShowModal() {
            this.addCity.country = this.$route.params.countryId;
            this.$bvModal.show('add-city-modal')
        },
        addNewCitySubmit() {
            this.addCity.errors = []
            let errorContent = {
                nameContent: this.$t('adminForecasts.validateCityNameEmpty'),
                latitudeContent: this.$t('adminForecasts.validateLatitudeNameEmpty'),
                longitudeContent: this.$t('adminForecasts.validateLongitudeNameEmpty'),
                countryContent: this.$t('adminForecasts.validateCountryNameEmpty')
            }

            let errors = service.validateCity(
                {
                    name: this.addCity.city,
                    latitude: this.addCity.latitude,
                    longitude: this.addCity.longitude,
                    country: this.addCity.country
                }, 
                errorContent)

            if(errors.length > 0)
                this.addCity.errors = errors
            else{
                service.addCity(this.addCity).then(response => {
                    if(response.errors)
                        this.addCity.errors.push(this.$t('adminForecasts.errorAddResponseCity'))
                    else {
                        this.cities.push(this.addCity)
                        this.$bvModal.hide('add-city-modal')
                    }
                        
                })
            }
        },
        editCityModal(city) {
            this.editCity.cityOld = city.city
            this.editCity.cityNew = city.city
            this.editCity.latitudeOld = city.latitude
            this.editCity.latitudeNew = city.latitude
            this.editCity.longitudeOld = city.longitude
            this.editCity.longitudeNew = city.longitude
            this.editCity.countryOld = city.country
            this.editCity.countryNew = city.country
            this.$bvModal.show('edit-city-modal')
        },
        editCitySubmit() {
            this.editCity.errors = []
            let errorContent = {
                nameContent: this.$t('adminForecasts.validateCityNameEmpty'),
                latitudeContent: this.$t('adminForecasts.validateLatitudeNameEmpty'),
                longitudeContent: this.$t('adminForecasts.validateLongitudeNameEmpty'),
                countryContent: this.$t('adminForecasts.validateCountryNameEmpty')
            }

            let errors = service.validateCity(
                {
                    name: this.editCity.cityNew,
                    latitude: this.editCity.latitudeNew,
                    longitude: this.editCity.longitudeNew,
                    country: this.editCity.countryNew
                }, 
                errorContent)

            if(errors.length > 0)
                this.editCity.errors = errors
            else {
                service.editCity(
                        {city: this.editCity.cityOld},
                        {
                            city: this.editCity.cityNew,
                            latitude: this.editCity.latitudeNew,
                            longitude: this.editCity.longitudeNew,
                            country: this.editCity.countryNew
                        } 
                    ).then(response => {
                        if(response.errors)
                            this.editCity.errors.push(this.$t('adminForecasts.errorEditResponseCity'))
                        else {
                            this.cities = this.cities.filter((val) => val.city != this.editCity.cityOld)
                            this.cities.push({
                                city: this.editCity.cityNew,
                                latitude: this.editCity.latitudeNew,
                                longitude: this.editCity.longitudeNew,
                                country: this.editCity.countryNew
                            })
                            this.$bvModal.hide('edit-city-modal')
                        }  
                })
            }

        },
        removeCityShowAlert(city) {
            this.$bvModal.show('remove-city-alert-modal')
            this.removeCityAlert.city = city.city
        },
        removeCitySubmit() {
            this.removeCityAlert.errors = []
            service.removeCity(this.removeCityAlert.city).then(response => {
                    if(response.errors)
                        this.removeCityAlert.errors.push(this.$t('adminForecasts.errorRemoveResponseCity'))
                    else {
                        this.cities = this.cities.filter((val) => val.city != this.removeCityAlert.city)
                        this.$bvModal.hide('remove-city-alert-modal')
                    }
            })
        }

    }
}

</script>
<style scoped>
</style>