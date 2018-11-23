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
	app.post( '/inspection', verifyToken, inspection.create );

	app.post( '/inspection-header', verifyToken, inspection.createH );
	app.get( '/inspection-header', verifyToken, inspection.findH );
	app.get( '/inspection-header/:id', verifyToken, inspection.findOneH );
	app.put( '/inspection-header/:id', verifyToken, inspection.updateH );
	app.delete( '/inspection-header/:id', verifyToken, inspection.deleteH );
	app.post( '/inspection-detail', verifyToken, inspection.createD );
	app.get( '/inspection-detail', verifyToken, inspection.findD );
	app.get( '/inspection-detail/:id', verifyToken, inspection.findOneD );
	app.put( '/inspection-detail/:id', verifyToken, inspection.updateD );
	app.delete( '/inspection-detail/:id', verifyToken, inspection.deleteD );

	app.post( '/inspection-tracking', verifyToken, inspection.createTracking );
}