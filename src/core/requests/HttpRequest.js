export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url, data) {
        return this.execute(url, 'GET', data)
    }


    post(url, data) {
        return this.execute(url, 'POST', data)
    }

    put(url, data) {
        return this.execute(url, 'PUT', data)
    }

    delete(url, data) {
        return this.execute(url, 'DELETE', data)
    }

    execute(url, method, data) {

        return fetch(`${this.baseUrl}/${url}`, {
            method: method,
            headers: !this.authorizationStorage.isEmpty() ?
                new Headers({Authorization: this.authorizationStorage.getAuthorization()}) : new Headers(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .catch(e => {
                return {errors: [e]}
            })
    }
}


