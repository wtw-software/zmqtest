var zmq = require( 'zmq' )

var receiver = zmq.socket( 'pull' )

var i = 0

receiver.on('message', function( buff ){
	if( i == 0 ) {
		console.time( 'sink' )
	}

	i++

	var message = parseFloat( buff.toString('utf8') )

	console.log( i, message )

	if( i == 40 ) {
		i = 0
		console.timeEnd( 'sink' )
	}
})

receiver.bindSync("tcp://*:3001");