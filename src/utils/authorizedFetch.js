
function getHeader() {
    return sessionStorage.getItem('authorization')
}

export default function authorizedFetch(url, options) {
    const sharedHeaders = {
        credentials: 'same-origin',
        cache: 'no-cache',
    };

    fetch(url, Object.assign({}, options, sharedHeaders, getHeader()))
        .then(response => {
            if (response.status === 200)
                return response;
            else
                return response.text()
                    .then((body) => {
                        throw Error(body);
                    });

        })

}
