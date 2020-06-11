<template>
    <div class="jokes-component">
        <transition name="button-dropdown-slide">
            <div v-if="showCategories" class="categoryChooser">
                <b-button v-on:click="showJoke(null)" v-bind:class="themeService.getActiveTheme().themeName">
                    {{$t('jokes.user.randomCategoryChosen')}}
                </b-button>
                <JokesCategoryChooser v-on:chooseCategory="showJoke($event)"></JokesCategoryChooser>
            </div>
        </transition>
        <transition name="button-picker-slide">
            <div v-if="showNextSteps">
                <b-button v-if="showRatingJokesBtn" v-on:click="showRatingComponent()"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('jokes.user.rateJokeBtn')}}
                </b-button>
                <b-button v-if="showCategoriesBtn" v-on:click="showAnotherJoke()"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('jokes.user.choiceJokes')}}
                </b-button>
                <b-button v-if="showNewJokeBtn" v-on:click="showNewJoke()"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('jokes.user.tellJokeBtn')}}
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
    import {themeService} from "../../../App";
    import {sendMessage} from "../../common/messages";

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
                error: '',
                themeService
            }
        },
        created() {
           sendMessage( this, "user", this.$t('jokes.user.choiceJokes')).then(() => {
               sendMessage( this, "bot", this.$t('jokes.bot.cheeringUp')).then(() => {
                   sendMessage( this, "bot", this.$t('jokes.bot.greatJokes')).then(() => {
                       sendMessage( this, "bot", this.$t('jokes.bot.kindOfJokes')).then(() => {
                            this.showCategories = true;
                        })
                    })
                })
            });
        },
        methods: {
            sendMessageFromBot(text) {
                const jokesLines = formatter.asLines(text);
                let concatenatedPromise = Promise.resolve();
                jokesLines.forEach(message => concatenatedPromise = concatenatedPromise.then(() => sendMessage( this, "bot", message)));
                return concatenatedPromise;
            },
            sendMessageFromUser(text) {
                return sendMessage( this, "user", text)
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
                        this.sendMessageFromBot(this.$t('jokes.bot.rateJokeResponse2')).then(() => {
                            this.showRatingJokesComponent = true;
                        })
                    })
                });
            },

            showUserRating(rating) {
                this.showRatingJokesComponent = false;
                this.showRatingJokesBtn = false;
                this.sendMessageFromUser(rating + this.$t('jokes.user.outOf') + this.maxRate).then(() => {
                    if (rating <= 2.5)
                        this.sendMessageFromBot(this.$t('jokes.bot.lowRate')).then(() => {
                           sendMessage( this, "bot", this.shownJoke.id, "jokesMessage").then(() => {
                                this.sendMessageFromBot(this.$t('jokes.bot.nextStep')).then(() => {
                                    this.showNewJokeBtn = true;
                                    this.showCategoriesBtn = true;
                                    this.showNextSteps = true;
                                })
                            })
                        })
                    else
                        this.sendMessageFromBot(this.$t('jokes.bot.highRate')).then(() => {
                           sendMessage( this, "bot", this.shownJoke.id, "jokesMessage").then(() => {
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

    /deep/ button {
        border-radius: 1.0rem;
    }

</style>
