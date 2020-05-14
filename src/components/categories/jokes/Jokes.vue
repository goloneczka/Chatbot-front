<template>
    <div class="jokes-component">
        <div v-if="showCategories" class="categoryChooser">
            <b-button v-on:click="showJoke(null)">
                {{$t('jokes.user.randomCategoryChosen')}}
            </b-button>
            <JokesCategoryChooser v-on:chooseCategory="showJoke($event)"></JokesCategoryChooser>
        </div>
        <div v-if="showNextSteps">
            <b-button v-if="showRatingJokesBtn" v-on:click="showRatingComponent()">{{$t('jokes.user.rateJokeBtn')}}
            </b-button>
            <b-button v-if="showCategoriesBtn" v-on:click="showAnotherJoke()">{{$t('jokes.user.choiceJokes')}}
            </b-button>
            <b-button v-if="showNewJokeBtn" v-on:click="showNewJoke()">{{$t('jokes.user.tellJokeBtn')}}
            </b-button>
        </div>
        <RatingJoke v-bind:joke-id="shownJoke.id" v-if="showRatingJokesComponent"
                    v-on:showRating="showUserRating($event)"></RatingJoke>
        <TellJokeForm v-if="showNewJokeComponent" @tellJoke="showUsersJoke($event)"></TellJokeForm>

    </div>
</template>

<script>
    import JokesCategoryChooser from "./JokesCategoryChooser";
    import {jokesService} from './../../../App'
    import RatingJoke from "./RatingJoke";
    import TellJokeForm from "./TellJokeForm";

    export default {
        name: "Jokes",
        components: {TellJokeForm, RatingJoke, JokesCategoryChooser},
        data: function () {
            return {
                showCategories: true,
                showNewJokeComponent: false,
                showRatingJokesComponent: false,
                showCategoriesBtn: true,
                showNewJokeBtn: true,
                showRatingJokesBtn: true,
                showNextSteps: false,
                shownJoke: null,
                maxRate: 5,
                error: ''
            }
        },
        created() {
            this.$emit('addMessage', {author: "user", text: this.$t('jokes.user.choiceJokes'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('jokes.bot.cheeringUp'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('jokes.bot.greatJokes'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('jokes.bot.kindOfJokes'), style: "default"});
        },
        methods: {
            sendMessage(author, text) {
                this.$emit('addMessage', {
                    author: author,
                    text: text,
                    style: "default"
                })
            },
            sendMessageFromBot(text) {
                const messagesFromBackend = text.split("\n");
                messagesFromBackend.forEach(message => this.sendMessage("bot", message));
            },
            sendMessageFromUser(text) {
                this.sendMessage("user", text)
            },
            showJoke(category) {
                if (category == null) {
                    this.sendMessageFromUser(this.$t('jokes.user.randomCategoryChosen'));
                    jokesService.getRandomJoke().then(
                        (data) => {
                            if (data.errors) {
                                this.$root.$emit("showDanger",this.$t('jokes.errors.errorGetJoke') + data.errors[0])
                            } else {
                                this.shownJoke = data;
                                this.sendMessageFromBot(this.shownJoke.joke,);
                                this.sendMessageFromBot(this.$t('jokes.bot.nextStep'));
                                this.showCategories = false;
                                this.showNextSteps = true;
                            }

                        }
                    );
                } else {
                    this.sendMessageFromUser(this.$t('jokes.user.categoryChosen') + category);
                    jokesService.getJokeForCategory(category).then(
                        (data) => {
                            if (data.errors) {
                                this.error = this.$t('adminJokes.errorGetJokeCategory') + data.errors[0]
                            } else {
                                this.shownJoke = data;
                                this.sendMessageFromBot(this.shownJoke.joke);
                                this.sendMessageFromBot(this.$t('jokes.bot.nextStep'));
                                this.showCategories = false;
                                this.showNextSteps = true;
                            }
                        }
                    );
                }
            },

            showRatingComponent() {
                this.sendMessageFromUser(this.$t('jokes.user.rateJoke'));
                this.showNextSteps = false;
                this.showRatingJokesComponent = true;
                this.sendMessageFromBot(this.$t('jokes.bot.great'));
                this.sendMessageFromBot(this.$t('jokes.bot.rateJokeResponse2'));
            },

            showUserRating(rating) {
                this.sendMessageFromUser(rating + this.$t('jokes.user.outOf') + this.maxRate);
                if (rating <= 2.5) {
                    this.sendMessageFromBot(this.$t('jokes.bot.lowRate'))
                } else {
                    this.sendMessageFromBot(this.$t('jokes.bot.highRate'))
                }
                this.$emit('addMessage', {
                    author: "bot",
                    data: this.shownJoke.id,
                    style: "jokesMessage"
                });
                this.sendMessageFromBot(this.$t('jokes.bot.nextStep'))
                this.showRatingJokesComponent = false;
                this.showRatingJokesBtn = false;
                this.showNewJokeBtn = true;
                this.showCategoriesBtn = true;
                this.showNextSteps = true;
            },
            showNewJoke() {
                this.sendMessageFromUser(this.$t('jokes.user.tellJoke'));
                this.sendMessageFromBot(this.$t('jokes.bot.tellJokeRespond'));
                this.showNewJokeComponent = true;
                this.showNextSteps = false;
            },
            showUsersJoke(joke) {
                this.showNewJokeComponent = false;
                this.showNextSteps = true;
                this.showRatingJokesBtn = false;
                this.showNewJokeBtn = false;
                this.sendMessageFromUser(joke);
                this.sendMessageFromBot(this.$t('jokes.bot.savingJoke'));
                this.sendMessageFromBot(this.$t('jokes.bot.nextStep'))
            },
            showAnotherJoke() {
                this.showNextSteps = false;
                this.showCategoriesBtn = true;
                this.showNewJokeBtn = true;
                this.showRatingJokesBtn = true;
                this.sendMessageFromUser(this.$t('jokes.user.anotherJoke'));
                this.sendMessageFromBot(this.$t('jokes.bot.anotherJokeResponse'));
                this.showCategories = true;
            }
        }
    }
</script>

<style scoped>
    .jokes-component {
        text-align: right;
    }

    .categoryChooser {
        display: flex;
        float: right;
    }

    button {
        margin-left: var(--jokes-button-left-margin);
        margin-right: var(--jokes-button-right-margin);
    }
</style>
