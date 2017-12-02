import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { GridTile } from 'material-ui/GridList';

const RouteListTile = ({route}) => {
    return (
        <Link to={'/route/' + route.id} key={route.id}>
            <GridTile
                key={route.id}
                title={route.name}
                subtitle={<span>Created by <b>{route.userId}</b></span>}
                >
                <img src={route.img} />
            </GridTile>
        </Link>
    );
};

RouteListTile.propTypes = {
    route: PropTypes.object.isRequired
};

export default RouteListTile;
