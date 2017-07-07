
import React, {Component} from 'react';
import {render} from 'react-dom';
import Modal from 'react-modal';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './map/deckgl-overlay.js';

import * as helpers from './utils/helpers.js';

// Modal settings
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      mapboxToken: null,
      data: null,
      dataFull: null,
      modalIsOpen: false
    };
    this.getMapBoxAccessToken();
    this.getMapData();
    this._onClick = this._onClick.bind(this);
  }

  getMapBoxAccessToken() {
    fetch("http://104.236.223.98:3030/get_mapbox_token")
    .then(response => response.json())
    .then(response => this.setState({mapboxToken: response}));
  }
  getMapData() {
        fetch("http://104.236.223.98:3030/tweet_data")
        .then(response => response.json())
        .then((data) => {
          this.setState({ dataFull: data });
          return data
        })
        .then((data) =>{
            return data.map((t) => {
                return ([Number(t.latLng.lng), Number(t.latLng.lat)])
            })
        })
        .then((data) => {
          console.log("DATA LOADED")
          console.log(data.length);
          this.setState({ data });
        })
    }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  _onHover(info) {
    //console.log(info)
  }
  _onClick(info) {
  
    let tweets = helpers.getTweetsFromHexagon(this.state.dataFull, info);
    tweets.forEach((tweet) => {
      console.log(helpers.generateColorCodes(tweet.sentimentData))
    })

    this.openModal();

  }

  render() {
    const {viewport, data, mapboxToken} = this.state;

    if (mapboxToken) {

      return (
        <div>
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={this._onViewportChange.bind(this)}
            mapboxApiAccessToken={mapboxToken}>
            <DeckGLOverlay
              onClick={this._onClick}
              viewport={viewport}
              data={data || []}
            />
          </MapGL>
          <Modal
            style={customStyles}
            isOpen={ this.state.modalIsOpen }
            onRequestClose={ this.closeModal } />
        </div>
      );
    } else {
      return <div/>
    }
  }
}

render(<Root />, document.body.appendChild(document.createElement('div')));
