<template>
    <div>
        <div class="user-buttons" v-if=exchangeCurrencyButtons>
            <b-button class="m-2" v-on:click="showExchange"
                      v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.exchange')}}</b-button>
            <b-button class="m-2" v-on:click="showCurrency"
                      v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.currency')}}</b-button>
        </div>
        <ExchangeDropdown v-if="showExchanges"/>
        <CurrencyDropdown v-if="showCurrencies"/>
        <CurrencyDropdown v-if="showAnotherCurrencies"/>
        <ChooseTime v-if="showTimeButtons"/>
        <div class="choice-date" v-if="choosePeriod">
            <b-button class="m-2" v-on:click="showDayChoiceComponent"
                      v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.day')}}</b-button>
            <b-button class="m-2" v-on:click="showPeriodChoiceComponent"
                      v-bind:class="themeService.getActiveTheme().themeName">{{$t('fortune.buttons.period')}}</b-button>
        </div>
        <DayChooseComponent v-if="showDayChooser"/>
        <PeriodChooseComponent v-if="showPeriodChooser"/>
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
                exchangeCurrencyButtons: true,
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
            this.$emit('addMessage', {author: "user", text: this.$t('fortune.user.entrance'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('fortune.bot.entrance'), style: "default"});
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
                this.$emit('addMessage', {author: "user", text: this.$t('fortune.user.exchange'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('fortune.bot.exchange'), style: "default"});
                this.showExchanges = true;
            },
            showCurrency() {
                this.isCurrency = true;
                this.exchangeCurrencyButtons = false;
                this.$emit('addMessage', {author: "user", text: this.$t('fortune.user.currency'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('fortune.bot.currency'), style: "default"});
                this.showCurrencies = true;
            },
            showAnotherCurrency(currency) {
                if (this.symbol === null) {
                    this.symbol = currency.symbol;
                    this.showCurrencies = false;
                    this.$emit('addMessage', {
                        author: "user",
                        text: `${this.$t('fortune.user.chosenCurrency')} ${currency.name}`,
                        style: "default"
                    });
                    this.$emit('addMessage', {
                        author: "bot",
                        text: this.$t('fortune.bot.anotherCurrency'),
                        style: "default"
                    });
                    this.showAnotherCurrencies = true;
                } else {
                    this.showAnotherCurrencies = false;
                    this.symbol = `${this.symbol}=${currency.symbol}`;
                    this.$emit('addMessage', {
                        author: "user",
                        text: `${this.$t('fortune.user.chosenCurrency')} ${currency.name}`,
                        style: "default"
                    });
                    this.$emit('addMessage', {
                        author: "bot",
                        text: this.$t('fortune.bot.chooseTime'),
                        style: "default"
                    });
                    this.showTimeButtons = true;
                }
            },
            showExchangeAndButtons(exchange) {
                this.showExchanges = false;
                this.symbol = exchange.symbol;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenExchange')} ${exchange.name}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.chooseTime'),
                    style: "default"
                });
                this.showTimeButtons = true;
            },
            showHistoryData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenHistory')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.historyChoice'),
                    style: "default"
                });
                this.choosePeriod = true;
            },
            showDayChoiceComponent() {
                this.choosePeriod = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenDay')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.dayChoice'),
                    style: "default"
                });
                this.showDayChooser = true;
            },
            showPeriodChoiceComponent() {
                this.choosePeriod = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenPeriod')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.periodChoice'),
                    style: "default"
                });
                this.showPeriodChooser = true;
            },
            showActualData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenActual')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.actualData'),
                    style: "default"
                });
                fortuneService.getActualDataForSymbol(this.symbol, formatter.formatDate(Date.now()))
                    .then(response => {
                        this.$emit('addMessage', {
                            author: "bot",
                            text: `${this.$t('fortune.bot.valueStockToday')} ${this.$t('fortune.bot.isValue')} ${response.value}`,
                            style: "default"
                        });
                    })
            },
            showFutureData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.chosenFuture')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.futureData'),
                    style: "default"
                });
                this.showFutureDataComponent = true;
                fortuneService.getFutureDataForSymbol(this.symbol)
                    .then(response => {
                        this.data = response;
                        this.showFutureDataComponent = true;
                    })
            },
            showHistoryDataForDay(data) {
                this.showDayChooser = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.myChoice')} ${data[0]}`,
                    style: "default"
                });
                fortuneService.getHistoryDataForSymbol(this.symbol, formatter)
                    .then(response => {
                        this.$emit('addMessage', {
                            author: "bot",
                            text: `${this.$t('fortune.bot.valueStockInDay')} ${data[0]} ${this.$t('fortune.bot.value')} ${response.value}`,
                            style: "default"
                        });
                    })
            },
            showHistoryDataForPeriod(data) {
                this.showPeriodChooser = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('fortune.user.myChoice')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('fortune.user.to')}
                    ${new Date(data[1]).toLocaleDateString()}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('fortune.bot.historyData'),
                    style: "default"
                });
                fortuneService.getHistoryDataForSymbolForPeriod(this.symbol, formatter.formatDate(data[0]), formatter.formatDate(data[1]))
                    .then(response => {
                        this.data = response;
                        this.showHistoryDataComponent = true;
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
