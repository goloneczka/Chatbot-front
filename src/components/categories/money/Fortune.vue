<template>
    <div>
        <transition name="button-picker-slide">
            <div class="user-buttons" v-if=exchangeCurrencyButtons>
                <b-button class="m-2" v-on:click="showExchange">{{$t('fortune.buttons.exchange')}}</b-button>
                <b-button class="m-2" v-on:click="showCurrency">{{$t('fortune.buttons.currency')}}</b-button>
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
                <b-button class="m-2" v-on:click="showDayChoiceComponent">{{$t('fortune.buttons.day')}}</b-button>
                <b-button class="m-2" v-on:click="showPeriodChoiceComponent">{{$t('fortune.buttons.period')}}</b-button>
            </div>
        </transition>
        <transition name="button-dropdown-slide">
            <DayChooseComponent v-if="showDayChooser"/>
        </transition>
        <transition name="button-dropdown-slide">
            <PeriodChooseComponent v-if="showPeriodChooser"/>
        </transition>
        <div>
            <HistoryData :stocks="this.data" v-if="showHistoryDataComponent"/>
            <FutureData :stocks="this.data" v-if="showFutureDataComponent"/>
        </div>
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
    import {formatter} from "../../../App";
    import {setMessage} from "../../common/messages";

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
                data: null

            }
        },
        created() {
            this.sendMessage("user", this.$t('fortune.user.entrance'), "default").then(() => {
                this.sendMessage("bot", this.$t('fortune.bot.entrance'), "default").then(() => {
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
            sendMessage(author, text, style = 'default') {
                return new Promise((resolve) => {
                    const message = setMessage(author, text, style, resolve)
                    this.$emit('addMessage', message);
                });
            },
            showExchange() {
                this.exchangeCurrencyButtons = false;
                this.sendMessage("user", this.$t('fortune.user.exchange'), "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.exchange'), "default").then(() => {
                        this.showExchanges = true;
                    })
                })
            },
            showCurrency() {
                this.isCurrency = true;
                this.exchangeCurrencyButtons = false;
                this.sendMessage("user", this.$t('fortune.user.currency'), "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.currency'), "default").then(() => {
                        this.showCurrencies = true;
                    })
                })
            },
            showAnotherCurrency(currency) {
                if (this.symbol === null) {
                    this.symbol = currency.symbol;
                    this.showCurrencies = false;
                    this.sendMessage("user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency.name}`, "default").then(() => {
                        this.sendMessage("bot", this.$t('fortune.bot.anotherCurrency'), "default").then(() => {
                            this.showAnotherCurrencies = true;
                        })
                    })
                } else {
                    this.showAnotherCurrencies = false;
                    this.symbol = `${this.symbol}=${currency.symbol}`;
                    this.sendMessage("user",
                        `${this.$t('fortune.user.chosenCurrency')} ${currency.name}`, "default").then(() => {
                        this.sendMessage("bot", this.$t('fortune.bot.chooseTime'), "default").then(() => {
                            this.showTimeButtons = true;
                        })
                    })
                }
            },
            showExchangeAndButtons(exchange) {
                this.showExchanges = false;
                this.symbol = exchange.symbol;
                this.sendMessage("user", `${this.$t('fortune.user.chosenExchange')} ${exchange.name}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.chooseTime'), "default").then(() => {
                        this.showTimeButtons = true;
                    })
                })
            },
            showHistoryData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenHistory')}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.historyChoice'), "default").then(() => {
                        this.choosePeriod = true;
                    });
                })
            },
            showDayChoiceComponent() {
                this.choosePeriod = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenDay')}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.dayChoice'), "default").then(() => {
                        this.showDayChooser = true;
                    });
                })
            },
            showPeriodChoiceComponent() {
                this.choosePeriod = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenPeriod')}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.periodChoice'), "default").then(() => {
                        this.showPeriodChooser = true;
                    });
                })
            },
            showActualData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenActual')}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.actualData'), "default").then(() => {
                        fortuneService.getActualDataForSymbol(this.symbol, formatter.formatDate(Date.now()))
                            .then(response => {
                                this.sendMessage("bot",
                                    `${this.$t('fortune.bot.valueStockToday')} ${this.$t('fortune.bot.isValue')} ${response.value}`, "default")
                            })
                    });
                })
            },
            showFutureData() {
                this.showTimeButtons = false;
                this.sendMessage("user", `${this.$t('fortune.user.chosenFuture')}`, "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.futureData'), "default").then(() => {
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
                this.sendMessage("user", `${this.$t('fortune.user.myChoice')} ${data[0]}`, "default").then(() => {
                    fortuneService.getHistoryDataForSymbol(this.symbol, formatter).then(response => {
                        this.sendMessage("bot",
                            `${this.$t('fortune.bot.valueStockInDay')} ${data[0]} ${this.$t('fortune.bot.value')} ${response.value}`, "default")
                    })
                });
            },
            showHistoryDataForPeriod(data) {
                this.showPeriodChooser = false;
                this.sendMessage("user",
                    `${this.$t('fortune.user.myChoice')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('fortune.user.to')} ${new Date(data[1]).toLocaleDateString()}`,
                    "default").then(() => {
                    this.sendMessage("bot", this.$t('fortune.bot.historyData'), "default").then(() => {
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
    @import "../../../../src/assets/buttonAnimate.css";
    @import "../../../../src/assets/buttonDropdownAnimate.css";

    .user-buttons, .choice-date {
        text-align: right;
    }
</style>
