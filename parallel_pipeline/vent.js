var zmq 	= require( 'zmq' ),
	colors  = require( 'colors' )

var vent = zmq.socket( 'push' )

vent.bindSync( 'tcp://*:3000' )

var i = 0

function ventWork() {
	while(i < 40) {
		i++
		console.log( "[SEND:] " + ("fib("+i+")").green )
		vent.send( i )
	}
	console.log('work sendt\nclosing vent')
	vent.close()
	process.exit()
}


console.log("press a key push work to workers..\n".green)
process.stdin.on( 'data', ventWork )