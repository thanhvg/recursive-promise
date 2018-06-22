// fn return promise
module.exports = (fn) => {
  let myFn = null;
  let count = 0;

  return (...args) => {

    if (count > 0) {
      count = count + 1;
      myFn = myFn.then(() => {
        count = count - 1;
        return fn(...args);
      }).catch((error) => {
        console.log(count);
        count = 0;
        return Promise.reject(error);
      });
      return myFn;
    }

    count = count + 1;
    myFn = fn(...args);

    return myFn.then((result) => {
      count = count - 1;
      return Promise.resolve(result);
    }).catch((error) => {
      console.log(count);
      count = 0;
      return Promise.reject(error);
    });
  };
};

function* gen(fn) {
  let chain = Promise.resolve();
  while (true) {
    let a = yield chain;
    let chain = chain.then(() => a)
  }
}
