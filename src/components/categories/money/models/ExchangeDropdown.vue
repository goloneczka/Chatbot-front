<template>
    <div class="exchange-chooser">
        <b-dropdown v-bind:text="$t('fortune.buttons.choiceExchange')">
            <b-dropdown-item v-for="exchange in exchanges" v-bind:key="exchange" v-on:click="chooseExchange(exchange)">
                {{exchange.name}}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>



    import {fortuneService} from "../../../../App";

    export default {
        name: "ExchangeDropdown",
        data: function(){
            return{
                exchanges: []
            }
        },
        mounted() {
            fortuneService.getAllCompanies().then(result => this.exchanges = result);
        },
        methods:{
            chooseExchange(exchange){
                this.$root.$emit('chooseExchange', exchange)
            }
        }
    }
</script>

<style scoped>
    .exchange-chooser {
        text-align: right;
    }
</style>
