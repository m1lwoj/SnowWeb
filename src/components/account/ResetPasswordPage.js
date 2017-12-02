import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as urlHelper from '../../common/urlHelper';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordSendCodeForm from './ResetPasswordSendCodeForm';
import { browserHistory } from 'react-router';

class ResetPasswordPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        debugger;
        this.state = {
            errors: {},
            codeSent: false,
            sendCodePage: props.code,
            model: {
                code: props.code,
                email: props.email,
                password: '',
                confirmedPassword: ''
            },
            saving: false
        };

        this.resetPassword = this.resetPassword.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleServerError = this.handleServerError.bind(this);
    }

    redirectToLogin() {
        debugger;
        toastr.success('Password has been reset');
        browserHistory.push('/login');
    }

    updateState(event) {
        const field = event.target.name;
        let model = this.state.model;
        model[field] = event.target.value;
        return this.setState({ model: model });
    }

    handleServerError(result) {
        let errors = {};

        let serverErrors = result.errors.map(obj => {
            return {
                field: obj.field,
                message: obj.message
            };
        });

        for (let i = 0; i < serverErrors.length; i++) {
            errors[serverErrors[i].field.toLowerCase()] = serverErrors[i].message;
        }

        this.setState({ errors: errors });
    }

    resetPassword(event) {
        debugger;
        event.preventDefault();
        this.setState({ saving: true });

        this.props.actions.resetPassword(this.state.model)
            .then((result) => {
                if (result && result.errors) {
                    this.handleServerError(result);
                    this.setState({ saving: false });
                }
                else {
                    this.redirectToLogin();
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });

        return;
    }

    render() {
        return (
            <ResetPasswordForm
                model={this.state.model}
                onChange={this.updateState}
                onSave={this.resetPassword}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ResetPasswordPage.propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const params = urlHelper.getUrlVars(ownProps.location.search);
    debugger;

    return {
        email: state.user && state.user.email ? state.user.email : params.email ? params.email : '',
        code: params.code ? params.code : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);    