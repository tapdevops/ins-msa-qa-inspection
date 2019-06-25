/*
 |--------------------------------------------------------------------------
 | App Setup
 |--------------------------------------------------------------------------
 |
 | Untuk menghandle models, libraries, helper, node modules, dan lain-lain
 |
 */
 	// Models
 	const InspectionGenbaModel = require( _directory_base + '/app/v1.0/Http/Models/InspectionGenbaModel.js' );
	const InspectionHModel = require( _directory_base + '/app/v1.0/Http/Models/InspectionHModel.js' );

	// Modules
	const Validator = require( 'ferds-validator');

	// Libraries
 	const HelperLib = require( _directory_base + '/app/v1.0/Http/Libraries/HelperLib.js' );

/*
 |--------------------------------------------------------------------------
 | Versi 1.0.0
 |--------------------------------------------------------------------------
 */
 	/** 
 	  * Create
	  * Untuk menyimpan detail inspeksi yang diinputkan melalui mobile.
	  * --------------------------------------------------------------------
	*/
 	exports.create = async ( req, res ) => {

 		if ( !req.body.BLOCK_INSPECTION_CODE ) {
 			return res.status( 200 ).json( {
 				status: false,
	 			message: "BLOCK_INSPECTION_CODE tidak valid.",
	 			data: []
	 		} );
 		}

 		if ( !req.body.GENBA_USER ) {
 			return res.status( 200 ).json( {
 				status: false,
	 			message: "GENBA_USER tidak valid.",
	 			data: []
	 		} );
 		}

 		if ( req.body.GENBA_USER.length < 1 ) {
 			return res.status( 200 ).json( {
 				status: false,
	 			message: "GENBA_USER kosong.",
	 			data: []
	 		} );
 		}

 		var check_block_inspection_code = await InspectionHModel.findOne( {
 			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE
 		} ).count();

 		if ( check_block_inspection_code == 1 ) {
 			var insert_array = [];
 			req.body.GENBA_USER.forEach( function( data ) {
 				insert_array.push( {
 					BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
 					GENBA_USER: data
 				} );
 			} );
 			var insert_db = await InspectionGenbaModel.insertMany( insert_array );

 			if ( insert_db.length > 0 ) {
 				return res.send( {
					status: true,
					message: config.app.error_message.create_200,
					data: {}
				} );
 			}
 			else {
 				return res.send( {
					status: false,
					message: config.app.error_message.create_404 + ' - Log',
					data: {}
				} );
 			}
 		}
 		else {
 			return res.status( 200 ).json( {
 				status: false,
	 			message: "BLOCK_INSPECTION_CODE tidak ditemukan.",
	 			data: []
	 		} );
 		}

 		/*

		var run_validator = Validator.run( rules );
		console.log( run_validator.error_lists );

		if ( run_validator.status == false ) {
			res.json( {
				status: false,
				message: "Error! Periksa kembali inputan anda.",
				data: []
			} );
		}
		else {
			var auth = req.auth;
			const set = new InspectionDModel( {
				BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D,
				BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
				CONTENT_INSPECTION_CODE: req.body.CONTENT_INSPECTION_CODE,
				VALUE: req.body.VALUE,
				STATUS_SYNC: req.body.STATUS_SYNC,
				SYNC_TIME: HelperLib.date_format( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
				INSERT_USER: req.body.INSERT_USER,
				INSERT_TIME: HelperLib.date_format( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ),
				UPDATE_USER: req.body.INSERT_USER,
				UPDATE_TIME: HelperLib.date_format( 'now', 'YYYYMMDDhhmmss' ),
				DELETE_USER: "",
				DELETE_TIME: 0
			} );


			set.save()
			.then( data => {
				if ( !data ) {
					return res.send( {
						status: false,
						message: config.app.error_message.create_404,
						data: {}
					} );
				}

				const set_log = new InspectionDLogModel( {
					BLOCK_INSPECTION_CODE_D: req.body.BLOCK_INSPECTION_CODE_D,
					PROSES: 'INSERT',
					IMEI: auth.IMEI,
					SYNC_TIME: HelperLib.date_format( req.body.SYNC_TIME, 'YYYYMMDDhhmmss' ),
					INSERT_USER: req.body.INSERT_USER,
					INSERT_TIME: HelperLib.date_format( req.body.INSERT_TIME, 'YYYYMMDDhhmmss' ),
				} );

				set_log.save()
				.then( data_log => {
					if ( !data_log ) {
						return res.send( {
							status: false,
							message: config.app.error_message.create_404 + ' - Log',
							data: {}
						} );
					}
					res.send( {
						status: true,
						message: config.app.error_message.create_200,
						data: {}
					} );
				} ).catch( err => {
					res.send( {
						status: false,
						message: config.app.error_message.create_500 + ' - 2',
						data: {}
					} );
				} );
			} ).catch( err => {
				res.status( 500 ).send( {
					status: false,
					message: config.app.error_message.create_500 + ' - 2',
					data: {}
				} );
			} );
		}
		*/
	};