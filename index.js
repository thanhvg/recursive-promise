const singletonAsync = require('./singleton-async.js');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const asyncAction = (a) => new Promise((resolve, reject) => {
  setTimeout(() => { console.log('asyncAction returns:', a);
                     resolve(a);
                   }, 1000);
})

const getAsyncData = (a) =>  asyncAction(a).then((aa) => console.log('getAsyncData returns', aa));


myEmitter.on('event', singletonAsync(getAsyncData));

myEmitter.emit('event', 'a');
myEmitter.emit('event', 'b');
myEmitter.emit('event', 'c');

setTimeout(() => myEmitter.emit('event', 'd'), 20)
setTimeout(() => myEmitter.emit('event', 'e'), 20)
