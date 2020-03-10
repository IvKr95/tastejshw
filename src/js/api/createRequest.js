const createRequest = (options = {}) => {
    const searchParams = new URLSearchParams(options.params);

    fetch(options.url + '?' + searchParams, {
        method: options.method,
        body: options.body
    })
    .then(result => result.json())
    .then(data => console.log(data))
    .catch(error => options.callback(error))
}

const handleResolved = () => {

}

const handleReject = () => {

}