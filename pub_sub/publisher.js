var zmq = require('zmq')

var publisher = zmq.socket( 'pub' )

publisher.bindSync( 'tcp://*:3000' )

var messages = ['Hei', 'nananana', 'Batman!', 'lol']

function rant( message ) {
	if(!message)
		process.exit()
    
    console.log( 'PUB:', message )
	publisher.send( message )

	setTimeout( rant.bind(0, messages.shift()), 500 )
}

// wont work because of connection delay
// rant( messages.shift() )

setTimeout( rant.bind(0, messages.shift()), 500 )

