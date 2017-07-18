const async = require('async');
const request = require('request');

const oembedService = 'https://soundcloud.com/oembed.json?auto_play=false&maxheight=250&url='
const client_id = '2t9loNQH90kzJcsFCODdigxfp325aq4z'
const userId = '309831355'
const soundcloudAPI = 'http://api.soundcloud.com'

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
        async.map(soundcloudTracks, httpGet, (err, res) => {
            if (err) return reject(err);
            fulfill(res);
        });
    });
}

module.exports = {
    getAllTracks,
    convertTracksToIframes
};