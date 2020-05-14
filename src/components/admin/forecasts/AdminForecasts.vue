<template>
    <div class="admin-forecasts-country-list">
        <AdminNavbar />
        <div class="container mt-5">
             <h3 class="text-left title">
                <div v-if="showCountries && countries.length > 0">
                    {{ $t('adminForecasts.countriesTitle') }} <button class="ml-4 btn btn-outline-secondary" v-on:click="addCountryShowModal" >{{ $t('adminForecasts.buttonAddCountryHeader') }}</button>
                </div>
            </h3>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <div class="row">
                <div v-if="showCountries" class="col-12">
                    <div v-if="countries.length == 0">
                        <div class="text-center mt-4">   
                            <h4>{{ $t('adminForecasts.emptyListOfCountriesTitle') }} <button class="ml-4 btn btn-outline-secondary" v-on:click="addCountryShowModal" >{{ $t('adminForecasts.buttonAddCountryHeader') }}</button></h4>
                        </div>
                    </div>
                    <div v-else>
                        <country-item v-for="(country) in countries" :country="country" :key="country.country" v-on:showCitiesForCountry="showCitiesForCountry($event)" v-on:editCountry="editCountryShowModal($event)" v-on:removeCountry="removeCountryShowAlert($event)"/>
                    </div>
                </div>
                <div v-else-if="showLoading" class="col-12">
                     <h3 class="text-center">{{ $t('adminForecasts.loadingTitle') }}</h3>
                </div>
            </div>
        </div>
        <b-modal id="add-country-modal" :title="$t('adminForecasts.modalAddCountryTitle')" hide-footer>
            <ul v-if="addCountry.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in addCountry.errors" :key="error">{{error}}</li>
            </ul>
            
            <form @submit="addNewCountrySubmit" @submit.prevent>
                <div class="form-group">
                    <label for=".inputCountry">{{ $t('adminForecasts.modalNewCountry') }}</label>
                    <input type="text" class="form-control inputCountry" v-model="addCountry.country">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">{{ $t('adminForecasts.modalAddCountrySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="edit-country-modal" :title="$t('adminForecasts.modalEditCountryTitle')" hide-footer>
            <ul v-if="editCountry.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editCountry.errors" :key="error">{{error}}</li>
            </ul>
            
            <form  @submit="editCountrySubmit" @submit.prevent>
                <div class="form-group">
                    <label for=".inputCountry">{{ $t('adminForecasts.modalEditCountry') }}</label>
                    <input type="text" class="form-control inputCountry" v-model="editCountry.newName">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="checkEditCountry" >{{ $t('adminForecasts.modalEditCountrySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="remove-country-alert-modal" :title="$t('adminForecasts.modalRemoveCountryTitle')" hide-footer>
            <ul v-if="removeCountryAlert.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in removeCountryAlert.errors" :key="error">{{error}}</li>
            </ul>
            <div class="text-center">
                <p>{{ $t('adminForecasts.modalRemoveCountryTextAlert') }}</p>
                <button class="btn btn-danger btn-sm"  v-on:click="removeCountrySubmit">{{ $t('adminForecasts.modalRemoveCountryButton') }}</button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import AdminNavbar from "../AdminNavbar"
import CountryItem from "./CountryItem"
import AdminForecastsRepository from "../../../core/repository/AdminForecastsRepository"
import AdminForecastsService from "../../../core/service/AdminForecastsService"
const service = new AdminForecastsService(AdminForecastsRepository)

export default {
    name: 'AdminForecastsList',
    components: {
        AdminNavbar,
        CountryItem
    },
    data(){
        return {
            showLoading: true,
            showCountries: false,
            countries: [],
            error: '',
            addCountry: {
                errors: [],
                country: ''
            },
            editCountry: {
                oldName: '',
                newName: '',
                errors: [],
            },
            removeCountryAlert: {
                errors: '',
                country: ''
            },
        }
    },
    mounted(){
        service.getCountries()
            .then(
                response =>  {
                    this.showLoading = false
                    if(response.errors) {
                        this.error = this.$t('adminForecasts.errorListOfCountries') + response.errors[0]
                    }
                    else {
                        this.countries = response
                        this.showCountries = true
                    }
                });
    },
    methods: {
        addCountryShowModal() {
            this.$bvModal.show('add-country-modal')
        },
        addNewCountrySubmit() {
            this.addCountry.errors = []
            let errorContent = {
                nameContent: this.$t('adminForecasts.validateCountryNameEmpty')
            }

            let errors = service.validateCountry({name: this.addCountry.country}, errorContent)

            if(errors.length > 0)
                this.addCountry.errors = errors
            else{
                service.addCountry(this.addCountry.country).then(response => {
                    if(response.errors)
                        this.addCountry.errors.push(this.$t('adminForecasts.errorAddResponseCountry'))
                    else {
                        this.countries.push({country: this.addCountry.country})
                        this.$bvModal.hide('add-country-modal')
                    }
                        
                })
            }
        },
        editCountryShowModal(country) {
            this.editCountry.oldName = country.country
            this.editCountry.newName = country.country
            this.$bvModal.show('edit-country-modal')
        },
        editCountrySubmit() {
            this.editCountry.errors = []
            let errorContent = {
                nameContent: this.$t('adminForecasts.validateCountryNameEmpty')
            }

            let errors = service.validateCountry({name: this.editCountry.newName}, errorContent)

            if(errors.length > 0)
                this.editCountry.errors = errors
            else {
                service.editCountry(
                        {country: this.editCountry.oldName},
                        {country: this.editCountry.newName} 
                    ).then(response => {
                        if(response.errors)
                            this.editCountry.errors.push(this.$t('adminForecasts.errorEditResponseCountry'))
                        else {
                            this.countries = this.countries.filter((val) => val.country != this.editCountry.oldName)
                            this.countries.push({country: this.editCountry.newName})
                            this.$bvModal.hide('edit-country-modal')
                        }  
                })
            }
        },
        removeCountryShowAlert(country) {
            this.$bvModal.show('remove-country-alert-modal')
            this.removeCountryAlert.country = country.country
        },
        removeCountrySubmit() {
            this.removeCountryAlert.errors = []
            service.removeCountry(this.removeCountryAlert.country).then(response => {
                    if(response.errors)
                        this.removeCountryAlert.errors.push(this.$t('adminForecasts.errorRemoveResponseCountry'))
                    else {
                        this.countries = this.countries.filter((val) => val.country != this.removeCountryAlert.country)
                        this.$bvModal.hide('remove-country-alert-modal')
                    }
            })
        },
        showCitiesForCountry(country) {
            this.$router.push({ name: 'admin-forecasts-city-list', params: { countryId: country.country } })
        }
    },
    computed: {
        checkEditCountry() { 
            return this.editCountry.oldName === this.editCountry.newName || this.editCountry.newName.length === 0
        }
    }
}
</script>

<style scoped>
    button {
        float:none;
    }
</style>