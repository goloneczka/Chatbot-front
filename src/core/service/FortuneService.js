export default class FortuneService {
    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getAllCurrencies(){
        return this.httpRequest.get("currencies");
    }

    getAllCompanies(){
        return this.httpRequest.get("symbols/companies");
    }

    getHistoryDataForSymbol(symbol, data){
        return this.httpRequest.get(`stocks/${symbol}?dateParam=${data}`);
    }

    getHistoryDataForSymbolForPeriod(symbol, dataStart, dataEnd){
        return this.httpRequest.get(`stocks/period/${symbol}?startDateParam=${dataStart}&endDateParam=${dataEnd}`);
    }

    getActualDataForSymbol(symbol,data){
        return this.httpRequest.get(`stocks/${symbol}?dateParam=${data}`);
    }

    getFutureDataForSymbol(symbol){
        return this.httpRequest.get(`stocks/prediction/${symbol}`);
    }

    extractChartData(stocks) {
        let axisX = []
        let axisY = []

<<<<<<< HEAD
        console.log(stocks)

        for (let stock of stocks) {
            if (stock.value) {
                let value = Math.round(stock.value * 100) / 100
                axisX.push(stock.date[0] + '-' + stock.date[1] + '-' + stock.date[2])
                axisY.push(value)
            }
=======
        for (let stock of stocks) {
            let value = Math.round(stock.value * 100) / 100
            axisX.push(stock.date)
            axisY.push(value)
>>>>>>> 3a41e74f9e12ee9c6cd260772f3e0330efbd8cc9
        }

        return {
            labels: axisX,
            datasets: [{
                lineTension: 0,
<<<<<<< HEAD
                pointRadius: 1,
=======
>>>>>>> 3a41e74f9e12ee9c6cd260772f3e0330efbd8cc9
                label: stocks[0].symbol,
                borderColor: '#2cc3ed',
                pointBackgroundColor: '#2cc3ed',
                fill: false,
                data: axisY
            }]
        }
    }
}
