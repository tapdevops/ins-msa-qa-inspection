/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const ViewInspectionModel = require( _directory_base + '/app/models/ViewInspectionModel.js' );

	// Libraries
	const config = require( _directory_base + '/config/config.js' );
	const date = require( _directory_base + '/app/libraries/date.js' );

/**
 * findAll
 * Untuk menampilkan seluruh data tanpa batasan REFFERENCE_ROLE dan LOCATION_CODE
 * --------------------------------------------------------------------------
 */
 	exports.find = async ( req, res ) => {
 		var url_query = req.query;
		var url_query_length = Object.keys( url_query ).length;
		var query = {};
			query.DELETE_USER = "";

		// Find By Region Code
		if ( req.query.REGION_CODE && !req.query.COMP_CODE ) {
			console.log( 'Find By Region Code' );
			var results = await ViewInspectionModel.find( {
				WERKS: new RegExp( '^' + req.query.REGION_CODE.substr( 1, 2 ) ),
				INSPECTION_DATE: {
					$gte: Number( req.query.START_DATE ),
					$lte: Number( req.query.END_DATE )
				}
			} );
		}

		// Find By Comp Code
		if ( req.query.COMP_CODE && !req.query.WERKS ) {
			console.log( 'Find By Comp Code' );
			var results = await ViewInspectionModel.find( {
				WERKS: new RegExp( '^' + req.query.COMP_CODE.substr( 0, 2 ) ),
				INSPECTION_DATE: {
					$gte: Number( req.query.START_DATE ),
					$lte: Number( req.query.END_DATE )
				}
			} );
		}

		// Find By BA Code / WERKS
		if ( req.query.WERKS && !req.query.AFD_CODE ) {
			console.log( 'Find By BA Code / WERKS' );
			var results = await ViewInspectionModel.find( {
				WERKS: new RegExp( '^' + req.query.WERKS.substr( 0, 4 ) ),
				INSPECTION_DATE: {
					$gte: Number( req.query.START_DATE ),
					$lte: Number( req.query.END_DATE )
				}
			} );
		}

		// Find By AFD Code
		if ( req.query.AFD_CODE && req.query.WERKS && !req.query.BLOCK_CODE ) {
			console.log( 'Find By AFD Code' );
			var results = await ViewInspectionModel.find( {
				WERKS: req.query.WERKS,
				AFD_CODE: req.query.AFD_CODE,
				INSPECTION_DATE: {
					$gte: Number( req.query.START_DATE ),
					$lte: Number( req.query.END_DATE )
				}
			} );
		}

		// Find By Block Code
		if ( req.query.BLOCK_CODE && req.query.AFD_CODE && req.query.WERKS ) {
			console.log( 'Find By Block Code' );
			var results = await ViewInspectionModel.find( {
				WERKS: req.query.WERKS,
				AFD_CODE: req.query.AFD_CODE,
				BLOCK_CODE: req.query.BLOCK_CODE,
				INSPECTION_DATE: {
					$gte: Number( req.query.START_DATE ),
					$lte: Number( req.query.END_DATE )
				}
			} );
		}

		if ( results.length > 0 ) {
			res.send( {
				status: true,
				message: config.error_message.find_200,
				data: results
			} );
		}
		else {
			return res.send( {
				status: true,
				message: config.error_message.find_200,
				data: {}
			} );
		}
 	}