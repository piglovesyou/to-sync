const { toSync } = require('../../dist');

const M = 1000;

async function myAsyncFn(n) {
  return n * M;
}

const mySyncFn = toSync(myAsyncFn);

module.exports = {myAsyncFn, mySyncFn}
