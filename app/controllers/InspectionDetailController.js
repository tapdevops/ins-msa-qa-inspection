/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
	const InspectionDModel = require( _directory_base + '/app/models/InspectionDModel.js' );
	const InspectionDLogModel = require( _directory_base + '/app/models/InspectionDLogModel.js' );

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
		InspectionDModel.findOne( { 
			BLOCK_INSPECTION_CODE_D : req.params.id,
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
 * Create
 * Untuk membuat dan menyimpan data baru
 * --------------------------------------------------------------------------
 */
	exports.create = ( req, res ) => {

		var auth = req.auth;
		const set = new InspectionDModel( {
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

			const set_log = new InspectionDLogModel( {
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