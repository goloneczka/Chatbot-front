<template>
    <div class="chooseTime">
        <b-button class="m-2" v-on:click="history" v-bind:class="themeService.getActiveTheme().themeName">
            {{$t('fortune.buttons.history')}}
        </b-button>
        <b-button class="m-2" v-on:click="actual" v-bind:class="themeService.getActiveTheme().themeName">
            {{$t('fortune.buttons.actual')}}
        </b-button>
        <b-button class="m-2" v-on:click="future" v-bind:class="themeService.getActiveTheme().themeName">
            {{$t('fortune.buttons.future')}}
        </b-button>
    </div>
</template>

<script>

    import {themeService} from "../../../../App";

    export default {
        name: "ChooseTime",
        data: function () {
            return {
                exchanges: [],
                themeService
            }
        },
        mounted() {
        },
        methods: {
            history() {
                this.$root.$emit('showHistoryData')
            },
            actual() {
                this.$root.$emit('showActualData')
            },
            future() {
                this.$root.$emit('showFutureData')
            }
        }
    }
</script>

<style scoped>
    .chooseTime {
        text-align: right;
    }
</style>
