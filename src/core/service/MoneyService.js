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
}
