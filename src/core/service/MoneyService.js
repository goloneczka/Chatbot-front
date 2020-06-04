export default class MoneyService {

    constructor(httpRequest) {
        this.httpRequest = httpRequest;
    }

    getAllCurrencies(){
        return this.httpRequest.get("symbols/currencies").then(data => data);
    }

    getAllCompanies(){
        return this.httpRequest.get("symbols/companies").then(data => data);
    }

    getHistoryDataForSymbol(symbol, data){
        return this.httpRequest.get(`stocks/${symbol}?dateParam=${data}`).then(data => data);
    }

    getHistoryDataForSymbolForPeriod(symbol, dataStart, dataEnd){
        return this.httpRequest.get(`stocks/period/${symbol}?startDateParam=${dataStart}&endDateParam=${dataEnd}`).then(data => data);
    }

    getActualDataForSymbol(symbol,data){
        return this.httpRequest.get(`stocks/${symbol}?dateParam=${data}`).then(data => data);
    }

    getFutureDataForSymbol(symbol){
        return this.httpRequest.get(`stocks/prediction/${symbol}`).then(data => data);
    }
}
