module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/cryptic-hunt-portal',
    REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
    PORT: process.env.PORT || 3000,
};