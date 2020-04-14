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
                     <joke-item v-for="(joke) in jokes" :joke="joke" :key="joke.id" v-on:removeJoke="removeJoke($event)"  v-on:editJoke="editJoke($event)" />
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
            <ul v-if="editJokeTmp.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editJokeTmp.errors" :key="error">{{error}}</li>
            </ul>
            
            <form  @submit="modifyJoke">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalEditJoke') }}</label>
                    <input type="text" class="form-control" id="inputJoke" aria-describedby="contentHelp" v-model="editJokeTmp.modifiedJoke">
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
import JokeAdminRepoistory from "../../../repository/JokeAdminRepository"
import AdminJokesService from "../../../service/AdminJokesService"

const service = new AdminJokesService(JokeAdminRepoistory)

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
            editJokeTmp: {
                orginalJoke: '',
                modifiedJoke: '',
                errors: []
            }
        }
    },
    mounted(){
        this.error = ''
        service.getCategories()
            .then(
                response =>  {
                    this.showLoading = false

                    if(!response.errors){
                        this.categories = response
                        this.showCategories = true
                        
                    }
                    else 
                        this.error = this.$t('adminJokes.errorListOfCategories') + response.errors[0] 
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

                        if(!response.errors){
                            this.jokes = response
                            this.currentCategory = category
                            this.showCategories = false
                            this.showJokes = true
                        }
                        else 
                            this.error = this.$t('adminJokes.errorListOfJokes') + response.errors[0] 
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
        editJoke(jokeId){
            this.jokes.map(value => {
                if(value.id === jokeId){
                    this.editJokeTmp.orginalJoke = value
                    this.editJokeTmp.modifiedJoke = value.content
                }
            })
            this.$bvModal.show("edit-joke-modal");  
        },
        modifyJoke(e){
            this.editJokeTmp.errors = []
            let errors = service.validateEditJoke({content: this.editJokeTmp.modifiedJoke})
            if(errors.length > 0)
                this.editJokeTmp.errors = errors
            else{
                let joke = {
                    id: this.editJokeTmp.orginalJoke.id,
                    joke: this.editJokeTmp.modifiedJoke
                }
                service.modifyJoke(joke).then(response => {
                    if(!response.errors){
                       this.$bvModal.close("edit-joke-modal");  
                    }
                    else 
                        this.editJokeTmp.errors.push(this.$t('adminJokes.errorModifyResponseJoke') )
                })
            }
                
            e.preventDefault();
        }
    },
    computed: {
        checkEditJoke() { 
            return this.editJokeTmp.orginalJoke.content === this.editJokeTmp.modifiedJoke || this.editJokeTmp.modifiedJoke.length === 0
        },
    }
}
</script>
<style scoped>
    .joke-item {
        background-color: #fff;
        color: #373737;
        box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
        padding: 30px;
        margin-top: 20px;
    }
    .joke-item small {
      font-size: 14px;
      color: #657786;
    }
</style>
