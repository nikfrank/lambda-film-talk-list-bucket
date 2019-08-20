const bucketLister = require('./');

bucketLister.handler({}, {
  fail: err => console.error(err),
  succeed: items=> console.log('success!', items),
});
