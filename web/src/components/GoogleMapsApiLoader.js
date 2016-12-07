import React from 'react'
import ReactDOM from 'react-dom'

import cache from '../scriptCache'
import googleMapsApiUrlParser from '../googleMapsApiUrlParser'

const defaultMapConfig = {}
const GoogleMapsApiLoader = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor() {      
      this.state = {
        loaded: false,
        map: null,
        google: null
      }
    }

    componentWillMount() {
      this.scriptCache = cache({
        googleMaps: googleMapsApiUrlParser({
          apiKey: apiKey,
          libraries: libraries
        })
      });
    }

    componentDidMount() {
      const refs = this.refs;
      this.scriptCache.google.onLoad((err, tag) => {
        const maps = window.google.maps;
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded
        });

        const mapRef = refs.map;

        const node = ReactDOM.findDOMNode(mapRef);
        let center = new maps.LatLng(this.props.lat, this.props.lng)

        let mapConfig = Object.assign({}, defaultMapConfig, {
          center, zoom: this.props.zoom
        })

        this.map = new maps.Map(node, mapConfig);

        this.setState({
          loaded: true,
          map: this.map,
          google: window.google
        })
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        map: this.state.map,
        google: this.state.google,
        mapComponent: this.refs.map
      })
      return (
        <div>
          <WrappedComponent {...props} />
          <div ref='map' />
        </div>
      )
    }
  }

  return Wrapper;
}

export default GoogleMapsApiLoader;