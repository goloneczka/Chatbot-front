<template>
    <div class="period-data-component">
        <date-picker v-model="timePeriod" range></date-picker>
        <div class="button">
            <b-button
                    size="sm"
                    class="m-2"
                    @click="setPeriod"
                    v-bind:class="themeService.getActiveTheme().themeName">
                {{$t('fortune.buttons.choicePeriod')}}
            </b-button>
        </div>
    </div>
</template>

<script>

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';
    import {themeService} from "../../../../App";

    export default {
        name: "PeriodChooseComponent",
        components: {DatePicker},
        data: function () {
            return {
                timePeriod: null,
                themeService
            }
        },
        mounted() {
        },
        methods: {
            setPeriod() {
                this.$root.$emit('showPeriodHistory', this.timePeriod);
            },
        }
    }
</script>

<style scoped>
    .period-data-component, .button {
        text-align: right;
    }
</style>
