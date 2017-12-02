import React, { PropTypes } from 'react';
import RegisterForm from './RegisterForm';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';

//zrobic to na podstawie maagecoursepage
class RegisterPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: { email: '', name: '', password: '', confirmPassword: '' },
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveUser = this.saveUser.bind(this);
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

    authorizeUser(user) {
        this.props.actions.authorize(user)
            .then((tokenInfo) => {
                if (tokenInfo.errors) {
                    alert('CRITICAL ERROR');
                }
                else {
                    this.getAccountDetails();
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });
    }

    getAccountDetails() {
        this.props.actions.getAccountDetails()
            .then((userInfo) => {
                if (userInfo.errors) {
                    alert('CRITICAL ERROR');
                } else {
                    this.redirect();
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });
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

    saveUser(event) {
        event.preventDefault();
        if (this.registerFormIsValid()) {
            this.props.actions.saveUser(this.state.user)
                .then((userInfo) => {
                    if (userInfo.errors) {
                        this.handleServerError(userInfo);
                    }
                    else {
                        this.authorizeUser(this.state.user);
                    }
                }).catch(error => {
                    this.setState({ saving: false });
                });
        }
        return;
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Account has been created');
        this.context.router.push('/routes');
    }

    registerFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.user.name.length < 5) {
            errors.name = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(this.state.user.email)) {
            errors.email = 'Email must be in valid format.';
            formIsValid = false;
        }

        if (this.state.user.password.length <= 6) {
            errors.password = 'Password must be at least 6 characters.';
            formIsValid = false;
        }

        if (this.state.user.confirmPassword !== this.state.user.password) {
            errors.confirmPassword = 'Confirm password and password must be the same.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <RegisterForm
                user={this.state.user}
                onChange={this.updateCourseState}
                onSave={this.saveUser}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

RegisterPage.contextTypes = {
    router: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    let user = { email: '', name: '', password: '', confirmPassword: '' };

    return {
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);    