var env = process.env.NODE_ENV || 'development';
if (global.describe && global.it) {
  env = 'test';
}

module.exports = env;
