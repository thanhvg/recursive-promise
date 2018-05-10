// fn return promise
module.exports =  singletonAsync = (fn) => {
  let running = false;
  let myFn = null;

  return (...args) => {
    if (running) {
      myFn = myFn.then(() => fn(...args));
      return myFn;
    }
    running = true;
    myFn = fn(...args);
    return myFn.then(result => { running = false; return Promise.resolve(result)})
  }
};

