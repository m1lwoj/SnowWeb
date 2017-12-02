import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function routeReducer(state = initialState.points, action){
    switch (action.type) {
        case types.LOAD_POINTS_SUCCESS:
            return action.points;
        default:
            return state;
    }
}
