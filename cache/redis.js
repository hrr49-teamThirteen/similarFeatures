const Redis = require('ioredis');
const redis = new Redis(6379, '127.0.0.1', {
  db: 0,
  enableReadyCheck: true,
  showFriendlyErrorStack: true,
});

redis.on('connect', () => {
  console.log('connected');
});
redis.on('error', (err) => {
  console.log(err);
});

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

