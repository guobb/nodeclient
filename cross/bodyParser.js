/**
 * Created by apple on 17/2/18.
 */
module.exports = function parseBody(req, callback) {

    let result = '';

    req.on('data', (data) => {
        result += data;
    });

    req.on('end', () => {
        callback(result);
    })

};