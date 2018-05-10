const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const asyncAction = (a) => new Promise((resolve, reject) => {
  setTimeout(() => { console.log('asyncAction returns:', a);
                     resolve(a);
                   }, 1000);
})

// asyncAction('yay')

let promiseLock = Promise.resolve();

const instantLock = () => {
};

// assign in then clause is not instant because then
const getAsyncData = (a) => promiseLock.then(() => { promiseLock = asyncAction(a).then((aa) => console.log('getAsyncData returns', aa)); return promiseLock; })
// const getAsyncData = (a) => { promiseLock = asyncAction(a).then((aa) => console.log('getAsyncData returns', aa)); return promiseLock; }

myEmitter.on('event', getAsyncData);


myEmitter.emit('event', 'a');
myEmitter.emit('event', 'b');
myEmitter.emit('event', 'c');

setTimeout(() => myEmitter.emit('event', 'd'), 20)
setTimeout(() => myEmitter.emit('event', 'e'), 20)
