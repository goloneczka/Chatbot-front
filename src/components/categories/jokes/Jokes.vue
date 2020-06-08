<template>
    <div class="jokes-component">
        <transition name="button-dropdown-slide">
            <div v-if="showCategories" class="categoryChooser">
                <b-button v-on:click="showJoke(null)">
                    {{$t('jokes.user.randomCategoryChosen')}}
                </b-button>
                <JokesCategoryChooser v-on:chooseCategory="showJoke($event)"></JokesCategoryChooser>
            </div>
        </transition>
        <transition name="button-picker-slide">
            <div v-if="showNextSteps">
                <b-button v-if="showRatingJokesBtn" v-on:click="showRatingComponent()">{{$t('jokes.user.rateJokeBtn')}}
                </b-button>
                <b-button v-if="showCategoriesBtn" v-on:click="showAnotherJoke()">{{$t('jokes.user.choiceJokes')}}
                </b-button>
                <b-button v-if="showNewJokeBtn" v-on:click="showNewJoke()">{{$t('jokes.user.tellJokeBtn')}}
                </b-button>
            </div>
        </transition>
        <RatingJoke v-bind:joke-id="shownJoke.id" v-if="showRatingJokesComponent"
                    v-on:showRating="showUserRating($event)"></RatingJoke>
        <TellJokeForm v-if="showNewJokeComponent" @tellJoke="showUsersJoke($event)"></TellJokeForm>

    </div>
</template>

<script>
    import JokesCategoryChooser from "./JokesCategoryChooser";
    import {jokesService} from './../../../App'
    import {formatter} from "../../../App";
    import RatingJoke from "./RatingJoke";
    import TellJokeForm from "./TellJokeForm";
    import {setMessage} from "../../common/messages";

    export default {
        name: "Jokes",
        components: {TellJokeForm, RatingJoke, JokesCategoryChooser},
        data: function () {
            return {
                showCategories: false,
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
            this.sendMessage("user", this.$t('jokes.user.choiceJokes'), "default").then(() => {
                this.sendMessage("bot", this.$t('jokes.bot.cheeringUp'), "default").then(() => {
                    this.sendMessage("bot", this.$t('jokes.bot.greatJokes'), "default").then(() => {
                        this.sendMessage("bot", this.$t('jokes.bot.kindOfJokes'), "default").then(() => {
                            this.showCategories = true;
                        })
                    })
                })
            });
        },
        methods: {
            sendMessage(author, text, style = 'default') {
                return new Promise((resolve) => {
                    const message = setMessage(author, text, style, resolve)
                    this.$emit('addMessage', message)
                })
            },
            sendMessageFromBot(text) {
                const jokesLines = formatter.asLines(text);
                let p = Promise.resolve();
                jokesLines.forEach(message => p = p.then(() => this.sendMessage("bot", message)));
                return p;
            },
            sendMessageFromUser(text) {
                return this.sendMessage("user", text)
            },
            showJoke(category) {
                this.showCategories = false;
                if (category == null) {
                    this.sendMessageFromUser(this.$t('jokes.user.randomCategoryChosen')).then(() => {
                        jokesService.getRandomJoke().then(
                            (data) => {
                                if (data.errors) {
                                    this.$root.$emit("showDanger", this.$t('jokes.errors.errorGetJoke') + data.errors[0])
                                } else {
                                    this.shownJoke = data;
                                    this.sendMessageFromBot(this.shownJoke.joke,).then(() => {
                                        this.sendMessageFromBot(this.$t('jokes.bot.nextStep')).then(() => {
                                            this.showNextSteps = true;
                                        });
                                    });
                                }
                            }
                        );
                    });
                } else {
                    this.sendMessageFromUser(this.$t('jokes.user.categoryChosen') + category).then(() => {
                        jokesService.getJokeForCategory(category).then(
                            (data) => {
                                if (data.errors) {
                                    this.error = this.$t('adminJokes.errorGetJokeCategory') + data.errors[0];
                                    this.sendMessageFromBot(this.$t('jokes.bot.noJokeInCategory'));
                                } else {
                                    this.shownJoke = data;
                                    this.sendMessageFromBot(this.shownJoke.joke).then(() => {
                                        this.sendMessageFromBot(this.$t('jokes.bot.nextStep')).then(() => {
                                            this.showNextSteps = true;
                                        })
                                    })
                                }
                            }
                        )
                    })
                }
            },
            showRatingComponent() {
                this.showNextSteps = false;
                this.sendMessageFromUser(this.$t('jokes.user.rateJoke')).then(() => {
                    this.sendMessageFromBot(this.$t('jokes.bot.great')).then(() => {
                        this.sendMessageFromBot(this.$t('jokes.bot.rateJokeResponse2')).then(() =>{
                            this.showRatingJokesComponent = true;
                        })
                    })
                });
            },

            showUserRating(rating) {
                this.showRatingJokesComponent = false;
                this.showRatingJokesBtn = false;
                this.sendMessageFromUser(rating + this.$t('jokes.user.outOf') + this.maxRate).then(() => {
                    new Promise(resolve => {
                        if (rating <= 2.5)
                            this.sendMessageFromBot(this.$t('jokes.bot.lowRate')).then(() => resolve())
                         else
                            this.sendMessageFromBot(this.$t('jokes.bot.highRate')).then(() => resolve())
                    }).then(() => {
                        this.sendMessage("bot", this.shownJoke.id, "jokesMessage").then(() =>{
                            this.sendMessageFromBot(this.$t('jokes.bot.nextStep')).then(() => {
                                this.showNewJokeBtn = true;
                                this.showCategoriesBtn = true;
                                this.showNextSteps = true;
                            })
                        })
                    })
                });
            },
            showNewJoke() {
                this.showNextSteps = false;
                this.sendMessageFromUser(this.$t('jokes.user.tellJoke')).then(() => {
                    this.sendMessageFromBot(this.$t('jokes.bot.tellJokeRespond')).then(() => {
                        this.showNewJokeComponent = true;
                    })
                });
            },
            showUsersJoke(joke) {
                this.showNewJokeComponent = false;
                this.showRatingJokesBtn = false;
                this.showNewJokeBtn = false;
                this.sendMessageFromUser(joke).then(() => {
                    this.sendMessageFromBot(this.$t('jokes.bot.savingJoke')).then(() => {
                        this.sendMessageFromBot(this.$t('jokes.bot.nextStep')).then(() => {
                            this.showNextSteps = true;
                        })
                    });
                })
            },
            showAnotherJoke() {
                this.showNextSteps = false;
                this.showCategoriesBtn = true;
                this.showNewJokeBtn = true;
                this.showRatingJokesBtn = true;
                this.sendMessageFromUser(this.$t('jokes.user.anotherJoke')).then(() => {
                    this.sendMessageFromBot(this.$t('jokes.bot.anotherJokeResponse')).then(() => {
                        this.showCategories = true;
                    })
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../../../src/assets/buttonAnimate.css";
    @import "../../../../src/assets/buttonDropdownAnimate.css";


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
