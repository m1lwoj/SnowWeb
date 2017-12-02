import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function routeReducer(state = initialState.routes, action){
    switch (action.type) {
        case types.LOAD_ROUTES_SUCCESS:
            return action.routes;
        default:
            return state;
    }
}
