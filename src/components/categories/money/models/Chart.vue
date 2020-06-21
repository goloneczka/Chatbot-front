<script>
    import { Line } from 'vue-chartjs'
    import moment from 'moment'
    import { themeService } from "../../../../App"

    export default {
        name: "chart",
        extends: Line,
        props: ['chartdata'],

        data() {
            let fontColor = (themeService.getActiveTheme().themeName == 'dark') ? '#ffffff' : '#000000'

            return {
                themeService: themeService,
                fontColor: fontColor,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontColor: fontColor
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 20,
                                fontColor: fontColor
                            }
                        }],

                        yAxes: [{
                            ticks: {
                                fontColor: fontColor
                            }
                        }]
                    }
                }
            }
        },

        created() {
            moment.locale('pl')

            setInterval(() => {
                this.fontColor = (this.themeService.getActiveTheme().themeName == 'dark') ? '#ffffff' : '#000000'
            }, 10)
        },

        mounted() {
            this.renderChart(this.chartdata, this.options)
        },

        watch: {
            fontColor () {
                console.log("WIDZĘ CIĘ")
                this.options.scales.xAxes[0].ticks.fontColor = this.fontColor
                this.options.scales.yAxes[0].ticks.fontColor = this.fontColor
                this.options.legend.labels.fontColor = this.fontColor

                this.renderChart(this.chartdata, this.options)
            },
        }
    }
</script>