const async = require('async');
const SCClient = require('../services/soundcloud-api');

module.exports = (app) => {

    app.get('/getSoundcloudIframes', (req, res) => {
        async.parallel({
            data: (callback) => {
                SCClient.getAllTracks().then((allTracks) => {
                    SCClient.convertTracksToIframes(allTracks).then((result) => {
                        callback(null, result);
                    });
                });
            }
        },  (err, response) => {
            if (err) {
                logException(err);
            }
            return res.json({ error: err, data: response.data });
        });
    });
};
