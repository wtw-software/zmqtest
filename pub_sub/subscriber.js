
var zmq = require( 'zmq' )

var subscriber = zmq.socket( 'sub' )

var messages = []

subscriber.subscribe("")
subscriber.on('message', function( data ) {
	messages.push( "message" )
	console.log( messages.length )
})

subscriber.connect("tcp://localhost:3000");
