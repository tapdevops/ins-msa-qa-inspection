module.exports = ( app ) => {

	// Declare Controllers
	const inspection = require( '../app/controllers/inspection.js' );

	// Routing: Inspection
	app.post( '/api/inspection', inspection.create );
	app.get( '/api/inspection', inspection.find );

}