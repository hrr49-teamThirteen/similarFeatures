const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1', {
  db: 0,
  enableReadyCheck: true,
  showFriendlyErrorStack: true,
});

const connect = function() {
  return new Promise((resolve, reject) => {
    redis.on('connect', () => {
      console.log('Redis Connected');
      resolve('connected');
    });
    redis.on('error', () => {
      console.log('Redis Connection Error');
      reject('connected error');
    });
  });
};
connect();

const getGroup = (key) => {
  return redis.get(key)
    .then(result => {
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};

const setGroup = (key, obj) => {
  return redis.set(key, JSON.stringify(obj));
};

module.exports = {
  getGroup,
  setGroup
};

