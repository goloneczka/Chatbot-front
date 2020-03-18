export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url) {
        return fetch(`${this.baseUrl}/${url}`, {
            method: 'GET',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            contentType: 'application/json',
        }).then(response => Promise.resolve(response))
            .catch(e => {
                return {errors: [e]}
            })
    }


    post(url, data) {
        fetch(`${this.baseUrl}/${url}`, {
            method: 'POST',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => response.json())
            .catch(e => {
                return {errors: [e]}
            })
    }

    put(url, data) {
        fetch(`${this.baseUrl}/${url}`, {
            method: 'PUT',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => response.json())
            .catch(e => {
                return {errors: [e]}
            })
    }

    delete(url, data) {
        fetch(`${this.baseUrl}/${url}`, {
            method: 'DELETE',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json',
        }).then(response => response.json())
            .catch(e => {
                return {errors: [e]}
            })
    }
}


