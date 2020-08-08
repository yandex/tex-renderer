module.exports = {
    serverPort: process.env.PORT || 3000,
    isProduction: process.env.NODE_ENV === 'production',
};
