import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import routes from './routeReducer';
import points from './pointReducer';
import user from './userReducer';
import route from './routeDetailReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    route,
    routes,
    points,
    user,
    ajaxCallsInProgress
});

export default rootReducer;