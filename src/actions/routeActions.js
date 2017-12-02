import * as types from './actionTypes';
import routesApi from '../api/routeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import cookies from '../cookies/cookiesActions';

export function loadRoutesSuccess(routes) {
    return {
        type: types.LOAD_ROUTES_SUCCESS,
        routes
    };
}

export function loadRouteSuccess(route) {
    return {
        type: types.LOAD_ROUTE_SUCCESS,
        route
    };
}

export function loadPointsSuccess(points) {
    return {
        type: types.LOAD_POINTS_SUCCESS,
        points
    };
}

export function loadRoutes(paging, filter) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return routesApi.getRoutes(paging, filter).then(routes => {
            dispatch(loadRoutesSuccess(routes));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadRoute(id) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return routesApi.getRoute(id).then(route => {
            dispatch(loadRouteSuccess(route));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadPoints() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return routesApi.getPoints().then(points => {
            dispatch(loadPointsSuccess(points));
        }).catch(error => {
            throw (error);
        });
    };
}

