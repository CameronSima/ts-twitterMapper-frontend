import React, { Component } from 'react';
import Console from './Console.js';


class ConsoleData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            consoleData: null,
            miningData: null,
            reqParams: { mode: 'cors', method: 'get', 
                         headers: new Headers({ 
                             'Content-Type': 'application/json'
                            })
                        }
        };
    }

    getConsoleData() {
        fetch('http://localhost:3000/console', this.state.reqParams)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            this.setState({ consoleData: response });
        })
    }

    getMiningData() {
        fetch('http://localhost:3000/mining_status', this.state.reqParams)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            this.setState({ miningData: response });   
        })
    }

    componentDidMount() {
        this.getConsoleData();
        setInterval(this.getMiningData.bind(this), 2000);
        
        
    }
  render() {
      if (this.state.consoleData && this.state.miningData) {
        return < Console consoleData={ this.state.consoleData } 
                         miningData={ this.state.miningData }
            />
      }
      return <div>Loading . . .</div>   
  }
}

export default ConsoleData;
