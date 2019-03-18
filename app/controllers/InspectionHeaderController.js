/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const InspectionHModel = require( _directory_base + '/app/models/InspectionHModel.js' );
	const InspectionHLogModel = require( _directory_base + '/app/models/InspectionHLogModel.js' );

	// Libraries
	const config = require( _directory_base + '/config/config.js' );
	const date = require( _directory_base + '/app/libraries/date.js' );

/**
 * Find One
 * Mengambil data dengan parameter ID
 * --------------------------------------------------------------------------
 */
	exports.findOne = ( req, res ) => {

		var auth = req.auth;
		InspectionHModel.findOne( { 
			BLOCK_INSPECTION_CODE : req.params.id,
			DELETE_USER: ""
		} )

		.select( {
			_id: 0,
			__v: 0
		} )
		.then( data => {
			if( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.find_404 + ' - 2',
					data: {}
				} );
			}

			var rowdata = {
				BLOCK_INSPECTION_CODE: data.BLOCK_INSPECTION_CODE,
				WERKS: data.WERKS,
				AFD_CODE: data.AFD_CODE,
				BLOCK_CODE: data.BLOCK_CODE,
				AREAL: data.AREAL,
				INSPECTION_TYPE: data.INSPECTION_TYPE,
				INSPECTION_DATE: date.convert( data.INSPECTION_DATE, 'YYYY-MM-DD hh:mm:ss' ),
				INSPECTION_SCORE: data.INSPECTION_SCORE,
				INSPECTION_RESULT: data.INSPECTION_RESULT,
				STATUS_SYNC: data.STATUS_SYNC,
				SYNC_TIME: date.convert( data.SYNC_TIME, 'YYYY-MM-DD hh:mm:ss' ),
				START_INSPECTION: date.convert( data.START_INSPECTION, 'YYYY-MM-DD hh:mm:ss' ),
				END_INSPECTION: date.convert( data.END_INSPECTION, 'YYYY-MM-DD hh:mm:ss' ),
				LAT_START_INSPECTION: data.LAT_START_INSPECTION,
				LONG_START_INSPECTION: data.LONG_START_INSPECTION,
				LAT_END_INSPECTION: data.LAT_END_INSPECTION,
				LONG_END_INSPECTION: data.LONG_END_INSPECTION,
				INSERT_USER: data.INSERT_USER,
				INSERT_TIME: date.convert( data.INSERT_TIME, 'YYYY-MM-DD hh:mm:ss' ),
				UPDATE_USER: data.UPDATE_USER,
				INSERT_TIME: date.convert( data.INSERT_TIME, 'YYYY-MM-DD hh:mm:ss' ),
				DELETE_USER: data.DELETE_USER,
				DELETE_TIME: date.convert( data.DELETE_TIME, 'YYYY-MM-DD hh:mm:ss' )
			}

			res.send( {
				status: true,
				message: config.error_message.find_200,
				data: rowdata
			} );
		} ).catch( err => {
			if( err.kind === 'ObjectId' ) {
				return res.send({
					status: false,
					message: config.error_message.find_404 + ' - 1',
					data: {}
				});
			}
			return res.send({
				status: false,
				message: config.error_message.find_500,
				data: {}
			} );
		} );
	};

/**
 * Create
 * Untuk membuat dan menyimpan data baru
 * --------------------------------------------------------------------------
 */
	exports.create = ( req, res ) => {
		
		var auth = req.auth;
		const set_data = new InspectionHModel( {
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			WERKS: req.body.WERKS,
			AFD_CODE: req.body.AFD_CODE,
			BLOCK_CODE: req.body.BLOCK_CODE,
			AREAL: req.body.AREAL,
			INSPECTION_TYPE: req.body.INSPECTION_TYPE,
			INSPECTION_DATE: date.convert( req.body.INSPECTION_DATE, 'YYYYMMDDhhmmss' ),
			INSPECTION_SCORE: parseFloat( req.body.INSPECTION_SCORE ) || 0,
			INSPECTION_RESULT: req.body.INSPECTION_RESULT,
			STATUS_SYNC: req.body.STATUS_SYNC,
			SYNC_TIME: date.convert( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
			START_INSPECTION: date.convert( req.body.START_INSPECTION, 'YYYYMMDDhhmmss' ),
			END_INSPECTION: date.convert( req.body.END_INSPECTION, 'YYYYMMDDhhmmss' ),
			LAT_START_INSPECTION: req.body.LAT_START_INSPECTION,
			LONG_START_INSPECTION: req.body.LONG_START_INSPECTION,
			LAT_END_INSPECTION: req.body.LAT_END_INSPECTION,
			LONG_END_INSPECTION: req.body.LONG_END_INSPECTION,
			//ASSIGN_TO: req.body.ASSIGN_TO,
			INSERT_USER: req.body.INSERT_USER,
			INSERT_TIME: date.convert( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ),
			UPDATE_USER: req.body.INSERT_USER,
			UPDATE_TIME: date.convert( 'now', 'YYYYMMDDhhmmss' ),
			DELETE_USER: "",
			DELETE_TIME: 0
		} );

		set_data.save()
		.then( data => {
			if ( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.create_404,
					data: {}
				} );
			}

			// Insert Block Inspection H Log
			const set_log = new InspectionHLogModel( {
				BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
				PROSES: 'INSERT',
				IMEI: auth.IMEI,
				SYNC_TIME: new Date().getTime(),
				INSERT_USER: req.body.INSERT_USER,
				INSERT_TIME: date.convert( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ),
			} );

			set_log.save()
			.then( data_log => {
				if ( !data_log ) {
					return res.send( {
						status: false,
						message: config.error_message.create_404 + ' - Log',
						data: {}
					} );
				}
				res.send( {
					status: true,
					message: config.error_message.create_200,
					data: {},
					BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE
				} );
			} ).catch( err => {
				res.send( {
					status: false,
					message: config.error_message.create_500 + ' - 2',
					data: {}
				} );
			} );
		} ).catch( err => {
			res.send( {
				status: false,
				message: config.error_message.create_500 + ' - 2',
				data: {}
			} );
		} );
		
	};

