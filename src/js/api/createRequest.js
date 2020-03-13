const createRequest = ({url, params, method, callback}) => {
    const searchParams = new URLSearchParams(params)
    const urlWithParams = url + '?' + searchParams;
    const proxiedUrl = getProxiedUrl(urlWithParams)

    fetch(proxiedUrl, {
        method,
    })
    .then(response => {
        if (response.status !== 200) {
            callback(null, response)
            return
        }

        return response.json()
    })
    .then(data => callback(data, null))
    .catch(error => callback(null, error))
}

const getProxiedUrl = (rowUrl) => {
    return PROXY_URL + rowUrl;
}

const PROXY_URL = "http://localhost:5000/";