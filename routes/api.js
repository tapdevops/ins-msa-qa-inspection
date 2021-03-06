/*
 |--------------------------------------------------------------------------
 | Setup
 |--------------------------------------------------------------------------
 */
	// Node Modules
	const RoutesVersioning = require( 'express-routes-versioning' )();

	// Controllers
	const Controllers = {
		v_1_0: {
			ExportController: require( _directory_base + '/app/v1.0/Http/Controllers/ExportController.js' ),
			InspectionDetailController: require( _directory_base + '/app/v1.0/Http/Controllers/InspectionDetailController.js' ),
			InspectionGenbaController: require( _directory_base + '/app/v1.0/Http/Controllers/InspectionGenbaController.js' ),
			InspectionHeaderController: require( _directory_base + '/app/v1.0/Http/Controllers/InspectionHeaderController.js' ),
			InspectionTrackingController: require( _directory_base + '/app/v1.0/Http/Controllers/InspectionTrackingController.js' ),
			InspectionReportController: require( _directory_base + '/app/v1.0/Http/Controllers/InspectionReportController.js' ),
			SummaryController: require( _directory_base + '/app/v1.0/Http/Controllers/SummaryController.js' ),
		}
	}

	// Middleware
	const Middleware = {
		v_1_0: {
			VerifyToken: require( _directory_base + '/app/v1.0/Http/Middleware/VerifyToken.js' )
		}
	}
	
/*
 |--------------------------------------------------------------------------
 | Routing
 |--------------------------------------------------------------------------
 */
	module.exports = ( app ) => {

		/*
		 |--------------------------------------------------------------------------
		 | Welcome Message
		 |--------------------------------------------------------------------------
		 */
			app.get( '/', ( req, res ) => {
				res.json( { 
					application: {
						name : config.app.name,
						env : config.app.env,
						port : config.app.port[config.app.env]
					} 
				} )
			} );

		/*
		 |--------------------------------------------------------------------------
		 | Versi 1.0
		 |--------------------------------------------------------------------------
		 */
		 	// Inspection Detail
			app.get( '/api/v1.0/detail/:id', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionDetailController.find_one );
			app.post( '/api/v1.0/detail', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionDetailController.create );
			
			// Inspection Header
		 	app.post( '/api/v1.0/genba',  Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionGenbaController.create );
			
			// Inspection Header
			app.get( '/api/v1.0/find',  Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionHeaderController.find );
		 	app.post( '/api/v1.0/header',  Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionHeaderController.create );
			app.get( '/api/v1.0/header/:id',  Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionHeaderController.find_one );
			
			// Inspection Tracking
			app.post( '/api/v1.0/tracking', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionTrackingController.create );
			
			// Inspection Report
			app.get( '/api/v1.0/report', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.InspectionReportController.find );

			// Summary
			app.get( '/api/v1.0/summary/total-inspeksi', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.SummaryController.total_inspeksi );
			app.get( '/api/v1.0/summary/total-jarak', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.SummaryController.total_jarak );
			
			// Export
			app.get( '/api/v1.0/export/premi/:first_date/:end_date', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.ExportController.premi );
			app.get( '/api/v1.0/export/tap-dw/tr-inspection/:first_date/:end_date', Middleware.v_1_0.VerifyToken, Controllers.v_1_0.ExportController.tap_dw_tr_inspection );
			
		/*
		 |--------------------------------------------------------------------------
		 | Old API
		 |--------------------------------------------------------------------------
		 */
			// Export
			app.get( '/export/premi/:first_date/:end_date', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.ExportController.premi
			} ) );

		 	// Inspection Detail
			app.get( '/inspection-detail/:id', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionDetailController.find_one
			} ) );

			app.post( '/inspection-detail', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionDetailController.create
			} ) );

			// Inspection Header
			app.get( '/inspection-find', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionHeaderController.find
			} ) );

		 	app.post( '/inspection-header', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionHeaderController.create
			} ) );
			
			app.get( '/inspection-header/:id', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionHeaderController.find_one
			} ) );

			// Inspection Tracking
			app.post( '/inspection-tracking', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionTrackingController.create
			} ) );

			// Inspection Report
			app.get( '/inspection-report/q', Middleware.v_1_0.VerifyToken, RoutesVersioning( {
				"1.0.0": Controllers.v_1_0.InspectionReportController.find
			} ) );

	}