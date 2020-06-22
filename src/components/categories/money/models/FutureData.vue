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
            // const test = []
            // let year = 2000
            // let month = 1
            // let day = 24

            // for (let i = 1; i < 1000; i++) {
            //     day++

            //     if (day > 30) {
            //         day = 1
            //         month++

            //         if (month > 12) {
            //             month = 1
            //             year++
            //         }
            //     }

            //     test.push({
            //         symbol: 'UGABUGA',
            //         value: Math.random(),
            //         date: '' + year + '-' + month + '-' + day
            //     })
            // }

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
