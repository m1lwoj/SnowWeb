import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as routeActions from '../../actions/routeActions';
import RouteList from './RouteList';
import { browserHistory } from 'react-router';
import GMap from './../point/GMap';
import { bindActionCreators } from 'redux';
import { loadRoute } from './../../actions/routeActions';
import RouteDetailsCard from './RouteDetailsCard';
import RouteDetailsMap from './RouteDetailsMap';

class RouteDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.getRouteAsync();
    }

    getRouteAsync() {
        let {route} = this.props.getRoute();
        this.setState({ route: route })
    }

    render() {
        const left = {
            float: 'left',
            width: '50%'
        };

        const right = {
            float: 'right',
            width: '50%'
        };

        if (!this.props.route.id) {
            return <div><p>loading data....</p></div>
        }

        return (
            <div>z
                <div style={left}>
                    <RouteDetailsCard route={this.props.route} />
                </div>
                <div style={right}>
                    <RouteDetailsMap route={this.props.route} />
                    <p>{this.props.route.mainPoint.lat}</p>
                    <p>{this.props.route.mainPoint.lng}</p>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getRoute: () => dispatch(loadRoute(ownProps.params.id)),
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        route: state.route
    };
};

RouteDetailsPage.propTypes = {
    route: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetailsPage);    