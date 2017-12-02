import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const RouteDetailsCard = ({route}) => {
    return (
        <Card>
            <CardHeader
                title={route.name}
                subtitle={route.user.name}
                />
            <CardText>
                <p>{route.difficulty}</p>
            </CardText>
        </Card>
    );
};

export default RouteDetailsCard;


