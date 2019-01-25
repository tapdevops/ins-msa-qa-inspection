/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const viewInspectionModel = require( '../models/viewInspection.js' );
	const inspectionHModel = require( '../models/inspectionH.js' );
	const inspectionLogHModel = require( '../models/inspectionHLog.js' );
	const inspectionDModel = require( '../models/inspectionD.js' );
	const inspectionLogDModel = require( '../models/inspectionDLog.js' );
	const inspectionTrackingModel = require( '../models/inspectionTracking.js' );

	// Node Modules
	const querystring = require( 'querystring' );
	const url = require( 'url' );
	const jwt = require( 'jsonwebtoken' );
	const uuid = require( 'uuid' );
	const nJwt = require( 'njwt' );
	const jwtDecode = require( 'jwt-decode' );
	const Client = require( 'node-rest-client' ).Client; 
	const moment_pure = require( 'moment' );
	const moment = require( 'moment-timezone' );

	// Libraries
	const config = require( '../../config/config.js' );
	const date = require( '../libraries/date.js' );
	const randomTextLib = require( '../libraries/randomText' );

/**
 * findAll
 * Untuk menampilkan seluruh data tanpa batasan REFFERENCE_ROLE dan LOCATION_CODE
 * --------------------------------------------------------------------------
 */
	exports.findHAll = ( req, res ) => {

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
		

		/*
		DELETE_USER: "",
				WERKS: query_search,
				//ASSIGN_TO: auth.USER_AUTH_CODE,
				$and: [
					{
						$or: [
							{
								INSERT_TIME: {
									$gte: start_date,
									$lte: end_date
								}
							}
						]
					}
				]
				*/
		console.log(query);


		inspectionHModel.find(
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

/**
 * createH
 * Untuk membuat dan menyimpan Inspeksi Header
 * --------------------------------------------------------------------------
 */
	exports.createH = ( req, res ) => {
		
		var auth = req.auth;
		const set_data = new inspectionHModel( {
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			WERKS: req.body.WERKS,
			AFD_CODE: req.body.AFD_CODE,
			BLOCK_CODE: req.body.BLOCK_CODE,
			AREAL: req.body.AREAL,
			INSPECTION_TYPE: date.convert( req.body.INSPECTION_TYPE, 'YYYYMMDDhhmmss' ),
			INSPECTION_DATE: date.convert( req.body.INSPECTION_DATE, 'YYYYMMDDhhmmss' ),
			INSPECTION_SCORE: req.body.INSPECTION_SCORE,
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
			const set_log = new inspectionLogHModel( {
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
 * findOneH
 * Mengambil data dengan parameter ID
 * --------------------------------------------------------------------------
 */
exports.findOneH = ( req, res ) => {

	var auth = req.auth;
	inspectionHModel.findOne( { 
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
		res.send( {
			status: true,
			message: config.error_message.find_200,
			data: data
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
 * createD
 * Untuk membuat dan menyimpan Inspeksi Detail
 * --------------------------------------------------------------------------
 */
	exports.createD = ( req, res ) => {

		var auth = req.auth;
		const set = new inspectionDModel( {
			BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D,
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			CONTENT_INSPECTION_CODE: req.body.CONTENT_INSPECTION_CODE,
			VALUE: req.body.VALUE,
			STATUS_SYNC: req.body.STATUS_SYNC,
			SYNC_TIME: date.convert( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
			INSERT_USER: req.body.INSERT_USER,
			INSERT_TIME: date.convert( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ),
			UPDATE_USER: req.body.INSERT_USER,
			UPDATE_TIME: date.convert( 'now', 'YYYYMMDDhhmmss' ),
			DELETE_USER: "",
			DELETE_TIME: 0
		} );


		set.save()
		.then( data => {
			if ( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.create_404,
					data: {}
				} );
			}

			const set_log = new inspectionLogDModel( {
				BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D,
				PROSES: 'INSERT',
				IMEI: auth.IMEI,
				SYNC_TIME: date.convert( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
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
					data: {}
				} );
			} ).catch( err => {
				res.send( {
					status: false,
					message: config.error_message.create_500 + ' - 2',
					data: {}
				} );
			} );
		} ).catch( err => {
			res.status( 500 ).send( {
				status: false,
				message: config.error_message.create_500 + ' - 2',
				data: {}
			} );
		} );
		
	};

/**
 * createTracking
 * Untuk membuat dan menyimpan Tracking Inspeksi
 * --------------------------------------------------------------------------
 */
	exports.createTracking = ( req, res ) => {
		
		var auth = req.auth;
		const set = new inspectionTrackingModel( {
			TRACK_INSPECTION_CODE: req.body.TRACK_INSPECTION_CODE || "",
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE || "",
			DATE_TRACK: date.convert( req.body.DATE_TRACK, 'YYYYMMDDhhmmss' ),
			LAT_TRACK: req.body.LAT_TRACK || "",
			LONG_TRACK: req.body.LONG_TRACK || "",
			SYNC_TIME: date.convert( 'now', 'YYYYMMDDhhmmss' ),
			INSERT_USER: req.body.INSERT_USER || "",
			INSERT_TIME: date.convert( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ) || 0,
			UPDATE_USER: "",
			UPDATE_TIME: 0,
			DELETE_USER: "",
			DELETE_TIME: 0
		} );

		set.save()
		.then( data => {
			if ( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.create_404,
					data: {}
				} );
			}
			res.send( {
				status: true,
				message: config.error_message.create_200,
				data: {}
			} );

		} ).catch( err => {
			res.send( {
				status: false,
				message: config.error_message.create_500,
				data: {}
			} );
		} );
		
	};

/**
 * findAll
 * Untuk menampilkan seluruh data tanpa batasan REFFERENCE_ROLE dan LOCATION_CODE
 * --------------------------------------------------------------------------
 */
 	exports.findReport = async ( req, res ) => {
 		var url_query = req.query;
		var url_query_length = Object.keys( url_query ).length;
		var query = {};
			query.DELETE_USER = "";

		if ( req.query.REGION_CODE ) {
			query.WERKS = new RegExp( '^' + req.query.REGION_CODE.substr( 1, 1 ) );
			//query.WERKS = new RegExp( '^' + req.query.WERKS );
		}

		if ( req.query.COMP_CODE ) {
			query.WERKS = new RegExp( '^' + req.query.COMP_CODE );
		}

		if ( req.query.WERKS ) {
			/*
			var length_werks = String( req.query.WERKS ).length;

			if ( length_werks < 4 ) {
				query.WERKS = new RegExp( '^' + req.query.WERKS );
			}
			else if ( length_werks == 4 ) {
				query.WERKS = req.query.WERKS;
			}
			else if ( length_werks > 4 ) {
				query.WERKS = req.query.WERKS.substr( 0, 4 );
			}
			*/
			query.WERKS = req.query.WERKS;
		}

		if ( req.query.AFD_CODE ) {
			query.AFD_CODE = req.query.AFD_CODE;
		}

		if ( req.query.BLOCK_CODE ) {
			query.BLOCK_CODE = req.query.BLOCK_CODE;
		}

		//query.INSPECTION_DATE = {
		//	$gte: req.query.START_DATE,
		//	$lte: req.query.END_DATE,
		//}

		var results = await viewInspectionModel.find( {
	 		WERKS: req.query.WERKS,
	 		AFD_CODE: req.query.AFD_CODE,
	 		BLOCK_CODE: req.query.BLOCK_CODE,
	 		INSPECTION_DATE: {
	 			$gte: Number( req.query.START_DATE ),
	 			$lte: Number( req.query.END_DATE )
	 		}
	 	} );

		if ( results.length > 0 ) {
			res.send( {
				status: true,
				message: config.error_message.find_200,
				data: results
			} );
		}
		else {
			return res.send( {
				status: false,
				message: config.error_message.find_404,
				data: {}
			} );
		}
		/*
 		viewInspectionModel.find( 
	 		{
	 			WERKS: '4121',
	 			AFD_CODE: 'A',
	 			BLOCK_CODE: '002',
	 			INSPECTION_DATE: {
	 				$gte: Number( req.query.START_DATE ),
	 				$lte: Number( req.query.END_DATE )
	 			}
	 		}
 			//query,
 			//{
 			//	$and: [
 			//		{
 			//			INSPECTION_DATE: '20190101123221'
 			//		}
 			//	]
 			//}
 		 )
		.then( data => {
			if( !data ) {
				return res.send( {
					status: false,
					message: config.error_message.find_404,
					data: {}
				} );
			}
			res.send( {
				status: true,
				message: config.error_message.find_200,
				data: data
			} );
		} ).catch( err => {
			res.send( {
				status: false,
				message: config.error_message.find_500,
				data: {}
			} );
		} );
		*/
 	}

	exports.findReport2 = ( req, res ) => {

		var url_query = req.query;
		var url_query_length = Object.keys( url_query ).length;
		var query = {};
			query.DELETE_USER = "";

		if ( req.query.REGION_CODE ) {
			query.WERKS = new RegExp( '^' + req.query.REGION_CODE.substr( 1, 1 ) );
			//query.WERKS = new RegExp( '^' + req.query.WERKS );
		}

		if ( req.query.COMP_CODE ) {
			query.WERKS = new RegExp( '^' + req.query.COMP_CODE );
		}

		if ( req.query.WERKS ) {
			/*
			var length_werks = String( req.query.WERKS ).length;

			if ( length_werks < 4 ) {
				query.WERKS = new RegExp( '^' + req.query.WERKS );
			}
			else if ( length_werks == 4 ) {
				query.WERKS = req.query.WERKS;
			}
			else if ( length_werks > 4 ) {
				query.WERKS = req.query.WERKS.substr( 0, 4 );
			}
			*/
			query.WERKS = req.query.WERKS;
		}

		if ( req.query.AFD_CODE ) {
			query.AFD_CODE = req.query.AFD_CODE;
		}

		if ( req.query.BLOCK_CODE ) {
			query.BLOCK_CODE = req.query.BLOCK_CODE;
		}

		console.log( query );
		

		/*
		DELETE_USER: "",
		WERKS: query_search,
		//ASSIGN_TO: auth.USER_AUTH_CODE,
		$and: [
			{
				$or: [
					{
						INSERT_TIME: {
							$gte: start_date,
							$lte: end_date
						}
					}
				]
			}
		]
		*/
		console.log(query);


		inspectionHModel.find(
			query
		//{
		//	WEKRS: ''
		//	INSPECTION_DATE: {
		//		$gte: req.query.START_DATE,
		//		$lte: req.query.END_DATE
		//	}
		//}
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