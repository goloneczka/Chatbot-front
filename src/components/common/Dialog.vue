<template>
    <div>
        <b-alert
                id="dangerAlert"
                :show="dismissDangerCountDown"
                dismissible
                variant="danger"
                @dismissed="dismissDangerCountDown=0"
                @dismiss-count-down="countDangerDownChanged"
        >{{ this.message }}
        </b-alert>
        <b-alert
                id="warningAlert"
                :show="dismissWarningCountDown"
                dismissible
                variant="warning"
                @dismissed="dismissWarningCountDown=0"
                @dismiss-count-down="countWarningDownChanged"
        >{{ this.message }}
        </b-alert>
    </div>
</template>

<script>
    export default {
        name: "Dialog",
        data() {
            return {
                dismissDangerSecs: 3,
                dismissDangerCountDown: 0,
                dismissWarningSecs: 3,
                dismissWarningCountDown: 0,
                showDismissibleAlert: false,
                message: ''
            }
        },
        mounted() {
            this.$root.$on('showDanger', (text) => {
                this.showDanger(text);
            });
            this.$root.$on('showWarning', (text) => {
                this.showWarning(text);
            })
        },
        methods: {
            countDangerDownChanged(dismissDangerCountDown) {
                this.dismissDangerCountDown = dismissDangerCountDown
            },
            countWarningDownChanged(dismissWarningCountDown) {
                this.dismissWarningCountDown = dismissWarningCountDown
            },
            showDanger(text) {
                this.message = text;
                this.dismissDangerCountDown = this.dismissDangerSecs;
            },
            showWarning(text) {
                this.message = text;
                this.dismissWarningCountDown = this.dismissWarningSecs;
            }

        }
    }

</script>
