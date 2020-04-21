<template>
    <div id="time-component">
        <div id="calendar">
            <b-calendar class="calendar" @context="onContext" value-as-date locale="pl-PL"
                        v-bind="labels" :min="min" :max="max">
                <div class="d-flex" dir="ltr">
                    <b-button
                            size="sm"
                            class="m-2"
                            @click="setDay"
                    >
                        {{$t('weather.user.choiceDay')}}
                    </b-button>
                </div>
            </b-calendar>
        </div>
    </div>
</template>
<script>

    import moment from 'moment';

    export default {
        name: 'TimeDropdown',
        components: {},
        data() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDay());

            const minDate = new Date(today);
            minDate.setDate(minDate.getDay() + 17);
            const maxDate = new Date(today);
            maxDate.setDate(maxDate.getDay() + 23);


            return {
                context: null,
                labels: {
                    labelNoDateSelected: this.$t('weather.error.wrongDate'),
                },
                min: minDate,
                max: maxDate
            }
        },
        methods: {
            setDay() {

                if (this.context.selectedFormatted === this.$t('weather.error.wrongDate')) {
                    this.$root.$emit("showDanger", this.$t('weather.error.wrongDate'))
                } else if (moment(this.context.activeYMD).isBefore(moment().format('l'))) {
                    this.$root.$emit("showDanger", this.$t('weather.error.backDate'))
                } else {
                    this.$root.$emit('showWeatherMessage', [this.context.selectedFormatted, this.context.activeYMD]);
                }
            },
            onContext(ctx) {
                this.context = ctx
            }
        }
    }
</script>
<style scoped>
    #calendar {
        margin-left: 70%;
    }

</style>
