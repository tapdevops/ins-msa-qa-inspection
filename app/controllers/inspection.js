/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
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
			INSPECTION_DATE: date.convert( req.body.INSPECTION_DATE, 'YYYYMMDDhhmmss' ),
			INSPECTION_RESULT: req.body.INSPECTION_RESULT,
			STATUS_SYNC: req.body.STATUS_SYNC,
			SYNC_TIME: date.convert( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
			START_INSPECTION: date.convert( req.body.START_INSPECTION, 'YYYYMMDDhhmmss' ),
			END_INSPECTION: date.convert( req.body.END_INSPECTION, 'YYYYMMDDhhmmss' ),
			LAT_START_INSPECTION: req.body.LAT_START_INSPECTION,
			LONG_START_INSPECTION: req.body.LONG_START_INSPECTION,
			LAT_END_INSPECTION: req.body.LAT_END_INSPECTION,
			LONG_END_INSPECTION: req.body.LONG_END_INSPECTION,
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
			CONTENT_CODE: req.body.CONTENT_CODE,
			AREAL: req.body.AREAL,
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
			SYNC_TIME: date.convert( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
			INSERT_USER: auth.USER_AUTH_CODE,
			INSERT_TIME: date.convert( 'now', 'YYYYMMDDhhmmss' ),
			UPDATE_USER: auth.USER_AUTH_CODE,
			UPDATE_TIME: date.convert( 'now', 'YYYYMMDDhhmmss' )
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