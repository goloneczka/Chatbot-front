<template>
    <div class="category-chooser">

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
                categories: []
            }
        },
        created() {
            jokesService.getAllCategories().then(data => this.categories = data)
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
        margin-left: 3px;
        margin-right: 3px;
    }
</style>