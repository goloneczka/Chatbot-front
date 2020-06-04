<template>
    <div class="periodDataComponent">
        <date-picker v-model="time3" range></date-picker>
        <div class="button">
            <b-button
                    size="sm"
                    class="m-2"
                    @click="setPeriod">
                {{$t('money.buttons.choicePeriod')}}
            </b-button>
        </div>
    </div>
</template>

<script>

    import DatePicker from 'vue2-datepicker';
    import 'vue2-datepicker/index.css';

    export default {
        name: "PeriodChooseComponent",
        components: {DatePicker},
        data: function () {
            return {
                time3: null,
            }
        },
        mounted() {
        },
        methods: {
            setPeriod() {
                console.log(this.time3);
                this.$root.$emit('showPeriodHistory', this.time3);
            },
        }
    }
</script>

<style scoped>
    .periodDataComponent, .button {
        text-align: right;
    }
</style>
