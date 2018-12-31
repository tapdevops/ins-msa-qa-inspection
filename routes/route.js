const jwt = require( 'jsonwebtoken' );
const config = require( '../config/config.js' );
const uuid = require( 'uuid' );
const nJwt = require( 'njwt' );
const jwtDecode = require( 'jwt-decode' );

function token_verify( req, res, next ) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];

	if ( typeof bearerHeader !== 'undefined' ) {
		const bearer = bearerHeader.split( ' ' );
		const bearer_token = bearer[1];

		req.token = bearer_token;

		nJwt.verify( bearer_token, config.secret_key, config.token_algorithm, ( err, authData ) => {
			if ( err ) {
				res.send({
					status: false,
					message: "Invalid Token",
					data: []
				} );
			}
			else {
				req.auth = jwtDecode( req.token );
				req.auth.LOCATION_CODE_GROUP = req.auth.LOCATION_CODE.split( ',' );
				req.config = config;
				next();
			}
		} );
		
	}
	else {
		// Forbidden
		res.sendStatus( 403 );
	}
}

function verifyToken( req, res, next ) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];

	if ( typeof bearerHeader !== 'undefined' ) {
		const bearer = bearerHeader.split( ' ' );
		const bearerToken = bearer[1];

		req.token = bearerToken;
		next();
	}
	else {
		// Forbidden
		res.sendStatus( 403 );
	}
}

module.exports = ( app ) => {

	// Declare Controllers
	const inspection = require( '../app/controllers/inspection.js' );

	// Routing: Inspection
	app.post( '/inspection-header', token_verify, inspection.createH );
	//app.get( '/inspection-header', verifyToken, inspection.findH );
	app.get( '/inspection-header/:id', verifyToken, inspection.findOneH );
	//app.put( '/inspection-header/:id', verifyToken, inspection.updateH );
	//app.delete( '/inspection-header/:id', verifyToken, inspection.deleteH );
	app.post( '/inspection-detail', token_verify, inspection.createD );
	//app.get( '/inspection-detail', verifyToken, inspection.findD );
	//app.get( '/inspection-detail/:id', verifyToken, inspection.findOneD );
	//app.put( '/inspection-detail/:id', verifyToken, inspection.updateD );
	//app.delete( '/inspection-detail/:id', verifyToken, inspection.deleteD );

	app.post( '/inspection-tracking', token_verify, inspection.createTracking );
}