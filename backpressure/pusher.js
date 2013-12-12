var zmq = require( 'zmq' )

var vent = zmq.socket( 'push' )

vent.bindSync( 'tcp://*:3000' )

var i = 0

function pushWork() {
	i++
	vent.send( "message " + i )
	setTimeout( pushWork, 10 )
	if( i == 40 ) {
		vent.close()
		process.exit()
	}
}

setTimeout( pushWork, 0 )