import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as routeActions from '../../actions/routeActions';
import RouteList from './RouteList';
import { browserHistory } from 'react-router';
import GMap from './../point/GMap';
import RouteListFilterControls from './RouteListFilterControls';
import { bindActionCreators } from 'redux';
import * as urlHelper from '../../common/urlHelper';

class RouteListFilter extends React.Component {
    constructor(props, context) {
        super(props, context);

         this.state = {
            filter: this.props.filter,
            paging: this.props.paging
        };

        let a = this.props.filter.text;
        this.search = this.search.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange(event) {
        const field = event.target.name;
        let name = event.target.value;
        let filter = this.state.filter;
        filter.text = name;
        return this.setState({ filter: filter });
    }

    search() {
        let query = '';
        let containsParameters = false;
        let filter = this.state.filter;
        if (this.state.filter) {
            if (filter.text && filter.text !== '') {
                query += urlHelper.convertParameter('text', filter.text, containsParameters);
                containsParameters = true;
            }
            if (filter.difficulty && filter.difficulty !== '') {
                query += urlHelper.convertParameter('difficulty', filter.difficulty, containsParameters);
                containsParameters = true;
            }
            if (filter.userid && filter.userid !== '') {
                query += urlHelper.convertFilterParameter('userid', filter.userid, containsParameters);
                containsParameters = true;
            }
        }

        browserHistory.push('/routes' + query);
        this.props.refreshComponent(this.state.paging, this.state.filter);
    }

    render() {
        return (
            <RouteListFilterControls
                name={this.state.filter.text}
                onChange={this.nameChange}
                onSearch={this.search}
                searching={this.searching} />
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        //courses means coursesReducer
        refreshComponent: ownProps.refreshComponent,
        paging: ownProps.listFiltering.paging,
        filter: ownProps.listFiltering.filter
    };
}

export default connect(mapStateToProps)(RouteListFilter);    