import React, {Component} from 'react';

export default class InfoWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hashtags: [],
            sentimentScore: 0
        }
    }

    render() {
        let hashtags = this.props.hashtags.map((hashtag) => {
            return (
                <p>{ hashtag } </p>
            )
        })
        return(
            <div className="infoWindow">
                <div className="data-block">
                    <h4>Top Hashtags:</h4>
                    { hashtags }
                </div>

                <div className="data-block">
                    <h4>Number of Tweets:</h4>
                    { this.props.tweets.length }
                </div>
            </div>
        )
    }
}
