export function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        myJson[hash[0]] = decodeURIComponent(hash[1]);
    }
    return myJson;
}

export function convertFilterParameter(conditionText, conditionValue, containsParameters, containsFilter) {
    let firstPart = '';
    let secondPart = '';
    if (containsParameters === true) {
        firstPart = '&';
    } else {
        firstPart = '?';
    }

    if (containsFilter === true) {
        secondPart = '|' + conditionText + '::';
    } else {
        secondPart = 'filter=' + conditionText + '::'
    }

    return firstPart + secondPart + conditionValue;
}

export function convertParameter(conditionText, conditionValue, containsParameters) {
    let firstPart = '';
    if (containsParameters === true) {
        firstPart = '&';
    } else {
        firstPart = '?';
    }

    return firstPart + conditionText + '=' + conditionValue;
}