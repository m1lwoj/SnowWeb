import React, { PropTypes } from 'react';
import GoogleMapReact from 'google-map-react';

class Polyline extends React.Component {

  componentWillUpdate() {
    this.line.setMap(null)
  }

  componentWillUnmount() {
    this.line.setMap(null)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  getPaths() {
    const { points } = this.props

    return points;
  }

  render() {
    const Polyline = this.props.maps.Polyline

    const renderedPolyline = this.renderPolyline()
    const paths = { path: this.getPaths() }

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths))

    this.line.setMap(this.props.map)
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < paths.path.length; i++) {
      bounds.extend(new google.maps.LatLng(paths.path[i].lat, paths.path[i].lng));
    }

    this.props.map.fitBounds(bounds);

    return null
  }

  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || '#ffffff',
      strokeOpacity: 1,
      strokeWeight: 4
    }
  }
}

class RouteDetailsMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      map: null,
      maps: null,
      mapLoaded: null,
      route: Object.assign({}, this.props.route),
    }
  }

  render() {
    return (
      <GoogleMapReact
        style={{
          position: 'relative',
          margin: 0,
          padding: 0,
          flex: 1,
          height: 500
        }}
        options={{
          minZoom: 3,
          maxZoom: 15
        }}
        hoverDistance={30}
        center={{ lat: 49.572442, lng: 19.767194 }}
        zoom={5}
        bootstrapURLKeys={{ key: 'AIzaSyAQUwpnlQ9XJ4qiWohryfs4L1XCZA09nH4' }}
        onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps: maps, mapLoaded: true }) } }
        yesIWantToUseGoogleMapApiInternals
        >
        {this.state.mapLoaded && <Polyline map={this.state.map} maps={this.state.maps} points={this.state.route.geometry.points} />}
      </GoogleMapReact>
    );
  }
}


RouteDetailsMap.propTypes = {
  route: PropTypes.object.isRequired
};

export default RouteDetailsMap;
