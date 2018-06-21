const singletonAsync = require('./singleton-async.js');
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const asyncAction = (a) => new Promise((resolve, reject) => {
  setTimeout(() => { console.log('asyncAction returns:', a);
                     resolve(a);
                   }, 1000);
})

const getAsyncData = (a) =>  asyncAction(a).then((aa) => console.log('getAsyncData returns', aa)).catch(() => console.log('error'))
// const getAsyncData = (a) =>  asyncAction(a)


myEmitter.on('event', singletonAsync(getAsyncData));

myEmitter.emit('event', 'a');
myEmitter.emit('event', 'b');
myEmitter.emit('event', 'c');

myEmitter.emit('event', 'a1');
myEmitter.emit('event', 'b1');
myEmitter.emit('event', 'c1');
setTimeout(() => myEmitter.emit('event', 'd'), 1001)
setTimeout(() => myEmitter.emit('event', 'e'), 2000)

setTimeout(() => myEmitter.emit('event', 'f'), 3000)
