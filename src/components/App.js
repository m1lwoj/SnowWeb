import React, { PropTypes } from 'react';
import Header from './common/header';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {

    render() {
        //Workaround for landing page
        if (this.props.children.props.router.location.pathname === '/') {
            return (<div style={{ height: '100%' }}>{this.props.children}</div>);
        }
        else {
            return (<MuiThemeProvider>
                <div className="container-fluid">
                    <Header
                        loading={this.props.loading}
                        email={this.props.user.email}
                        islogged={this.props.islogged}
                        isconfirmed={this.props.isconfirmed}
                        />
                    {this.props.isconfirmed.toString()}
                    {this.props.user.email}
                    {this.props.user.apitoken}
                    {this.props.children}
                </div>
            </MuiThemeProvider>
            );
        }
    }
}

App.PropTypes = {
    children: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        user: state.user,
        apitoken: state.user.apitoken,
        islogged: state.user.apitoken != null && state.user.apitoken != '',
        isconfirmed: state.user.isconfirmed != null && state.user.isconfirmed != '' && state.user.isconfirmed,
    }
}

export default connect(mapStateToProps)(App);