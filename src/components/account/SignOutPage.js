import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import toastr from 'toastr';

class SignOutPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.signout = this.signout.bind(this);
        this.signout();
        this.redirect();
    }

    signout(event) {
        this.props.actions.signout();
    }

    redirect() {
        this.setState({ saving: false });
        toastr.success('Signed out user');
        this.context.router.push('/routes');
    }

    render() {
        return (
            <div></div>
        );
    }
}

SignOutPage.contextTypes = {
    router: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutPage);    