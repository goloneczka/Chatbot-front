export default class HttpRequest {

    constructor(baseUrl, authorizationStorage) {
        this.baseUrl = baseUrl;
        this.authorizationStorage = authorizationStorage;
    }

    get(url) {
        const options = {
            headers: new Headers({
                Authorization: !this.authorizationStorage.isEmpty()?this.authorizationStorage.getAuthorization():"null",
            }),
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
            headers: new Headers({
                Authorization: this.authorizationStorage.getAuthorization(),
            }),
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
            headers: new Headers({
                Authorization: this.authorizationStorage.getAuthorization(),
            }),
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
            headers: new Headers({
                Authorization: this.authorizationStorage.getAuthorization(),
            }),
            credentials: 'same-origin',
            cache: 'no-cache',
            data: data,
            contentType: 'application/json'
        };

        return this.execute(url, options, data)
    }

    execute(url, options) {

        return fetch(`${this.baseUrl}/${url}`, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return Promise.resolve(response);
            })
            .catch(e => {
                return {errors: [e]}
            })
    }
}


