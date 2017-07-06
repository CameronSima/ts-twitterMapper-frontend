export let getTopHastags = (tweets, n) => {

    // returns the top n hastags in hashtags array of all tweets
    let temp = {};
    let top = [];

    tweets.forEach((tweet) => {
        tweet.hashtags.forEach((hashtag) => {
            temp[hashtag.text] = temp[hashtag.text] ? temp[hashtag.text] +1 : 1;
        });
    })

    top = Object.keys(temp).sort((a, b) => {
        return temp[a] - temp[b]
    });
    return top.slice(-(n)).reverse();
}

export let generateColorCodes = (sentimentOb) => {

    // convert number between 0-1 to 0-255
    return [sentimentOb.neg, sentimentOb.neu, sentimentOb.pos].map((score) => {
        return Math.round(score * 254.999);
    })
}

export let getTweetsFromHexagon = (data, info) => {

    // get full tweet object from lat and lng corrdinates returned
    // by the info object returned by the getPickedInfo() method
    // 
    return data.filter((tweet) => {
        return tweet.latLng.lng == info.object.points[0]['0'] &&
               tweet.latLng.lat == info.object.points[0]['1']
    })
}
