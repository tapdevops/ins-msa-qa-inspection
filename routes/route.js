/*
|--------------------------------------------------------------------------
| Variable
|--------------------------------------------------------------------------
*/
	// Config
	const config = require( _directory_base + '/config/config.js' );

	// Node Modules
	const jwt = require( 'jsonwebtoken' );
	const uuid = require( 'uuid' );
	const nJwt = require( 'njwt' );
	const jwtDecode = require( 'jwt-decode' );

	// Declare Controllers
	const InspectionHeaderController = require( '../app/controllers/InspectionHeaderController.js' );
	const InspectionDetailController = require( '../app/controllers/InspectionDetailController.js' );
	const InspectionReportController = require( '../app/controllers/InspectionReportController.js' );
	const InspectionTrackingController = require( '../app/controllers/InspectionTrackingController.js' );
	
/*
|--------------------------------------------------------------------------
| Routing
|--------------------------------------------------------------------------
*/
	module.exports = ( app ) => {

		/*
		 |--------------------------------------------------------------------------
		 | Inspection Header
		 |--------------------------------------------------------------------------
		 */
		app.post( '/inspection-header', token_verify, InspectionHeaderController.create );
		app.get( '/inspection-header/all', token_verify, InspectionHeaderController.findAll );
		app.get( '/inspection-header/q', token_verify, InspectionHeaderController.findAll );
		app.get( '/inspection-header/:id', token_verify, InspectionHeaderController.findOne );

		/*
		 |--------------------------------------------------------------------------
		 | Inspection Detail
		 |--------------------------------------------------------------------------
		 */
		app.post( '/inspection-detail', token_verify, InspectionDetailController.create );
		app.get( '/inspection-detail/:id', token_verify, InspectionDetailController.findOne );

		/*
		 |--------------------------------------------------------------------------
		 | Inspection Tracking
		 |--------------------------------------------------------------------------
		 */
		app.post( '/inspection-tracking', token_verify, InspectionTrackingController.create );

		/*
		 |--------------------------------------------------------------------------
		 | Inspection Report
		 |--------------------------------------------------------------------------
		 */
		app.get( '/inspection-report/q', token_verify, InspectionReportController.find );
		app.get( '/inspection-report/all', token_verify, InspectionReportController.find );
	}

/*
|--------------------------------------------------------------------------
| Token Verify
|--------------------------------------------------------------------------
*/
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