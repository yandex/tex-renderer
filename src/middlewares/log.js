const {
    performance,
} = require('perf_hooks');

const perfLog = (req, res) => () => {
    req.logger.info(
        '%s %s %d %ss',
        req.method,
        req.url,
        res.statusCode,
        ((performance.now() - req.time) / 1000).toFixed(3),
    );
}

module.exports = {
    loggerMiddleware: logger => (req, res, next) => {
        req.logger = logger;

        next();
    },

    perfLoggerMiddleware: (req, res, next) => {
        req.time = performance.now();

        const log = perfLog(req, res);

        res.on('finish', log);
        res.on('close', log);

        next();
    }
};
