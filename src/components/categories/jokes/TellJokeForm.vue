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
        <ul v-if="errors.length" class="alert alert-danger" role="alert">
            <li v-for="(error, index) in errors" :key="index">{{error}}</li>
        </ul>
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
                category: null,
                errors: []
            }
        },
        methods: {
            saveCategory(category) {
                this.category = category;
                this.showCategories = false;
            },

            saveJoke() {
                this.errors = [];
                let errorContent = {
                    nameContent: this.$t('jokes.errors.errorEmptyJoke')
                };
                let errorsTemp = jokesService.validateJoke(this.joke, errorContent);
                if (errorsTemp.length > 0) {
                    this.errors = errorsTemp;
                }
                jokesService.createJoke(this.joke, this.category).then((data) => {
                    if (data.errors) {
                        this.errors.push(this.$t('jokes.errors.errorCreatingJoke') + data.errors[0]);
                    }
                });
                this.$emit('tellJoke', this.joke);
            }
        }
    }
</script>

<style scoped>
    form {
        margin-left: 50%;
    }
</style>