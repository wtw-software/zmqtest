var zmq     = require( 'zmq' ),
	  cluster = require( 'cluster' ),
    colors  = require( 'colors' )


var concurrency = process.argv[2]


if( cluster.isMaster ) {
	for (var i = 0; i < concurrency; i++) {
		cluster.fork()
	}
}	
else {

	var receiver = zmq.socket( 'pull' ),
		  sender   = zmq.socket( 'push' )


	function fibonacci( n ){
	    if( n < 1 ) return 0 
	    else if( n == 1 || n == 2 ) return 1
	    else if( n > 2 ) return fibonacci( n - 1 ) + fibonacci( n - 2 )
	}

	receiver.on( 'message', function( buff ){
		var message = parseFloat( buff.toString('utf8') )
		var fib = fibonacci( message )
		process.nextTick(function() {
			console.log( "[PROCESS: " + process.pid + "] " + ("fib("+message+") == " + fib).yellow )
			sender.send( fib )	
		})
	})

  console.log( '[WORKER: ' + process.pid + '] STARTED -'.yellow)
	receiver.connect( 'tcp://localhost:3000' )
	sender.connect( 'tcp://localhost:3001' )

}
