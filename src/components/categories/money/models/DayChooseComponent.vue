<template>
    <div id="calendar">
        <b-calendar class="calendar" @context="onContext" value-as-date locale="pl-PL"
                    v-bind="labels">
            <div class="d-flex" dir="ltr">
                <b-button
                        size="sm"
                        class="m-2"
                        @click="setDay">
                    {{$t('common.dayPicker')}}
                </b-button>
            </div>
        </b-calendar>
    </div>
</template>

<script>

    export default {
        name: "DayChooseComponent",
        data: function () {
            return {
                context: null,
                labels: {
                    labelNoDateSelected: this.$t('errors.wrongDate'),
                }
            }
        },
        mounted() {
        },
        methods: {
            setDay() {
                this.$root.$emit('showDayHistory', [this.context.selectedFormatted, this.context.activeYMD]);
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
</style>
