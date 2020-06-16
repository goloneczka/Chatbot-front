<template>
    <div>
        <transition name="button-picker-slide" @after-enter="disabled=false">
            <div class="user-buttons" v-if=exchangeCurrencyButtons>
                <b-button :disabled="disabled" class="m-2" v-on:click="disableButtons(showExchange)"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.exchange')}}
                </b-button>
                <b-button :disabled="disabled" class="m-2" v-on:click="disableButtons(showCurrency)"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.currency')}}
                </b-button>
            </div>
        </transition>
        <transition name="button-dropdown-slide">
            <ExchangeDropdown v-if="showExchanges"/>
        </transition>
        <transition name="button-dropdown-slide">
            <CurrencyDropdown v-if="showCurrencies"/>
        </transition>
        <transition name="button-dropdown-slide">
            <CurrencyDropdown v-if="showAnotherCurrencies"/>
        </transition>
        <transition name="button-dropdown-slide">
            <ChooseTime v-if="showTimeButtons"/>
        </transition>
        <transition name="button-picker-slide" @after-enter="disabled=false">
            <div class="choice-date" v-if="choosePeriod">
                <b-button :disabled="disabled" class="m-2" v-on:click="disableButtons(showDayChoiceComponent)"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.day')}}
                </b-button>
                <b-button :disabled="disabled" class="m-2" v-on:click="disableButtons(showPeriodChoiceComponent)"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.period')}}
                </b-button>
            </div>
        </transition>
        <transition name="button-dropdown-slide">
            <DayChooseComponent v-if="showDayChooser"/>
        </transition>
        <transition name="button-dropdown-slide">
            <PeriodChooseComponent v-if="showPeriodChooser"/>
        </transition>
        <transition name="button-picker-slide">
            <div>
                <HistoryData :stocks="this.data" v-if="showHistoryDataComponent"/>
                <FutureData :stocks="this.data" v-if="showFutureDataComponent"/>
            </div>
        </transition>
    </div>
