import React, { PropTypes } from 'react';
import LoginForm from './LoginForm';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';
import FlatButton from 'material-ui/FlatButton';
import { Link, IndexLink } from 'react-router';

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: { email: '', password: '' },
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.handleServerError = this.handleServerError.bind(this);
        this.authorizeUser = this.authorizeUser.bind(this);
        this.getAccountDetails = this.getAccountDetails.bind(this);
    }

    updateCourseState(event) {
        const field = event.target.name;
        let user = this.state.user;
        user[field] = event.target.value;
        return this.setState({ user: user });
    }

    handleAuthorizationError(tokenInfo) {
    }

    handleServerError(userInfo) {
        let errors = {};

        var serverErrors = userInfo.errors.map(obj => {
            return {
                field: obj.field,
                message: obj.message
            }
        });

        for (var i = 0; i < serverErrors.length; i++) {
            errors[serverErrors[i].field.toLowerCase()] = serverErrors[i].message;
        }

        toastr.error(userInfo.message);
        this.setState({ errors: errors });
    }

    authorizeUser(event) {
        event.preventDefault();
        this.props.actions.authorize(this.state.user)
            .then((userInfo) => {
                if (userInfo && userInfo.errors) {
                    this.handleServerError(userInfo);
                }
                else {
                    this.getAccountDetails();
                    this.redirect();
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });

        return;
    }

    getAccountDetails() {
        this.props.actions.getAccountDetails()
            .then((userInfo) => {
                if (userInfo.errors) {
                    alert('CRITICAL ERROR');
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Logged user');
        this.context.router.push('/routes');
    }

    registerFormIsValid() {
        let formIsValid = true;
        let errors = {};

        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(this.state.user.email)) {
            errors.email = 'Email must be in valid format.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <div>
                <LoginForm
                    user={this.state.user}
                    onChange={this.updateCourseState}
                    onSave={this.authorizeUser}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
                <FlatButton label="Forget password ?" secondary={true} containerElement={<Link to="/resetpassword" />} />
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    let user = { email: '', password: '' };

    return {
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);    
