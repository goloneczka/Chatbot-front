<template>
    <div id="time-component">
        <div id="calendar">
            <div id="header-wrapper">
                <b-calendar class="calendar" @context="onContext" value-as-date locale="pl-PL"
                            v-bind="labels" :min="min" :max="max" >
                    <div class="d-flex" dir="ltr">
                        <b-button v-bind:class="themeService.getActiveTheme().themeName"
                                  class="m-2"
                                  @click="setDay">
                            {{$t('weather.user.choiceDay')}}
                        </b-button>
                    </div>
                </b-calendar>
            </div>
        </div>
    </div>
</template>
<script>

    import moment from 'moment';
    import {themeService} from "../../../../App";

    export default {
        name: 'TimeDropdown',
        components: {},
        data() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const minDate = new Date(today);
            minDate.setDate(minDate.getDate());
            const maxDate = new Date(today);
            maxDate.setDate(maxDate.getDate() + 6);


            return {
                context: null,
                labels: {
                    labelNoDateSelected: this.$t('errors.wrongDate'),
                },
                min: minDate,
                max: maxDate,
                themeService
            }
        },
        methods: {
            setDay() {
                if (this.context.selectedFormatted === this.$t('weather.error.wrongDate')) {
                    this.$root.$emit("showDanger", this.$t('errors.wrongDate'))
                } else if (moment(this.context.activeYMD).isBefore(moment().format('l'))) {
                    this.$root.$emit("showDanger", this.$t('weather.error.backDate'))
                } else {
                    this.$emit('showWeatherMessage', [this.context.selectedFormatted, this.context.activeYMD]);
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
        text-align: right;
    }

    #header-wrapper {
        background: white;
        display: inline-block;
        height: 29px;
        border-radius: 0.25rem;
    }

    button {
        border-radius: 1em;
    }

</style>
