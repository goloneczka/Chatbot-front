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

        for (let stock of stocks) {
            axisX.push(stock.date)
            axisY.push(stock.value)
        }

        return {
            labels: axisX,
            datasets: [{
                lineTension: 0,
                label: stocks[0].symbol,
                borderColor: '#2cc3ed',
                fill: false,
                data: axisY
            }]
        }
    }
}
