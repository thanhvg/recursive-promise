// fn return promise
module.exports = function* gen() {
  let chain = Promise.resolve();
  while (true) {
    let a = yield chain;
    chain = chain.then(() => a())
  }
}

