import React from 'react';
import cache from '../scriptCache';
import googleMapsApiUrlParser from '../googleMapsApiUrlParser';
import { global } from '../global';

const GoogleMapsApiLoader = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor() {
      super();

      this.state = {
        maps: null
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
      this.scriptCache.googleMaps.onLoad((err, tag) => {
        this.setState({
          maps: global.google.maps
        });
      });
    }

    render() {
      const props = {...this.props, maps: this.state.maps};
      return (
        <WrappedComponent {...props} />
      );
    }
  }

  return Wrapper;
}

export default GoogleMapsApiLoader;
