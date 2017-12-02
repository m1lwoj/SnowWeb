import React, { Component } from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import GMap from './GMap';
// for hmr to work I need the first class to extend Component
export class Layout extends Component {
  render() {
    return (
          <GMap />
    )
  }
}

export default Layout;
