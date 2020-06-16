<script>
    import { Line } from 'vue-chartjs'
    import moment from 'moment'

    export default {
        name: "chart",
        extends: Line,
        props: ['chartdata', 'options'],

        created() {
            moment.locale('pl')
        },

        mounted() {
            this.renderChart(this.chartdata, this.options)
        }
    }
</script>