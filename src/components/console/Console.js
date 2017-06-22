import React, { Component } from 'react';


class Console extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }

    getConsoleElements(object) {
        return Object.keys(object).map((key) => {
            return <p key={key} >{key}: { object[key]}</p>
        })
    }

    componentDidMount() {
    }

  render() {
        var consoleElements = this.getConsoleElements(this.props.consoleData);
        var miningData = this.getConsoleElements(this.props.miningData );
        return (
        <div className="Console">
            <div className="Console-header">

            <h2>Console</h2>
            </div>
            <div>
                { consoleElements }
            </div>
            <div>
                { miningData }
            </div>
        </div>
        );
  }
}

export default Console;
