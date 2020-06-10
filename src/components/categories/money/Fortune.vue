<template>
    <div>
        <transition name="button-picker-slide">
            <div class="user-buttons" v-if=exchangeCurrencyButtons>
                <b-button class="m-2" v-on:click="showExchange"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.exchange')}}</b-button>
                <b-button class="m-2" v-on:click="showCurrency"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.currency')}}</b-button>
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
        <transition name="button-picker-slide">
            <div class="choice-date" v-if="choosePeriod">
                <b-button class="m-2" v-on:click="showDayChoiceComponent"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.day')}}</b-button>
                <b-button class="m-2" v-on:click="showPeriodChoiceComponent"
                          v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.period')}}</b-button>
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
    import {setMessage} from "../../common/messages";
    import {formatter} from  "../../../App";
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
                themeService

            }
        },
        created() {
            this.sendMessage("user", this.$t('fortune.user.entrance') ).then(() => {
                this.sendMessage("bot", this.$t('fortune.bot.entrance') ).then(() => {
                    this.exchangeCurrencyButtons = true;
                })
            })
            this.$root.$on('showCurrency', (currency) => this.showAnotherCurrency(currency));
            this.$root.$on('chooseExchange', (exchange) => this.showExchangeAndButtons(exchange));
            this.$root.$on('showActualData', () => this.showActualData());
            this.$root.$on('showFutureData', () => this.showFutureData());
            this.$root.$on('showHistoryData', () => this.showHistoryData());
            this.$root.$on('showDayHistory', (data) => this.showHistoryDataForDay(data));
            this.$root.$on('showPeriodHistory', (data) => this.showHistoryDataForPeriod(data));
        },
        methods: {
            sendMessage(author, text, style) {
                return new Promise((resolve) => {
                    const message = setMessage(author, text, style, resolve)
                    this.$emit('addMessage', message);
                });
            },
            showExchange() {
                this.exchangeCurrencyButtons = false;
                this.sendMessage("user", this.$t('fortune.user.exchange') ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.exchange') ).then(() => {
                        this.showExchanges = true;
                    })
                })
            },
            showCurrency() {
                this.isCurrency = true;
                this.exchangeCurrencyButtons = false;
                this.sendMessage("user", this.$t('fortune.user.currency') ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.currency') ).then(() => {
                        this.showCurrencies = true;
                    })
                })
            },
            showAnotherCurrency(currency) {
                if (this.symbol === null) {
                    this.symbol = currency.symbol;
                    this.showCurrencies = false;
                    this.sendMessage("user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency.name}` ).then(() => {
                        this.sendMessage("bot", this.$t('fortune.bot.anotherCurrency') ).then(() => {
                            this.showAnotherCurrencies = true;
                        })
                    })
                } else {
                    this.showAnotherCurrencies = false;
                    this.symbol = `${this.symbol}=${currency.symbol}`;
                    this.sendMessage("user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency.name}` ).then(() => {
                        this.sendMessage("bot", this.$t('fortune.bot.chooseTime') ).then(() => {
                            this.showTimeButtons = true;
                        })
                    })
                }
            },
            showExchangeAndButtons(exchange) {
                this.showExchanges = false;
                this.symbol = exchange.symbol;
                this.sendMessage("user", `${this.$t('fortune.user.chosenExchange')} ${exchange.name}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.chooseTime') ).then(() => {
                        this.showTimeButtons = true;
                    })
                })
            },
            showHistoryData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenHistory')}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.historyChoice') ).then(() => {
                        this.choosePeriod = true;
                    });
                })
            },
            showDayChoiceComponent() {
                this.choosePeriod = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenDay')}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.dayChoice') ).then(() => {
                        this.showDayChooser = true;
                    });
                })
            },
            showPeriodChoiceComponent() {
                this.choosePeriod = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenPeriod')}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.periodChoice') ).then(() => {
                        this.showPeriodChooser = true;
                    });
                })
            },
            showActualData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenActual')}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.actualData') ).then(() => {
                        fortuneService.getActualDataForSymbol(this.symbol, formatter.formatDate(Date.now()))
                            .then(response => {
                                this.sendMessage("bot",
                                    `${this.$t('fortune.bot.valueStockToday')} ${this.$t('fortune.bot.isValue')} ${response.value}` )
                            })
                    });
                })
            },
            showFutureData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenFuture')}` ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.futureData') ).then(() => {
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
                this.sendMessage("user", `${this.$t('fortune.user.myChoice')} ${data[0]}` ).then(() => {
                    fortuneService.getHistoryDataForSymbol(this.symbol, formatter).then(response => {
                        this.sendMessage("bot",
                            `${this.$t('fortune.bot.valueStockInDay')} ${data[0]} ${this.$t('fortune.bot.value')} ${response.value}` )
                    })
                });
            },
            showHistoryDataForPeriod(data) {
                this.showPeriodChooser = false;
                this.sendMessage("user",
                    `${this.$t('fortune.user.myChoice')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('fortune.user.to')} ${new Date(data[1]).toLocaleDateString()}`,
                     ).then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.historyData') ).then(() => {
                        fortuneService.getHistoryDataForSymbolForPeriod(this.symbol, formatter.formatDate(data[0]), formatter.formatDate(data[1]))
                            .then(response => {
                                this.data = response;
                                this.showHistoryDataComponent = true;
                            })
                    })
                });
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
