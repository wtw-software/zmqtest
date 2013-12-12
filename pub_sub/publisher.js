
var zmq = require('zmq')

var publisher = zmq.socket( 'pub' )

publisher.bindSync( "tcp://*:3000" )

setTimeout(function(){
  for (var i = 1; i <= 100; i++) {
    publisher.send( "message" )
  }
}, 300)


