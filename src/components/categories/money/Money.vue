<template>
    <div>
        <div id="money-component">
            <div class="userButtons" v-if=exchangeCurrencyButtons>
                <b-button class="m-2" v-on:click="showExchange">{{$t('money.buttons.exchange')}}</b-button>
                <b-button class="m-2" v-on:click="showCurrency">{{$t('money.buttons.currency')}}</b-button>
            </div>
            <ExchangeDropdown v-if="showExchanges"/>
            <CurrencyDropdown v-if="showCurrencies"/>
            <CurrencyDropdown v-if="showAnotherCurrencies"/>
            <ChooseTime v-if="showTimeButtons"/>
            <div class="choiceDate" v-if="choosePeriod">
                <b-button class="m-2" v-on:click="showDayChoiceComponent">{{$t('money.buttons.day')}}</b-button>
                <b-button class="m-2" v-on:click="showPeriodChoiceComponent">{{$t('money.buttons.period')}}</b-button>
            </div>
            <DayChooseComponent v-if="showDayChooser"/>
            <PeriodChooseComponent v-if="showPeriodChooser"/>
            <div>
                <HistoryData :stocks="this.data" v-if="showHistoryDataComponent"/>
                <FutureData :stocks="this.data" v-if="showFutureDataComponent"/>
            </div>
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
    import {moneyService} from "../../../App";

    import moment from 'moment';

    export default {
        name: 'Money',
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
                currency: null,
                isCurrency: true,
                exchange: null,
                secondCurrency: null,
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
            this.$emit('addMessage', {author: "user", text: this.$t('money.user.entrance'), style: "default"});
            this.$emit('addMessage', {author: "bot", text: this.$t('money.bot.entrance'), style: "default"});
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
                this.$emit('addMessage', {author: "user", text: this.$t('money.user.exchange'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('money.bot.exchange'), style: "default"});
                this.showExchanges = true;
            },
            showCurrency() {
                this.isCurrency = true;
                this.exchangeCurrencyButtons = false;
                this.$emit('addMessage', {author: "user", text: this.$t('money.user.currency'), style: "default"});
                this.$emit('addMessage', {author: "bot", text: this.$t('money.bot.currency'), style: "default"});
                this.showCurrencies = true;
            },
            showAnotherCurrency(currency) {
                if (this.currency === null) {
                    this.currency = currency.symbol;
                    this.showCurrencies = false;
                    this.$emit('addMessage', {
                        author: "user",
                        text: `${this.$t('money.user.chosenCurrency')} ${currency.name}`,
                        style: "default"
                    });
                    this.$emit('addMessage', {
                        author: "bot",
                        text: this.$t('money.bot.anotherCurrency'),
                        style: "default"
                    });
                    this.showAnotherCurrencies = true;
                } else {
                    this.showAnotherCurrencies = false;
                    this.secondCurrency = currency.symbol;
                    this.$emit('addMessage', {
                        author: "user",
                        text: `${this.$t('money.user.chosenCurrency')} ${currency.name}`,
                        style: "default"
                    });
                    this.$emit('addMessage', {
                        author: "bot",
                        text: this.$t('money.bot.chooseTime'),
                        style: "default"
                    });
                    this.showTimeButtons = true;
                }
            },
            showExchangeAndButtons(exchange) {
                this.showExchanges = false;
                this.exchange = exchange.symbol;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenExchange')} ${exchange.name}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.chooseTime'),
                    style: "default"
                });
                this.showTimeButtons = true;
            },
            showHistoryData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenHistory')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.historyChoice'),
                    style: "default"
                });
                this.choosePeriod = true;
            },
            showDayChoiceComponent() {
                this.choosePeriod = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenDay')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.dayChoice'),
                    style: "default"
                });
                this.showDayChooser = true;
            },
            showPeriodChoiceComponent() {
                this.choosePeriod = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenPeriod')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.periodChoice'),
                    style: "default"
                });
                this.showPeriodChooser = true;
            },
            showActualData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenActual')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.actualData'),
                    style: "default"
                });
                moneyService.getActualDataForSymbol(this.isCurrency === null ? this.currency : this.exchange, moment(Date.now()).format('YYYY-MM-DD'))
                    .then(response => {
                        this.$emit('addMessage', {
                            author: "bot",
                            text: `${this.$t('money.bot.valueStockToday')} ${this.$t('money.bot.isValue')} ${response.value}`,
                            style: "default"
                        });
                    })
            },
            showFutureData() {
                this.showTimeButtons = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.chosenFuture')}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.futureData'),
                    style: "default"
                });
                this.showFutureDataComponent = true;
                moneyService.getFutureDataForSymbol(this.isCurrency === null ? this.currency : this.exchange)
                    .then(response => {
                        this.data = response;
                        this.showFutureDataComponent = true;
                    })
            },
            showHistoryDataForDay(data) {
                this.showDayChooser = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.myChoice')} ${data[0]}`,
                    style: "default"
                });
                moneyService.getHistoryDataForSymbol(this.isCurrency === null ? this.currency : this.exchange, moment(data[1]).format('YYYY-MM-DD'))
                    .then(response => {
                        this.$emit('addMessage', {
                            author: "bot",
                            text: `${this.$t('money.bot.valueStockInDay')} ${data[0]} ${this.$t('money.bot.value')} ${response.value}`,
                            style: "default"
                        });
                    })
            },
            showHistoryDataForPeriod(data) {
                this.showPeriodChooser = false;
                this.$emit('addMessage', {
                    author: "user",
                    text: `${this.$t('money.user.myChoice')} ${new Date(data[0]).toLocaleDateString()} ${this.$t('money.user.to')}
                    ${new Date(data[1]).toLocaleDateString()}`,
                    style: "default"
                });
                this.$emit('addMessage', {
                    author: "bot",
                    text: this.$t('money.bot.historyData'),
                    style: "default"
                });
                moneyService.getHistoryDataForSymbolForPeriod(this.isCurrency === null ? this.currency : this.exchange, moment(data[0]).format('YYYY-MM-DD'), moment(data[1]).format('YYYY-MM-DD'))
                    .then(response => {
                        this.data = response;
                        this.showHistoryDataComponent = true;
                    })

            }
        },
    }
</script>
<style scoped>
    .userButtons, .choiceDate {
        text-align: right;
    }
</style>
