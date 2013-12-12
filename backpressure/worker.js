var zmq = require( 'zmq' )

var receiver = zmq.socket( 'pull' )

function fibonacci( n ){
    if( n < 1 ) return 0 
    else if( n == 1 || n == 2 ) return 1
    else if( n > 2 ) return fibonacci( n - 1 ) + fibonacci( n - 2 )
}

receiver.on( 'message', function( buff ) {
	fibonacci( 38 )
	console.log( buff.toString('utf8') )
})

receiver.connect( 'tcp://localhost:3000' )

