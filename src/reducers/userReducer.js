import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.AUTHORIZE_SUCCESS:
            var token = {
                id: state.id,
                email: state.email,
                isconfirmed: state.isconfirmed,
                apitoken: action.tokenInfo.accessToken
            };
            return Object.assign({}, token)
        case types.LOAD_USERDETAILS_SUCCESS:
            var userInfo = {
                id: action.userInfo.id,
                email: action.userInfo.email,
                isconfirmed: action.userInfo.isConfirmed,
                apitoken: state.apitoken
            };
            return Object.assign({}, userInfo)
        case types.POST_CODE_SUCCESS:
            var confirmedUser = {
                id: action.user.id,
                email: action.user.email,
                isconfirmed: action.user.isConfirmed,
                apitoken: action.user.apitoken
            };
            return Object.assign({}, confirmedUser)
        case types.SINGOUT_SUCCESS:
            var emptyUser = {
            };
            return Object.assign({}, emptyUser)
        default:
            return state;
    }
}
