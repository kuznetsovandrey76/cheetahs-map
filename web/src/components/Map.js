import React, { PropTypes } from 'react';
import GoogleMapsApiLoader from './GoogleMapsApiLoader';

export class Map extends React.Component {
  renderMap = (maps) => {    
    if(maps) {
      this.map = new maps.Map(this.el, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
    }
  };

  componentWillReceiveProps(nextProps) {
    this.renderMap(nextProps.maps);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div ref={(el) => this.el = el } style={this.props.style}></div>
    )
  }
}

Map.propTypes = {
  style: PropTypes.object.isRequired
}

export default GoogleMapsApiLoader({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(Map)
