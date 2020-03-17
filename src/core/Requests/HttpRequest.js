const AuthorizationStorage = require('./AuthorizationStorage');

const baseUrl = 'localhost:8080'; // Zmienić podstawe baseUrl
const authorization = AuthorizationStorage.getAuthorization();


exports.GetRequest = (url) => {
    fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        authorization: authorization,
        credentials: 'same-origin',
        cache: 'no-cache',
        contentType: 'application/json',
    })
        .then(resp => resolve(resp.body)
    ).catch((error) => {
        reject();
        console.error('Error requesting ride: ', error.status, ', Details: ', error.body);
        this.$emit('showDanger', error.body);
    })
};

exports.PostRequest = (url, data) => {
    fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        authorization: authorization,
        credentials: 'same-origin',
        cache: 'no-cache',
        data: data,
        contentType: 'application/json',
    })
        .then().catch((error) => {
        reject();
        console.error('Error requesting ride: ', error.status, ', Details: ', error.body);
        this.$emit('showDanger', error.body);
    })
};

exports.PutRequest = (url,data) => {
    fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        authorization: authorization,
        credentials: 'same-origin',
        cache: 'no-cache',
        data: data,
        contentType: 'application/json',
    })
        .then()
        .catch((error) => {
        reject();
        console.error('Error requesting ride: ', error.status, ', Details: ', error.body);
        this.$emit('showDanger', error.body);
    })
};

exports.DeleteRequest = (url, data) => {
    fetch(`${baseUrl}/${url}`, {
        method: 'DELETE',
        authorization: authorization,
        credentials: 'same-origin',
        cache: 'no-cache',
        data: data,
        contentType: 'application/json',
    })
        .then()
        .catch((error) => {
        reject();
        console.error('Error requesting ride: ', error.status, ', Details: ', error.body);
        this.$emit('showDanger', error.body);
    })
};
