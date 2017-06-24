import React, { Component } from 'react';
import DeckGL, { HexagonLayer } from 'deck.gl';
import MapGL from 'react-mapbox-gl'
//import MapGL from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_TOKEN = ""; // eslint-disable-line


// Viewport settings that is shared between mapbox and deck.gl
const viewport = {
   width: 500,
   height: 500,
   longitude: -100,
   latitude: 40.7,
   zoom: 3,
   pitch: 0,
   bearing: 0
}

export default class App extends Component {

  render() {

    return (
      <MapGL {...viewport} mapboxApiAccessToken={MAPBOX_TOKEN}>
        <DeckGL {...viewport} layers={[
          new HexagonLayer({id: 'line-layer', data: this.props.data})
        ]} />
      </MapGL>
    );
  }
}