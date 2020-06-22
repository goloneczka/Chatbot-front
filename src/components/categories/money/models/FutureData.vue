<template>
    <div class="future-data-component">
        <chart class="chart" :chartdata=this.chartdata></chart>
    </div>
</template>

<script>
    import Chart from './Chart'
    import FortuneService from '../../../../core/service/FortuneService'
    //import {sendMessage} from "../../../common/messages"

    const service = new FortuneService()

    export default {
        name: "HistoryData",
        props: ['stocks'],
        components: {
            Chart
        },
        data() {
            return {
                chartdata: {}
            }
        },
        created: function() {
            this.chartdata = service.extractChartData(this.stocks)
        }
    }
</script>

<style scoped>
    .future-data-component {
        width: 70%;
        overflow-x: scroll;
    }

    .chart {
        height: 40vh;
        width: 2000px;
    }
</style>
