import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import ComingSoonPage from './components/home/ComingSoonPage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import RoutesPage from './components/route/RoutesPage';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disabled-line
import RouteDetailsPage from './components/route/RouteDetailsPage'; //eslint-disabled-line
import RegisterPage from './components/register/RegisterPage'; //eslint-disabled-line
import LoginPage from './components/login/LoginPage'; //eslint-disabled-line
import Map from './components/point/Layout'; //eslint-disabled-line
import ConfirmAccountPage from './components/account/ConfirmAccountPage'; //eslint-disabled-line
import ResetPasswordPage from './components/account/ResetPasswordPage'; //eslint-disabled-line
import ResetPasswordCodePage from './components/account/ResetPasswordCodePage'; //eslint-disabled-line
import SingOutPage from './components/account/SignOutPage'; //eslint-disabled-line
import ProfilePage from './components/account/ProfilePage'; //eslint-disabled-line

export default (
    <Route path="/" component={App}> 
        <IndexRoute component={ComingSoonPage} />
        <Route path ="about" component={AboutPage} />
        <Route path ="courses" component={CoursesPage} />
        <Route path ="course/:id" component={ManageCoursePage} />
        <Route path ="coursess" component={ManageCoursePage} />
        <Route path ="course" component={ManageCoursePage} />
        <Route path ="routes(?:page)" component={RoutesPage} />
        <Route path ="route/:id" component={RouteDetailsPage} />
        <Route path ="register" component={RegisterPage} />
        <Route path ="login" component={LoginPage} />
        <Route path ="account/confirm" component={ConfirmAccountPage} />
        <Route path ="resetpassword/confirmcode" component={ResetPasswordPage} />
        <Route path ="resetpassword" component={ResetPasswordCodePage} />
        <Route path ="logout" component={SingOutPage} />
        <Route path ="account/profile" component={ProfilePage} />
        <Route path ="map" component={Map} />
    </Route>
    );

        // {/*<Route path ="routes?(page=:page)(&text=:text)(&userid=:userid)(&difficulty=:difficulty)" component={RoutesPage} />*/}
    