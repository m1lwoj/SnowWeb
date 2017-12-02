import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class ProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: props.user,
        };
        this.redirectToLogin = this.redirectToLogin.bind(this);

        if (!this.state.user.id) {
            this.redirectToLogin();
        }
    }

    redirectToLogin() {
        toastr.error('User is not logged in');
        this.context.router.push('/login');
    }

    render() {
        debugger;
        let isconfirmed = this.state.user.isconfirmed ? this.state.user.isconfirmed.toString() : 'false';
        return (
            <div>
                <br/>
                <span>Email: {this.state.user.email}</span>
                <br/>
                <span>Profile confirmed: {isconfirmed}</span>
            </div>
        );
    }
}

ProfilePage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);  
