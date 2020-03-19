export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url) {
        const options = {
            method: 'GET',
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            contentType: 'application/json'
        };

        return this.execute(url, options)
    }


    post(url, data) {
        const options = {
            method: 'POST',
            authorization: this.authorizationStorage.getAuthorization(),
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
            authorization: this.authorizationStorage.getAuthorization(),
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
            authorization: this.authorizationStorage.getAuthorization(),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        };

        return this.execute(url, options, data)
    }

    execute(url, options) {
        fetch(`${this.baseUrl}/${url}`, options)
            .then(response => response.json())
            .catch(e => {
                return {errors: [e]}
            })
    }
}


