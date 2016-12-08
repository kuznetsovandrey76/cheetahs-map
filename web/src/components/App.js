import React, { Component } from 'react';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div>
        <Map style={
          {width: '100vw', height: '100vh'}
        }
        />
      </div>
    );
  }
}

export default App;
