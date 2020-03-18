

class HttpRequest{

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    getRequest(url){
        return fetch(`${this.baseUrl}/${url}`, {
            method: 'GET',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            contentType: 'application/json',
        }).then(response => Promise.resolve(response))
    }

    postRequest(url, data){
        fetch(`${this.baseUrl}/${url}`, {
            method: 'POST',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => Promise.resolve(response.json()))
    }
    putRequest(url,data){
        fetch(`${this.baseUrl}/${url}`, {
            method: 'PUT',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => Promise.resolve(response.json()))
    }

    deleteRequest(url, data){
        fetch(`${this.baseUrl}/${url}`, {
            method: 'DELETE',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => Promise.resolve(response.json()))
    }
}
export default HttpRequest;


