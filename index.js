const EventEmitter = require('events');

const myEmitter = new EventEmitter();



const asyncAction = (a) => new Promise((resolve, reject) => {
  setTimeout(() => { console.log('asyncAction returns:', a);
                     resolve(a);
                   }, 200);
})

// asyncAction('yay')

let promiseLock = new Promise.resolve();

const getAsyncData = (a) => asyncAction(a).then((aa) => console.log('getAsyncData returns', aa))

myEmitter.on('event', (a, b) => {
  console.log(a, b, this);
  // Prints: a b {}
});


myEmitter.emit('event', 'a', 'b');
