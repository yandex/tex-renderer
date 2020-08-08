const express = require('express');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const { serverPort } = require('./config');
const { processHandler } = require('./handlers');
const { loggerMiddleware, perfLoggerMiddleware } = require('./middlewares/log');

const startTexRenderer = (options = {}) => {
    const app = express();

    const logger = options.logger || console;

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(loggerMiddleware(logger), perfLoggerMiddleware);

    // оборачиваем чтобы асинхронная функция не сломала всё в случае ошибки
    // особенность использования async функций в express
    const asyncProcessHandler = asyncHandler(processHandler);

    app.get('/process', asyncProcessHandler);

    app.listen(serverPort, '::', () => {
        logger.info(`App listening on port ${serverPort}`);
    });

    return app;
};


module.exports = startTexRenderer;
