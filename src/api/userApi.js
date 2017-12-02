import * as api from './apiActions';

class UserApi {
    static getPostProperties(obj, token) {
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        if (token) {
            headers.append('Authorization', 'bearer ' + token);
        }

        var requestProperties = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(obj),
            mode: 'cors'
        };

        return requestProperties;
    }

    static getGetProperties(token) {
        debugger;
        var headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
        if (token) {
            headers.append('Authorization', 'bearer ' + token);
        }

        var requestProperties = {
            method: "GET",
            headers: headers,
            mode: 'cors'
        };

        return requestProperties;
    }

    static save(user) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.POST_USER, UserApi.getPostProperties(user))
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    static authorize(user) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.POST_AUTH, UserApi.getPostProperties(user))
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    static getAccountDetails(token) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.GET_ACCOUNT_DETAILS, UserApi.getGetProperties(token))
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }

    static sendEmailCode(token, code) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.GET_CONFIRM_ACCOUNT, UserApi.getGetProperties(token))
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                })
                .catch((error) => {
                    debugger;
                    console.error(error);
                });
        });
    }

    static sendEmailResetPassword(email) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.GET_RESETPASSWORD + '?email=' + email)
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(Object.assign({}, responseJson));
                })
                .catch((error) => {
                    debugger;
                    console.error(error);
                });
        });
    }

    static confirmCode(token, code) {
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.POST_CONFIRM_ACCOUNT, UserApi.getPostProperties(code, token))
                .then((response) => resolve(Object.assign({}, {})))
                .catch((error) => {
                    debugger;
                    console.error(error);
                });
        });
    }

    static resetPassword(passwordModel) {
        debugger;
        return new Promise((resolve, reject) => {
            fetch(api.URL + api.POST_RESETPASSWORD, UserApi.getPostProperties(passwordModel))
                .then((response) => {
                    var resp = {};
                    if (response.status !== 204) {
                        resp = response.json();
                    }

                    return resp;
                })
                .then((responseJson) => {
                    debugger;
                    if (responseJson) {
                        resolve(Object.assign({}, responseJson));
                    }
                    else {
                        resolve(Object.assign({}, null));
                    }
                })
                .catch((error) => {
                    debugger;
                    console.error(error);
                });
        });
    }

}

export default UserApi;