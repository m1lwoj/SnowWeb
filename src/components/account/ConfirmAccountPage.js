import React, { PropTypes } from 'react';
import ConfirmAccountForm from './ConfirmAccountForm';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class ConfirmAccountPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: props.user,
            errors: {},
            codeSent: false,
            expirationTime: '',
            code: ''
        };

        this.sendEmailCode = this.sendEmailCode.bind(this);
        this.confirmCode = this.confirmCode.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.updateCourseState = this.updateCourseState.bind(this);
        this.handleServerError = this.handleServerError.bind(this);

        if (!this.state.user.id) {
            this.redirectToLogin();
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let code = this.state.code;
        code = event.target.value;
        return this.setState({ code: code });
    }

    handleServerError(result) {
        let errors = {};

        var serverErrors = result.errors.map(obj => {
            return {
                field: obj.field,
                message: obj.message
            }
        });

        for (var i = 0; i < serverErrors.length; i++) {
            errors[serverErrors[i].field.toLowerCase()] = serverErrors[i].message;
        }

        this.setState({ errors: errors });
    }

    sendEmailCode(event) {
        if (this.state.codeSent === false) {
            this.setState({ codeSent: true });

            this.props.actions.sendEmailCode()
                .then((result) => {
                    if (result && result.errors) {
                        this.handleServerError(result);
                        this.setState({ codeSent: false });
                    }
                    else {
                        this.setState({ expirationTime: 'Kod wygaśnie: ' + result.expirationDate });
                    }
                })
                .catch(error => {
                    this.setState({ codeSent: false });
                });
        }
        else {
            this.setState({ errors: { status: 'Code already sent.' } })
        }
    }

    confirmCode(event) {
        event.preventDefault();
        this.props.actions.confirmCode({ code: this.state.code })
            .then((codeInfo) => {
                if (codeInfo && codeInfo.errors) {
                    this.setState({ errors: { status: 'Something went wrong, please try relogin.' } })
                }

                this.redirect();
            })
            .catch(error => {
                this.setState({ saving: false });
            });

        return;
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('User has been confirmed');
        this.context.router.push('/routes');
    }

    redirectToLogin() {
        this.setState({ saving: false });
        toastr.error('User is not logged in');
        this.context.router.push('/login');
    }

    render() {
        <div>

        </div>
        return (
            <ConfirmAccountForm
                user={this.state.user}
                onChange={this.updateCourseState}
                onSave={this.confirmCode}
                onClick={this.sendEmailCode}
                errors={this.state.errors}
                saving={this.state.saving}
                sent={this.state.codeSent}
                expirationTime={this.state.expirationTime}
            />
        );
    }
}

ConfirmAccountPage.contextTypes = {
    router: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountPage);    