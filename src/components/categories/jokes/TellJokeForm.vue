<template>
    <div>
        <JokesCategoryChooser v-if="showCategories" v-on:chooseCategory="saveCategory($event)"></JokesCategoryChooser>
        <b-form @submit="saveJoke" v-if="!showCategories">
            <b-form-input v-model="joke"
                          type="text"
                          required
                          :placeholder="$t('jokes.user.tellJokePlaceholder')">
            </b-form-input>
        </b-form>
    </div>
</template>

<script>
    import JokesCategoryChooser from "./JokesCategoryChooser";
    import {jokesService} from './../../../App';
    export default {
        name: "TellJokeForm",
        components: {JokesCategoryChooser},
        data: function () {
            return {
                showCategories: true,
                joke: "",
                category: null
            }
        },
        methods:{
          saveCategory(category){
              this.category = category;
              this.showCategories = false;
          },
          saveJoke(){
              jokesService.createJoke(this.joke, this.category);
              this.$emit('tellJoke', this.joke);
          }
        }
    }
</script>

<style scoped>
    form{
        margin-left: 50%;
    }
</style>