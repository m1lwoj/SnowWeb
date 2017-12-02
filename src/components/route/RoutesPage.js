import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as routeActions from '../../actions/routeActions';
import RouteList from './RouteList';
import { browserHistory } from 'react-router';
import GMap from './../point/GMap';
import RouteListFilter from './RouteListFilter';
import * as urlHelper from '../../common/urlHelper';

class RoutesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            listFiltering: this.props.listFiltering,
        };

        this.refreshComponent = this.refreshComponent.bind(this);
    }

    routeRow(route, index) {
        return <div key={index}>{route.name}</div>;
    }

    componentDidMount() {
        this.getData(this.state.listFiltering.paging, this.state.listFiltering.filter);
    }

    getData(paging, filter) {
        this.props.getRoutes(paging, filter);
        this.props.getPoints();
    }

    refreshComponent(paging, filter) {
        this.setState({listFiltering: {paging: paging, filter: filter}});
        this.getData(this.state.listFiltering.paging, this.state.listFiltering.filter);
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

        if (!this.props.loadedRoutes) {
            return <div><p>loading data....</p></div>
        }

        return (
            <div>
                <div style={left}>
                    <RouteListFilter listFiltering={this.props.listFiltering} refreshComponent={this.refreshComponent}/>
                    <h1>Routes</h1>
                    <RouteList routes={this.props.loadedRoutes} />
                </div>
                <div style={right}>
                    <GMap />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const params = urlHelper.getUrlVars(ownProps.location.search);
    return {
        //courses means coursesReducer
        loadedRoutes: state.routes,
        listFiltering:
        {
            paging: {
                page: params.page ? params.page : ''
            },
            filter: {
                text: params.text ? params.text : '',
                userid: params.userid ? params.userid : '',
                difficulty: params.difficulty ? params.difficulty : '',
            }
        }
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getRoutes: (paging, filter) => dispatch(routeActions.loadRoutes(paging, filter)),
        getPoints: () => dispatch(routeActions.loadPoints()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesPage);    
