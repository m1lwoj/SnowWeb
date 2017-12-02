import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Login extends React.Component {
    render() {
        return (
            <div>
                <FlatButton containerElement={<Link to="/register" />} label="Zarejestruj" />
                <FlatButton containerElement={<Link to="/login" />} label="Zaloguj" />
            </div>
        );
    }
}

const LoggedNotConfirmed = (isconfirmed) => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Confirm account" containerElement={<Link to="/account/confirm" />} />
        <MenuItem primaryText="Reset password" containerElement={<Link to="/account/resetpassword" />} />
        <MenuItem primaryText="Sing out" containerElement={<Link to="/logout" />} />
        <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
    </IconMenu>
);

const LoggedConfirmed = (isconfirmed) => (
    <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Account confirmed" />
        <MenuItem primaryText="Reset password" containerElement={<Link to="/account/resetpassword" />} />
        <MenuItem primaryText="Wyloguj" containerElement={<Link to="/logout" />} />
        <MenuItem primaryText="Profile" containerElement={<Link to="/account/profile" />} />
    </IconMenu>
);

const Header = ({loading, email, islogged, isconfirmed}) => {
    var styles = {
        tabs: {
            width: '30%'
        }
    };

    let loginMenu = null;

    return (
        <div>
            <AppBar title='main' style={styles.appBar}
                iconElementRight={
                    <div>
                        <FlatButton containerElement={<Link to="/routes" />} label="Trasy" />
                        <FlatButton containerElement={<Link to="/map" />} label="Mapa" />
                        <FlatButton containerElement={<Link to="/about" />} label="O nas" />
                        {islogged ? isconfirmed ? <LoggedConfirmed /> : <LoggedNotConfirmed /> : <Login />}
                    </div>
                } />
        </div>
    );
};
Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    islogged: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    isconfirmed: PropTypes.bool.isRequired
};

export default Header;