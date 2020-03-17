exports.getAuthorization = () => {
    return sessionStorage.getItem('authorization')
};
exports.setAuthorization = (authorization) => {
    sessionStorage.setItem('authorization', authorization)
};
exports.removeAuthorizationItem = (item) => {
    sessionStorage.removeItem(item);
};
exports.removeAuthorization = () => {
    sessionStorage.clear();
};
