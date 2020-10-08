const async = require('async');
const request = require('request');

const oembedService = 'https://soundcloud.com/oembed.json?auto_play=false&maxheight=250&url='
const client_id = process.env.CLIENT_ID
const userId = process.env.USER_ID
const soundcloudAPI = 'http://api-v2.soundcloud.com'

let httpGet = (soundcloudTracks, callback) => {
    const options = {
        url: `${oembedService}${soundcloudTracks.uri}`,
        json: true
    };
    request(options,
        (err, res, body) => {
            callback(err, body.html);
        }
    );
}

let replaceDefaultSizing = (body) => {
    body.html = body.html.replace(/height=".*?"/, 'height="100px"');

    return body;
}

let getAllTracks = () => {
    return new Promise((fulfill, reject) => {
        request(`${soundcloudAPI}/users/${userId}/tracks?format=json&client_id=${client_id}`, (err, res, body) => {
            let allTracks = JSON.parse(body);
            fulfill(allTracks);
        }).on('error', (e) => {
            reject(e);
        });
    });
}

let convertTracksToIframes = (soundcloudTracks) => {
    return new Promise((fulfill, reject) => {
        async.map(soundcloudTracks.collection, httpGet, (err, res) => {
            if (err) return reject(err);
            fulfill(res);
        });
    });
}

module.exports = {
    getAllTracks,
    convertTracksToIframes
};
