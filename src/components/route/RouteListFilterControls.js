import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { GridTile } from 'material-ui/GridList';
import TextInput from '../common/TextInput';

const RouteListFilterControls = ({name, searching, onChange, onSearch}) => {
    return (
        <div>
            <TextInput
                name="search"
                hintText="Search text"
                value={name}
                onChange={onChange} />

            <input type="submit"
                disabled={searching}
                value={searching ? 'Searching...' : 'Search'}
                className="btn btn-primary"
                onClick={onSearch} />
        </div>
    );
};

export default RouteListFilterControls;
