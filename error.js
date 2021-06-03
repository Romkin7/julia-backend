const log = require('../util/log');

function errorHandler(error, request, response, next) {
    log(error);
    return response.status(error.status || 500).json({
        error: {
            message: error.message || 'Oops! Something went badly wrong!',
        },
    });
}
module.exports = errorHandler;
