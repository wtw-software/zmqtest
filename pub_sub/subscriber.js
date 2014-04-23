var zmq = require( 'zmq' )


var subscriber = zmq.socket( 'sub' )


subscriber.on('message', function( data ) {
	console.log( 'SUB:', data.toString() )
})


console.log( '- SUBSCRIBING -' )
subscriber.subscribe( '' )
subscriber.connect("tcp://localhost:3000");
