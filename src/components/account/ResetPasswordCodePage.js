import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';
import * as urlHelper from '../../common/urlHelper';
import ResetPasswordSendCodeForm from './ResetPasswordSendCodeForm';
import { browserHistory } from 'react-router';

class ResetPasswordCodePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        debugger;
        this.state = {
            errors: {},
            email: props.email,
            saving: false,
        };

        this.sendEmailCode = this.sendEmailCode.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.handleServerError = this.handleServerError.bind(this);
        this.redirectToResetPassword = this.redirectToResetPassword.bind(this);
    }

    updateEmail(event) {
        const field = event.target.name;
        let email = this.state.code;
        email = event.target.value;
        return this.setState({ email: email });
    }

    handleServerError(result) {
        debugger;
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

    sendEmailCode(event) {
        event.preventDefault();
        this.setState({ saving: true });
        debugger;

        this.props.actions.sendEmailResetPassword(this.state.email)
            .then((result) => {
                debugger;
                if (result) {
                    if (result.errors) {
                        this.handleServerError(result);
                        this.setState({ saving: false });
                    }
                    else {
                        this.redirectToResetPassword();
                    }
                }
            })
            .catch(error => {
                this.setState({ saving: false });
            });
    }

    redirectToResetPassword() {
        debugger;
        toastr.success('Code has been sent on email');
        browserHistory.push('/resetpassword/confirmcode?email=' + this.state.email);
   }

    render() {

        return (
            <ResetPasswordSendCodeForm
                email={this.state.email}
                onChange={this.updateEmail}
                onSave={this.sendEmailCode}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ResetPasswordCodePage.propTypes = {
    email: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const params = urlHelper.getUrlVars(ownProps.location.search);
    debugger;
    return {
        email: state.user && state.user.email ? state.user.email : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordCodePage);    