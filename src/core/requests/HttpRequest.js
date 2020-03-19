export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url) {
        const options = {
            method: 'GET',
            credentials: 'same-origin',
            cache: 'no-cache',
            contentType: 'application/json'
        };

        return this.execute(url, options)
    }


    post(url, data) {
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        };

        return this.execute(url, options, data)
    }

    put(url, data) {
        const options = {
            method: 'PUT',
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        };

        return this.execute(url, options, data)
    }

    delete(url, data) {
        const options = {
            method: 'DELETE',
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        };

        return this.execute(url, options, data)
    }

    execute(url, options) {

        if (this.authorizationStorage.isEmpty() !== true)
            Object.assign(options, {authorization: this.authorizationStorage.getAuthorization()});

        return fetch(`${this.baseUrl}/${url}`, options)
            .then(response => response.json())
            .catch(e => {
                return {errors: [e]}
            })
    }
}


