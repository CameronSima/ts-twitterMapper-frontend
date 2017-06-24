import React, { Component } from 'react';
import DeckMap from './DeckMap.js';

export default class MapData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapData: null,
            reqParams: { mode: 'cors', method: 'get', 
                         headers: new Headers({ 
                             'Content-Type': 'application/json'
                            })
            }
        }
    }

    getMapData() {
        fetch("http://localhost:3000/tweet_data", this.state.reqParams)
        .then(response => response.json())
        .then((data) =>{
            return data.map((t) => {
                return ([Number(t.latLng.lng), Number(t.latLng.lat)])
            })
        })
        .then(response => this.setState({ mapData: response }))
        
    }

    componentDidMount() {
        this.getMapData();
        console.log()
    }

    render() {
        return (
            <DeckMap data={this.state.mapData || []}/>
        )
    }
}