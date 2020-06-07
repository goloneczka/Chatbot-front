<template>
    <div class="chooseTime">
        <b-button class="m-2" v-on:click="history">{{$t('fortune.buttons.history')}}</b-button>
        <b-button class="m-2" v-on:click="actual">{{$t('fortune.buttons.actual')}}</b-button>
        <b-button class="m-2" v-on:click="future">{{$t('fortune.buttons.future')}}</b-button>
    </div>
</template>

<script>
    export default {
        name: "ChooseTime",
        data: function(){
            return{
                exchanges: []
            }
        },
        mounted() {
        },
        methods:{
            history(){
                this.$root.$emit('showHistoryData')
            },
            actual(){
                this.$root.$emit('showActualData')
            },
            future(){
                this.$root.$emit('showFutureData')
            }
        }
    }
</script>

<style scoped>
    .chooseTime{
        text-align: right;
    }
</style>
