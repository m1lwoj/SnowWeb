import React, { PropTypes } from 'react';
import RouteListTile from './RouteListTile';
import { GridList } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: '100%',
    cellHeight: '68px'
  }
};

const RouteList = ({routes}) => {
  return (
    <div style={styles.root}>
      <GridList cols={5} style={styles.gridList}>
        {
          routes.map((route) => (<RouteListTile key={route.id} route={route} />))
        }
      </GridList>
    </div>
  );
};

RouteList.propTypes = {
  routes: PropTypes.array.isRequired
};

export default RouteList