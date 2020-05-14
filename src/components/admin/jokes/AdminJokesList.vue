<template>
    <div class="admin-jokes-list">
        <AdminNavbar />
        <div class="container mt-5">
            <h3 class="text-left title">
                <div v-if="showCategories && categories.length > 0">
                    {{ $t('adminJokes.categoriesTitle') }} - {{ $t('adminJokes.addCategoryHeaderName') }} <button class="ml-4 btn btn-outline-secondary" v-on:click="addCategoryShowModal" >{{ $t('adminJokes.emptyListOfCategoryButton') }}</button>
                </div>
                <div v-if="showJokes && jokes.length > 0">
                    {{ $t('adminJokes.jokesTitle') }} {{ $t('adminJokes.addJokeHeaderName') }} <button class="ml-4 btn btn-outline-secondary" v-on:click="addJokeShowModal" >{{ $t('adminJokes.emptyListOfJokeButton') }}</button>
                </div>
            </h3>
            <div v-if="error" class="alert alert-danger" role="alert">
                {{error}}
            </div>
            <div class="row">
                <div v-if="showCategories" class="col-12">
                    <div v-if="categories.length == 0">
                        <div class="text-center mt-4">
                            <h4>{{ $t('adminJokes.emptyListOfCategoryTitle') }} <button class="btn btn-outline-secondary" v-on:click="addCategoryShowModal" >{{ $t('adminJokes.emptyListOfCategoryButton') }}</button></h4>
                        </div>
                    </div>
                    <div v-else>
                        <category-item v-for="(category) in categories" :category="category" :key="category.name" v-on:showJokesForCategory="showJokesForCategory($event)"  v-on:removeCategory="removeCategoryShowAlert($event)"  v-on:editCategory="editCategoryModal($event)" />
                    </div>
                </div>
                <div v-else-if="showJokes" class="col-12">
                    <div v-if="jokes.length == 0">
                        <div class="text-center mt-4">
                            <h4>{{ $t('adminJokes.emptyListOfJokeTitle') }} <button class="btn btn-outline-secondary" v-on:click="addJokeShowModal" >{{ $t('adminJokes.emptyListOfJokeButton') }}</button></h4>
                        </div>
                    </div>
                    <div v-else>
                        <joke-item v-for="(joke) in jokes" :joke="joke" :key="joke.id" v-on:removeJoke="removeJoke($event)"  v-on:editJoke="editJokeModal($event)" />
                    </div>
                </div>
                <div v-else-if="showLoading" class="col-12">
                     <h3 class="text-center">{{ $t('adminJokes.loadingTitle') }}</h3>
                </div>
            </div>
        </div>

        <b-modal id="add-category-modal" :title="$t('adminJokes.modalAddCategoryTitle')" hide-footer>
            <ul v-if="addCategory.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in addCategory.errors" :key="error">{{error}}</li>
            </ul>

            <form  @submit="addNewCategorySubmit">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalNewCategory') }}</label>
                    <input type="text" class="form-control" v-model="addCategory.name">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary">{{ $t('adminJokes.modalAddCategorySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="edit-category-modal" :title="$t('adminJokes.modalEditCategoryTitle')" hide-footer>
            <ul v-if="editCategory.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editCategory.errors" :key="error">{{error}}</li>
            </ul>

            <form  @submit="editCategorySubmit">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalEditCategory') }}</label>
                    <input type="text" class="form-control" v-model="editCategory.newCategory">
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="checkEditCategory" >{{ $t('adminJokes.modalEditCategorySubmit') }}</button>
                </div>
            </form>
        </b-modal>
        <b-modal id="remove-category-alert-modal" :title="$t('adminJokes.modalRemoveCategoryTitle')" hide-footer>
            <ul v-if="removeCategoryAlert.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in removeCategoryAlert.errors" :key="error">{{error}}</li>
            </ul>
            <div class="text-center">
                <p>{{ $t('adminJokes.modalRemoveCategoryTextAlert') }}</p>
                <button class="btn btn-danger btn-sm"  v-on:click="removeCategorySubmit">{{ $t('adminJokes.modalRemoveCategoryButton') }}</button>
            </div>
        </b-modal>

        <b-modal id="add-joke-modal" :title="$t('adminJokes.modalAddJokeTitle')" hide-footer>
            <ul v-if="addJoke.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in addJoke.errors" :key="error">{{error}}</li>
            </ul>

            <form  @submit="addNewJokeSubmit">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalNewJoke') }}</label>
                    <b-textarea cols="15" rows="5" v-model="addJoke.joke" />
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="checkAddJoke" >{{ $t('adminJokes.modalAddJokeSubmit') }}</button>
                </div>
            </form>
        </b-modal>

        <b-modal id="edit-joke-modal" :title="$t('adminJokes.modalEditJokeTitle')" hide-footer>
            <ul v-if="editJoke.errors.length" class="alert alert-danger" role="alert">
                <li v-for="(error) in editJoke.errors" :key="error">{{error}}</li>
            </ul>

            <form  @submit="editJokeSubmit">
                <div class="form-group">
                    <label for="inputJoke">{{ $t('adminJokes.modalEditJoke') }}</label>
                    <b-textarea cols="20" rows="5" type="text" class="form-control" v-model="editJoke.newJoke"/>
                </div>
                <div class="text-right">
                    <button type="submit" class="btn btn-primary" :disabled="checkEditJoke" >{{ $t('adminJokes.modalEditJokeButton') }}</button>
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
            showLoading: true,
            showCategories: false,
            showJokes: false,
            categories: [],
            jokes: [],
            error: '',
            currentCategory: '',
            addCategory: {
                errors: [],
                name: ''
            },
            editCategory: {
                oldCategory: '',
                newCategory: '',
                errors: [],
                name: ''
            },
            removeCategoryAlert: {
                errors: '',
                category: ''
            },
            addJoke: {
                errors:[],
                joke: ''
            },
            editJoke: {
                errors:[],
                id: '',
                oldJoke: '',
                newJoke: '',
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

                });
    },
    methods: {
        addCategoryShowModal(){
            this.$bvModal.show('add-category-modal')
        },
        addNewCategorySubmit(){
            this.addCategory.errors = []
            let errorContent = {
                nameContent: this.$t('adminJokes.validateCategoryNameEmpty')
            }

            let errors = service.validateCategory({name: this.addCategory.name}, errorContent)

            if(errors.length > 0)
                this.addCategory.errors = errors
            else{
                service.addCategory(this.addCategory.name).then(response => {
                    if(response.errors)
                        this.addCategory.errors.push(this.$t('adminJokes.errorAddResponseCategory'))
                    else {
                        this.categories.push({category: this.addCategory.name})
                        this.$bvModal.hide('add-category-modal')
                    }

                })
            }

        },
        showJokesForCategory(category){
            this.showLoading = true
            this.error = ''
            this.showCategories = false

            service.getJokesForCategory(category.category)
                .then(
                    response =>  {
                        this.showLoading = false

                        if(response.errors) {
                            this.error = this.$t('adminJokes.errorListOfJokes') + response.errors[0]
                        }
                        else {
                            this.currentCategory = category.category
                            this.jokes = response
                            this.showJokes = true
                        }

                });


        },
        removeCategoryShowAlert(category){
            this.$bvModal.show('remove-category-alert-modal')
            this.removeCategoryAlert.category = category.category
        },
        removeCategorySubmit(){
            this.removeCategoryAlert.errors = []
            service.removeCategory(this.removeCategoryAlert.category).then(response => {
                    if(response.errors)
                        this.removeCategoryAlert.errors.push(this.$t('adminJokes.errorRemoveResponseCategory'))
                    else {
                        this.categories = this.categories.filter((val) => val.category != this.removeCategoryAlert.category)
                        this.$bvModal.hide('remove-category-alert-modal')
                    }
            })
        },
        editCategoryModal(category){
            this.editCategory.oldCategory = category.category
            this.editCategory.newCategory = category.category
            this.$bvModal.show('edit-category-modal')
        },
        editCategorySubmit(){
            this.editCategory.errors = []
            let errorContent = {
                nameContent: this.$t('adminJokes.validateCategoryNameEmpty')
            }

            let errors = service.validateCategory({name: this.editCategory.newCategory}, errorContent)
            if(errors.length > 0)
                this.editCategory.errors = errors
            else {
                service.editCategory(
                    {category: this.editCategory.oldCategory},
                    {category: this.editCategory.newCategory}
                    ).then(response => {
                    if(response.errors)
                        this.editCategory.errors.push(this.$t('adminJokes.errorEditResponseCategory'))
                    else {
                        this.categories = this.categories.filter((val) => val.category != this.editCategory.oldCategory)
                        this.categories.push({category: this.editCategory.newCategory})
                        this.$bvModal.hide('edit-category-modal')
                    }

                })
            }


        },
        addJokeShowModal(){
            this.$bvModal.show('add-joke-modal')
        },
        addNewJokeSubmit() {
            this.addJoke.errors = []
            let errorContent = {
                jokeContent: this.$t('adminJokes.validateJokeNameEmpty')
            }

            let errors = service.validateJoke({joke: this.addJoke.joke}, errorContent)

            if(errors.length > 0)
                this.addJoke.errors = errors
            else{
                console.log(this.addJoke.joke);
                service.addJoke(this.addJoke.joke, this.currentCategory).then(response => {
                    if(response.errors)
                        this.addJoke.errors.push(this.$t('adminJokes.errorAddResponseCategory'))
                    else {
                        this.jokes.push(response)
                        this.$bvModal.hide('add-joke-modal')
                    }

                })
            }

        },
        editJokeModal(joke) {
            this.editJoke.id = joke.id
            this.editJoke.newJoke = joke.joke
            this.editJoke.oldJoke = joke.joke
            this.$bvModal.show('edit-joke-modal')
        },

        editJokeSubmit(){
            this.editJoke.errors = []
            let errorContent = {
                jokeContent: this.$t('adminJokes.validateJokeContentEmpty')
            }

            let errors = service.validateJoke({joke: this.editJoke.newJoke}, errorContent)
            if(errors.length > 0)
                this.editJoke.errors = errors
            else {
                service.modifyJoke(
                        {
                            id: this.editJoke.id,
                            joke: this.editJoke.newJoke,
                            category: this.currentCategory
                        }
                    ).then(response => {
                    if(response.errors)
                        this.editJoke.errors.push(this.$t('adminJokes.errorEditResponseJoke'))
                    else {
                        this.jokes = this.jokes.filter((val) => val.id != this.editJoke.id)
                        this.jokes.push({
                            id: this.editJoke.id,
                            joke: this.editJoke.newJoke,
                            category: this.currentCategory
                        })
                        this.$bvModal.hide('edit-joke-modal')
                    }

                })
            }

        },
        removeJoke(jokeId){
            this.error = ''
            service.removeJoke(jokeId)
                .then(
                    response => {
                        if(response.errors)
                            this.error = this.$t('adminJokes.errorDelete')
                        else
                            this.jokes = this.jokes.filter((val) => val.id != jokeId);
                    }
                )
        }
    },
    computed: {
        checkEditCategory() {
            return this.editCategory.oldCategory === this.editCategory.newCategory || this.editCategory.newCategory.length === 0
        },
        checkAddJoke() {
            return this.addJoke.joke.length === 0
        },
        checkEditJoke() {
            return this.editJoke.oldJoke === this.editJoke.newJoke || this.editJoke.newJoke.length === 0
        }
    }
}
</script>
<style scoped>
    button {
        float:none;
    }
</style>