/**
 * Find All
 * Untuk menampilkan seluruh data tanpa batasan REFFERENCE_ROLE dan LOCATION_CODE
 * --------------------------------------------------------------------------
 */
	exports.findAll = ( req, res ) => {

		var url_query = req.query;
		var url_query_length = Object.keys( url_query ).length;
		var query = {};
			query.DELETE_USER = "";

		if ( req.query.WERKS ) {
			var length_werks = String( req.query.WERKS ).length;

			if ( length_werks < 4 ) {
				query.WERKS = new RegExp( '^' + req.query.WERKS );
			}
			else {
				query.WERKS = req.query.WERKS;
			}
		}

		if ( req.query.AFD_CODE ) {
			query.AFD_CODE = req.query.AFD_CODE;
		}

		if ( req.query.BLOCK_CODE ) {
			query.BLOCK_CODE = req.query.BLOCK_CODE;
		}

		InspectionHModel.find(
			query 
		)
		.select( {
			_id: 0,
			__v: 0
		} )
		.then( data => {
			if( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.find_404,
					data: {}
				} );
			}
			
			var results = [];
			data.forEach( function( result ) {
				results.push( {
					BLOCK_INSPECTION_CODE: result.BLOCK_INSPECTION_CODE,
					WERKS: result.WERKS,
					AFD_CODE: result.AFD_CODE,
					BLOCK_CODE: result.BLOCK_CODE,
					AREAL: result.AREAL,
					INSPECTION_TYPE: result.INSPECTION_TYPE,
					INSPECTION_DATE: date.convert( String( result.INSPECTION_DATE ), 'YYYY-MM-DD hh-mm-ss' ),
					INSPECTION_SCORE: result.INSPECTION_SCORE,
					INSPECTION_RESULT: result.INSPECTION_RESULT,
					STATUS_SYNC: result.STATUS_SYNC,
					SYNC_TIME: date.convert( String( result.SYNC_TIME ) , 'YYYY-MM-DD hh-mm-ss' ),
					START_INSPECTION: date.convert( String( result.START_INSPECTION ) , 'YYYY-MM-DD hh-mm-ss' ),
					END_INSPECTION: date.convert(  String( result.END_INSPECTION ), 'YYYY-MM-DD hh-mm-ss' ),
					LAT_START_INSPECTION: result.LAT_START_INSPECTION,
					LONG_START_INSPECTION: result.LONG_START_INSPECTION,
					LAT_END_INSPECTION: result.LAT_END_INSPECTION,
					LONG_END_INSPECTION: result.LONG_END_INSPECTION,
					//ASSIGN_TO: result.ASSIGN_TO,
					INSERT_USER: result.INSERT_USER,
					INSERT_TIME: date.convert( String( result.INSERT_TIME ), 'YYYY-MM-DD hh-mm-ss' ),
					UPDATE_USER: result.UPDATE_USER,
					UPDATE_TIME: date.convert( String( result.UPDATE_TIME ), 'YYYY-MM-DD hh-mm-ss' ),
					DELETE_USER: result.DELETE_USER,
					DELETE_TIME: date.convert( String( result.DELETE_TIME ), 'YYYY-MM-DD hh-mm-ss' ),
				} );
			} );
			
			res.send( {
				status: true,
				message: config.error_message.find_200,
				data: results
			} );
		} ).catch( err => {
			res.send( {
				status: false,
				message: config.error_message.find_500,
				data: {}
			} );
		} );

	};