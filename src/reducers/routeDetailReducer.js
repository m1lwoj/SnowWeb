import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function routeDetailReducer(state = initialState.route, action){
    switch (action.type) {
        case types.LOAD_ROUTE_SUCCESS:
            return action.route;
        default:
            return state;
    }
}
