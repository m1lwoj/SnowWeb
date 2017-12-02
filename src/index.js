/*eslint-disable import/default */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory } from 'react-router';
import routes from './routes.js';
import './styles/styles.css';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import {loadRoutes} from './actions/routeActions';
import {loadPoints} from './actions/routeActions';
import {loadToken} from './actions/userActions';
import {loadUserInfo} from './actions/userActions';
import {} from './actions/authorActions';
import injectTapEventPlugin from 'react-tap-event-plugin';
        injectTapEventPlugin();

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadToken());
store.dispatch(loadUserInfo());

render(
   <Provider store={store}>
     <Router history = {browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);