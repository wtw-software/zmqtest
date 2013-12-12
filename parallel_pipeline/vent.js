var zmq = require( 'zmq' )

var vent = zmq.socket( 'push' )

vent.bindSync( 'tcp://*:3000' )

var i = 0

function ventWork() {
	while(i < 40) {
		i++
		vent.send( 38 )
	}
	console.log('work sendt\nclosing vent')
	vent.close()
	process.exit()
}


console.log('press a key push work to workers..\n')
process.stdin.on( 'data', ventWork )