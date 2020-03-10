const createRequset = (options = {}) => {
    fetch(options.url, options.body)
    .then((res) => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}