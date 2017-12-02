export default class Encoder {
    static encode(obj) {
        if(!obj || obj === 'undefined') obj = '';
        return btoa(obj);
    }

    static decode(obj) {
        if(!obj || obj === 'undefined') obj = '';
        return atob(obj);
    }
}