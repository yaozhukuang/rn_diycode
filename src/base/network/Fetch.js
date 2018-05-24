

export function request(url, option, succeed, failed) {
    console.log(option.method + ": " + url);
    fetch(url, option)
        .then((response) => response.json())
        .then((responseJson) => {
            succeed(responseJson);
        }).catch(error => failed(error))
}

export function requestString(url, option, succeed, failed) {
    console.log(option.method + ": " + url);
    fetch(url, option)
        .then((response) =>  succeed(response))
        .catch(error => failed(error))
}