</template>
<script>

    import ExchangeDropdown from "./models/ExchangeDropdown";
    import CurrencyDropdown from "./models/CurrencyDropdown";
    import ChooseTime from "./models/ChooseTime";
    import DayChooseComponent from "./models/DayChooseComponent"
    import PeriodChooseComponent from "./models/PeriodChooseComponent"
    import HistoryData from "./models/HistoryData";
    import FutureData from "./models/FutureData";
    import {fortuneService} from "../../../App";
    import {sendMessage} from "../../common/messages";
    import {formatter} from "../../../App";
    import {themeService} from "../../../App";

    export default {
        name: 'Fortune',
        components: {
            FutureData,
            HistoryData,
            ChooseTime, CurrencyDropdown, ExchangeDropdown, DayChooseComponent, PeriodChooseComponent
        },
        props: ['botIconSource'],
        data: function () {
            return {
                exchangeCurrencyButtons: false,
                showExchanges: false,
                showCurrencies: false,
                showAnotherCurrencies: false,
                isCurrency: true,
                symbol: null,
                showTimeButtons: false,
                choosePeriod: false,
                showDayChooser: false,
                showPeriodChooser: false,
                showFutureDataComponent: false,
                showHistoryDataComponent: false,
                data: null,
                themeService,
                disabled: false

            }
        },
        created() {
            sendMessage(this, "user", this.$t('fortune.user.entrance')).then(() => {
                sendMessage(this, "bot", this.$t('fortune.bot.entrance')).then(() => {
                    this.exchangeCurrencyButtons = true;
                })
            });
            this.$root.$on('showCurrency', (currency) => this.showAnotherCurrency(currency));
            this.$root.$on('chooseExchange', (exchange) => this.showExchangeAndButtons(exchange));
            this.$root.$on('showActualData', () => this.showActualData());
            this.$root.$on('showFutureData', () => this.showFutureData());
            this.$root.$on('showHistoryData', () => this.showHistoryData());
            this.$root.$on('showDayHistory', (data) => this.showHistoryDataForDay(data));
            this.$root.$on('showPeriodHistory', (data) => this.showHistoryDataForPeriod(data));
        },
        methods: {
            showExchange() {
                this.exchangeCurrencyButtons = false;
                sendMessage(this, "user", this.$t('fortune.user.exchange')).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.exchange')).then(() => {
                        this.showExchanges = true;
                    })
                })
            },
            showCurrency() {
                this.isCurrency = true;
                this.exchangeCurrencyButtons = false;
                sendMessage(this, "user", this.$t('fortune.user.currency')).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.currency')).then(() => {
                        this.showCurrencies = true;
                    })
                })
            },
            showAnotherCurrency(currency) {
                if (this.symbol === null) {
                    this.symbol = currency;
                    this.showCurrencies = false;
                    sendMessage(this, "user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency}`).then(() => {
                        sendMessage(this, "bot", this.$t('fortune.bot.anotherCurrency')).then(() => {
                            this.showAnotherCurrencies = true;
                        })
                    })
                } else {
                    this.showAnotherCurrencies = false;
                    this.symbol = `${this.symbol}/${currency}`;
                    sendMessage(this, "user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency}`).then(() => {
                        sendMessage(this, "bot", this.$t('fortune.bot.chooseTime')).then(() => {
                            this.showTimeButtons = true;
                        })
                    })
                }
            },
            showExchangeAndButtons(exchange) {
                this.showExchanges = false;
                this.symbol = exchange.symbol;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenExchange')} ${exchange.name}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.chooseTime')).then(() => {
                        this.showTimeButtons = true;
                    })
                })
            },
            showHistoryData() {
                this.showTimeButtons = false;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenHistory')}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.historyChoice')).then(() => {
                        this.choosePeriod = true;
                    });
                })
            },
            showDayChoiceComponent() {
                this.choosePeriod = false;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenDay')}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.dayChoice')).then(() => {
                        this.showDayChooser = true;
                    });
                })
            },
            showPeriodChoiceComponent() {
                this.choosePeriod = false;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenPeriod')}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.periodChoice')).then(() => {
                        this.showPeriodChooser = true;
                    });
                })
            },
            showActualData() {
                this.showTimeButtons = false;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenActual')}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.actualData')).then(() => {
                        fortuneService.getActualDataForSymbol(this.symbol, formatter.formatDate(Date.now()))
                            .then(response => {
                                sendMessage(this, "bot",
                                    `${this.$t('fortune.bot.valueStockToday')} ${this.$t('fortune.bot.isValue')} ${response.value}`)
                            })
                    });
                })
            },
            showFutureData() {
                this.showTimeButtons = false;
                sendMessage(this, "user", `${this.$t('fortune.user.chosenFuture')}`).then(() => {
                    sendMessage(this, "bot", this.$t('fortune.bot.futureData')).then(() => {
                        this.showFutureDataComponent = true;
                        fortuneService.getFutureDataForSymbol(this.symbol).then(response => {
                            this.data = response;
                            this.showFutureDataComponent = true;
                        })
                    });
                })
            },
            showHistoryDataForDay(data) {
                this.showDayChooser = false;
                sendMessage(this, "user", `${this.$t('fortune.user.myChoice')} ${data[0]}`).then(() => {
                    fortuneService.getHistoryDataForSymbol(this.symbol, formatter).then(response => {
                        sendMessage(this, "bot",
                            `${this.$t('fortune.bot.valueStockInDay')} ${data[0]} ${this.$t('fortune.bot.value')} ${response.value}`)
                    })
                });
            },
            showHistoryDataForPeriod(data) {
                this.showPeriodChooser = false;
                sendMessage(this, "user",
                    `${this.$t('fortune.user.myChoice')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('fortune.user.to')} ${new Date(data[1]).toLocaleDateString()}`,
                ).then(() => {
                    sendMessage(this, "bot", 
                        `${this.$t('fortune.bot.historyData')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('fortune.user.to')} ${new Date(data[1]).toLocaleDateString()}`
                    ).then(() => {
                        fortuneService.getHistoryDataForSymbolForPeriod(this.symbol, formatter.formatDate(data[0]), formatter.formatDate(data[1]))
                            .then(response => {
                                this.data = response;
                                this.showHistoryDataComponent = true;
                            })
                    })
                });
            },
            disableButtons(afterDisableFunction) {
                this.disabled = true;
                this.$nextTick(() => {
                    afterDisableFunction();
                })
            }
        },
    }
</script>
<style scoped>
    .user-buttons, .choice-date {
        text-align: right;
    }

    /deep/ button {
        border-radius: 1.0rem;
    }
</style>
