import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import { gettoken, settoken, gettime, settime, getUserInfo, setUserInfo, clearUserCookies } from '../cookies/cookiesActions';
import initialState from '../reducers/initialState';

export function authorizeSuccess(tokenInfo) {
    return {
        type: types.AUTHORIZE_SUCCESS,
        tokenInfo
    };
}

export function signoutSuccess() {
    return {
        type: types.SINGOUT_SUCCESS
    };
}

export function accountDetailsSuccess(userInfo) {
    return {
        type: types.LOAD_USERDETAILS_SUCCESS,
        userInfo
    };
}

export function codeConfirmationSuccess(user) {
    return {
        type: types.POST_CODE_SUCCESS,
        user
    };
}

export function saveUser(user) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return userApi.save(user).then(createdUserInfo => {
            return createdUserInfo;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function authorize(user) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return userApi.authorize(user).then(tokenInfo => {
            if (tokenInfo.errors) {
                return tokenInfo;
            }
            settoken(tokenInfo.accessToken, tokenInfo.expires);
            settime(tokenInfo.expires);
            dispatch(authorizeSuccess(tokenInfo));
            return tokenInfo;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function getAccountDetails() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        var token = gettoken();
        return userApi.getAccountDetails(gettoken()).then(userInfo => {
            if (userInfo.errors) {
                return userInfo;
            }
            setUserInfo(userInfo);
            dispatch(accountDetailsSuccess(userInfo));

            return userInfo;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function loadToken() {
    return function (dispatch) {
        var token = gettoken();
        dispatch(authorizeSuccess({ accessToken: token }));
    };
}

export function loadUserInfo() {
    return function (dispatch) {
        var userInfo = getUserInfo();
        if (userInfo == null) {
            userInfo = initialState.user;
        }
        dispatch(accountDetailsSuccess(userInfo));
    };
}

export function signout() {
    return function (dispatch) {
        clearUserCookies();
        dispatch(signoutSuccess());
    };
}

export function sendEmailCode() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return userApi.sendEmailCode(gettoken()).then(codeInfo => {
            return codeInfo;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function confirmCode(code) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return userApi.confirmCode(gettoken(), code).then(codeInfo => {
            if(codeInfo.errors){
                return codeInfo;
            }
            var user = getUserInfo();
            user.isConfirmed = true;
            setUserInfo(user);
            dispatch(codeConfirmationSuccess(user));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function sendEmailResetPassword(email) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        debugger;
        return userApi.sendEmailResetPassword(email).then(result => {
            return result;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}

export function resetPassword(passwordModel) {
    debugger;
    return function (dispatch) {
        dispatch(beginAjaxCall());
        debugger;
        return userApi.resetPassword(passwordModel).then(result => {
            return result;
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}