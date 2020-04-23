<template>
    <div class="admin-jokes-list">
        <AdminNavbar />
        <div class="container mt-5">
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <h3 class="text-left title">
                <div v-if="showCategories">
                    {{ $t('adminJokes.categoriesTitle') }}
                </div>
                <div v-else-if="showJokes">
                    {{ $t('adminJokes.jokesTitle') }}
                </div>
            </h3>
            <div class="row">
                <div v-if="showCategories && categories.length > 0" class="col-12">
 
                    <category-item v-for="(category) in categories" :category="category" :key="category.name" v-on:changeCategory="changeCategory($event)" />
                </div>
                <div v-else-if="showCategories && categories.length == 0" class="col-12">
                     <h3 class="text-center">{{ $t('adminJokes.emptyListOfCategory') }}</h3>
                </div>
                <div v-else-if="showJokes && jokes.length > 0" class="col-12">
                     <joke-item v-for="(joke) in jokes" :joke="joke" :key="joke.id" v-on:removeJoke="removeJoke($event)"  v-on:editJoke="editJokeModal($event)" />
                </div>
                <div v-else-if="showJokes && jokes.length == 0" class="col-12">
                     <h3 class="text-center">{{ $t('adminJokes.emptyListOfJoke') }}</h3>
                </div>
                <div v-else-if="showLoading" class="col-12">
                     <h3 class="text-center">{{ $t('adminJokes.loadingTitle') }}</h3>
                </div>
                <div v-else class="col-12">
                     <h3 class="text-center">{{ $t('adminJokes.errorDefault') }}</h3>
                </div>
            </div>
        </div>
        <b-modal id="edit-joke-modal" :title="$t('adminJokes.modalEditJokeTitle')" hide-footer>
            <ul v-if="editJoke.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editJoke.errors" :key="error">{{error}}</li>
            </ul>
            
            <form  @submit="modifyJoke">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalEditJoke') }}</label>
                    <input type="text" class="form-control" id="inputJoke" aria-describedby="contentHelp" v-model="editJoke.modifiedJoke">
                    <small id="contentHelp" class="form-text text-muted">{{ $t('adminJokes.modalEditJokeInfo') }}</small>
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="checkEditJoke">{{ $t('adminJokes.modalEditJokeSubmit') }}</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>
<script>
import AdminNavbar from "../AdminNavbar"
import CategoryItem from "./CategoryItem"
import JokeItem from "./JokeItem"
import JokeAdminRepository from "../../../core/repository/JokeAdminRepository"
import AdminJokesService from "../../../core/service/AdminJokesService"

const service = new AdminJokesService(JokeAdminRepository)

export default {
    name: 'AdminJokesList',
    components: {
        AdminNavbar,
        CategoryItem,
        JokeItem
    },
    data(){
        return {
            showCategories: false,
            showJokes: false,
            showLoading: true,
            categories: [],
            currentCategory: '',
            jokes: [],
            error: '',
            editJoke: {
                orginalJoke: '',
                modifiedJoke: '',
                errors: []
            }
        }
    },
    mounted(){
        service.getCategories()
            .then(
                response =>  {
                    this.showLoading = false

                    if(response.errors) {
                        this.error = this.$t('adminJokes.errorListOfCategories') + response.errors[0]
                    }
                    else {
                        this.categories = response
                        this.showCategories = true
                    }
                        
                },
                error => {
                    this.error = error
            });
        
    },
    methods: {
        changeCategory(category){
            this.error = ''
            service.getJokesForCategory(category)
                .then(
                    response =>  {
                        this.showLoading = false

                        if(response.errors) {
                            this.error = this.$t('adminJokes.errorListOfJokes') + response.errors[0] 
                        }
                        else {
                            this.jokes = response
                            this.currentCategory = category
                            this.showCategories = false
                            this.showJokes = true
                        }
                            
                });
        },
        removeJoke(jokeId){
            this.error = ''
            service.removeJoke(jokeId)
                .then(
                    response => {
                        if(!response.errors){
                            this.jokes = this.jokes.filter((value) => { value.id !== jokeId});
                        }
                        else 
                            this.error = this.$t('adminJokes.errorDelete') + response.errors[0]
                    }
                )
        },
        editJokeModal(jokeId){
            this.jokes.map(value => {
                if(value.id === jokeId){
                    this.editJoke.orginalJoke = value
                    this.editJoke.modifiedJoke = value.joke
                }
            })
            this.$bvModal.show("edit-joke-modal");  
        },
        modifyJoke(e){
            this.editJoke.errors = []
            let errorContent = {
                jokeContent: this.$t('adminJokes.validateJokeContentEmpty')
            }
            let errors = service.validateEditJoke({content: this.editJoke.modifiedJoke},errorContent)
            if(errors.length > 0)
                this.editJoke.errors = errors
            else{
                let joke = {
                    id: this.editJoke.orginalJoke.id,
                    joke: this.editJoke.modifiedJoke
                }
                service.modifyJoke(joke).then(response => {
                    if(!response.errors){
                       this.$bvModal.close("edit-joke-modal");  
                    }
                    else 
                        this.editJoke.errors.push(this.$t('adminJokes.errorModifyResponseJoke') )
                })
            }
                
            e.preventDefault();
        }
    },
    computed: {
        checkEditJoke() { 
            return this.editJoke.orginalJoke.content === this.editJoke.modifiedJoke || this.editJoke.modifiedJoke.length === 0
        },
    }
}
</script>
<style scoped>
    .joke-item {
        background-color: var(--admin-joke-item-bg-color);
        color: var(--admin-joke-item-color);
        box-shadow: var(--admin-joke-item-box-shadow);
        padding: var(--admin-joke-item-padding);
        margin-top: var(--admin-joke-margin-top);
    }
    .joke-item small {
      font-size: var(--admin-joke-item-small-font-size);
      color: var(--admin-joke-item-small-color);
    }
</style>
