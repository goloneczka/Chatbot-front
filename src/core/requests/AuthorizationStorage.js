

export default class AuthorizationStorage {

    getAuthorization() {
        if (!this.isEmpty())
            return sessionStorage.getItem('authorization');
        else
            return '';
    }

    setAuthorization(login, password) {
        sessionStorage.setItem('authorization', `Basic ${btoa(`${login}:${password}`)}`)
    }

    removeAuthorizationItem(item) {
        sessionStorage.removeItem(item);
    }

    removeAuthorization() {
        sessionStorage.clear();
    }

    isEmpty() {
        if(sessionStorage.getItem('authorization') === null)
            throw new Error('Unauthorized token');
        else
            return false;
    }

}
