import cookie from 'react-cookie';
import encoder from '../common/encoder';

export function gettoken() {
    return encoder.decode(cookie.load('apitoken'));
}

export function settoken(token, time) {
    cookie.save('apitoken', encoder.encode(token), { path: '/', maxAge: time });
}

export function gettime() {
    return encoder.decode(cookie.load('time'));
}

export function settime(time) {
    cookie.save('time', encoder.encode(time), { path: '/', maxAge: time });
}

export function clearUserCookies(time) {
    cookie.remove('time');
    cookie.remove('apitoken');
    cookie.remove('user');
}

export function setUserInfo(userInfo) {
    var time = gettime();

    if (!time) {
        time = 1800;
    }

    cookie.save('user', encoder.encode(JSON.stringify(userInfo)), { path: '/', maxAge: time });
}

export function getUserInfo() {
    var userInfoText = encoder.decode(cookie.load('user'));

    if(userInfoText != '')
    {
        return JSON.parse(userInfoText);
    }
    else
    {
        return null;
    }
}