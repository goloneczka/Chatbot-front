<template>
    <div id="time-component">
        <div id="calendar">
            <b-calendar class="calendar" @context="onContext" value-as-date locale="pl">
                <div class="d-flex" dir="ltr">
                    <b-button
                            size="sm"
                            variant="outline-dark"
                            class="ml-auto"
                            @click="setDay"
                    >
                        Wybierz dzień
                    </b-button>
                </div>
            </b-calendar>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'TimeDropdown',
        components: {},
        data() {
            return {
                context: null
            }
        },
        methods: {
            setDay(){
                document.getElementById('time-component').remove();
                this.$root.$emit('showWeather', [this.context.selectedFormatted,this.context.activeYMD]);
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
