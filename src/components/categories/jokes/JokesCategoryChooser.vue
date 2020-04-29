<template>
    <div class="category-chooser">
        <div v-if="error" class="alert alert-danger" role="alert">
            {{error}}
        </div>
        <b-dropdown v-bind:text="$t('jokes.user.categories')">
            <b-dropdown-item v-for="category in categories" v-bind:key="category" v-on:click="chosenCategory(category)">
                {{category}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
    import { jokesService } from './../../../App'
    export default {
        name: "JokesCategoryChooser",
        data: function(){
            return{
                categories: [],
                error: ''
            }
        },
        mounted() {
            jokesService.getAllCategories().then((data) => {
                if(data.errors){
                    this.error = this.$t('jokes.errors.errorListOfCategories') + data.errors[0];
                }
                else {
                    this.categories = data
                }
            })
        },
        methods:{
            chosenCategory(category){
                this.$emit('chooseCategory', category)
            }
        }
    }
</script>

<style scoped>
    .dropdown{
        margin-left: var(--jokes-button-left-margin);
        margin-right: var(--jokes-button-right-margin);
    }
</style>