var zmq 	= require( 'zmq' ),
	colors  = require( 'colors' )

var receiver = zmq.socket( 'pull' )

var i = 0

receiver.on('message', function( buff ){
	if( i == 0 ) {
		console.time( 'sink' )
	}

	i++

	var message = parseFloat( buff.toString('utf8') )

	console.log( "[GATHER:] " + (""+message).blue )

	if( i == 40 ) {
		i = 0
		console.timeEnd( 'sink' )
	}
})

console.log( '[SINK:] GATHERING -'.blue)

receiver.bindSync("tcp://*:3001");