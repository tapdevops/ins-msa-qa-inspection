const inspectionHModel = require( '../models/inspectionH.js' );
const inspectionLogHModel = require( '../models/inspectionHLog.js' );
const inspectionDModel = require( '../models/inspectionD.js' );
const dateFormat = require( 'dateformat' );
var querystring = require('querystring');
const yyyymmdd = require( 'yyyy-mm-dd' );
var url = require( 'url' );

// Create and Save new Data
exports.create = ( req, res ) => {
	

	const inspectionH = new inspectionHModel( {
		BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
		WERKS: req.body.WERKS,
		AFD_CODE: req.body.AFD_CODE,
		BLOCK_CODE: req.body.BLOCK_CODE,
		INSPECTION_DATE: yyyymmdd.withTime( new Date( req.body.INSPECTION_DATE ) ) || "",
		INSPECTION_RESULT: req.body.INSPECTION_RESULT,
		STATUS_SYNC: req.body.STATUS_SYNC,
		SYNC_TIME: yyyymmdd.withTime( new Date( req.body.SYNC_TIME ) ) || "",
		START_INSPECTION: yyyymmdd.withTime( new Date( req.body.START_INSPECTION ) ) || "",
		END_INSPECTION: yyyymmdd.withTime( new Date( req.body.START_INSPECTION ) ) || "",
		LAT_START_INSPECTION: req.body.LAT_START_INSPECTION,
		LONG_START_INSPECTION: req.body.LONG_START_INSPECTION,
		LAT_END_INSPECTION: req.body.LAT_END_INSPECTION,
		LONG_END_INSPECTION: req.body.LONG_END_INSPECTION,
		INSERT_USER: req.body.INSERT_USER,
		INSERT_TIME: yyyymmdd.withTime( new Date( req.body.INSERT_TIME ) ) || "",
		UPDATE_USER: req.body.UPDATE_USER,
		UPDATE_TIME: yyyymmdd.withTime( new Date( req.body.UPDATE_TIME ) ) || "",
		DELETE_USER: req.body.DELETE_USER,
		DELETE_TIME: yyyymmdd.withTime( new Date( req.body.DELETE_TIME ) ) || "",
	} );

	inspectionH.save()
	.then( data => {

		// Insert Block Inspection Log
		const inspectionHLog = new inspectionLogHModel( {
			BLOCK_INSPECTION_CODE: req.body.BLOCK_INSPECTION_CODE,
			PROSES: req.body.LOG.PROSES,
			IMEI: req.body.LOG.IMEI,
			SYNC_TIME: yyyymmdd.withTime( new Date( req.body.LOG.SYNC_TIME ) ) || "",
			INSERT_USER: req.body.INSERT_USER,
			INSERT_TIME: yyyymmdd.withTime( new Date( req.body.INSERT_TIME ) ) || "",
		} );

		inspectionHLog.save()
		.then( data_log => {
    
			var inspection_d = {};
			inspectionDModel.insertMany( req.body.INSPECTION_D, function( err2, res2 ) {
				if ( err2 ) throw err2;
				inspection_d = res2;
			});

			result = {
				_id: data._id,
				BLOCK_INSPECTION_CODE: data.BLOCK_INSPECTION_CODE,
				WERKS: data.WERKS,
				AFD_CODE: data.AFD_CODE,
				BLOCK_CODE: data.BLOCK_CODE,
				INSPECTION_DATE: data.INSPECTION_DATE,
				INSPECTION_RESULT: data.INSPECTION_RESULT,
				STATUS_SYNC: data.STATUS_SYNC,
				SYNC_TIME: data.SYNC_TIME,
				START_INSPECTION: data.START_INSPECTION,
				END_INSPECTION: data.END_INSPECTION,
				LAT_START_INSPECTION: data.LAT_START_INSPECTION,
				LONG_START_INSPECTION: data.LONG_START_INSPECTION,
				LAT_END_INSPECTION: data.LAT_END_INSPECTION,
				LONG_END_INSPECTION: data.LONG_END_INSPECTION,
				INSERT_USER: data.INSERT_USER,
				INSERT_TIME: data.INSERT_TIME,
				UPDATE_USER: data.UPDATE_USER,
				UPDATE_TIME: data.UPDATE_TIME,
				DELETE_USER: data.DELETE_USER,
				DELETE_TIME: data.DELETE_TIME,
				__v: data.__v,
				LOG: data_log,
				INSPECTION_D: inspection_d
			}

			res.send( {
				status: true,
				message: 'Success',
				//data: result
				data: {}
			} );
		} ).catch( err => {
			res.status( 500 ).send( {
				status: false,
				message: 'Some error occurred while creating data2',
				data: {}
			} );
		} );

	} ).catch( err => {
		res.status( 500 ).send( {
			status: false,
			message: 'Some error occurred while creating data1',
			data: {}
		} );
	} );

};

// Retrieve and return all notes from the database.
exports.find = ( req, res ) => {
	//url_query = req.query;
	
	//var url_query_length = Object.keys( url_query ).length;
	inspectionHModel.aggregate(
		[
			{
				$lookup: {
					from: "T_LOG_BLOCK_INSPECTION_H",
					localField: "BLOCK_INSPECTION_CODE",
					foreignField: "BLOCK_INSPECTION_CODE",
					as: "LOGS"
				}
			}
		]
	)
	.then( data => {
		res.send( {
			status: true,
			message: 'Success',
			data: data
		} );
	}).catch( err => {
		res.status( 500 ).send( {
			status: false,
			message: err.message || "Some error occurred while retrieving data.",
			data: {}
		});
	});
};




/*

// Retrieve and return all notes from the database.
exports.find = ( req, res ) => {

	// Output Query URL
	 console.log(req.query);
	// Count JSON length
	// console.log( Object.keys( req.query ).length );

	url_query = req.query;
	
	var url_query_length = Object.keys( url_query ).length;
	
	if ( url_query_length > 0 ) {
		console.log( req.query );

		afdelingModel.find( url_query )
		.then( data => {
			if(!data) {
				return res.status( 404 ).send({
					status: false,
					message: 'Data not found 2',
					data: {}
				});
			}
			res.send( {
				status: true,
				message: 'Success',
				data: data
			} );
		} ).catch( err => {
			if( err.kind === 'ObjectId' ) {
				return res.status( 404 ).send( {
					status: false,
					message: 'Data not found 1',
					data: {}
				} );
			}
			return res.status( 500 ).send( {
				status: false,
				message: 'Error retrieving data',
				data: {}
			} );
		} );
	}
	else {
		afdelingModel.find()
		.then( data => {
			res.send( {
				status: true,
				message: 'Success',
				data: data
			} );
		}).catch( err => {
			res.status( 500 ).send( {
				status: false,
				message: err.message || "Some error occurred while retrieving data.",
				data: {}
			});
		});
	}

};

// Find a single data with a ID
exports.findOne = ( req, res ) => {
	afdelingModel.findOne( { 
		WERKS_AFD_CODE: req.params.GET_WERKS_AFD_CODE 
	} ).then( data => {
		if( !data ) {
			return res.status(404).send({
				status: false,
				message: "Data not found 2 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			});
		}
		res.send( {
			status: true,
			message: 'Success',
			data: data
		} );
	} ).catch( err => {
		if( err.kind === 'ObjectId' ) {
			return res.status( 404 ).send({
				status: false,
				message: "Data not found 1 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			});
		}
		return res.status( 500 ).send({
			status: false,
			message: "Error retrieving Data with id " + req.params.GET_WERKS_AFD_CODE,
			data: {}
		} );
	} );
};

// Update single data with ID
exports.update = ( req, res ) => {

	// Validation
	if( !req.body.COMP_CODE ) {
		return res.status( 400 ).send( {
			status: false,
			message: 'Invalid Input',
			data: {}
		});
	}
	
	afdelingModel.findOneAndUpdate( { 
		WERKS_AFD_BLOCK_CODE : req.params.GET_WERKS_AFD_CODE 
	}, {
		REGION_CODE: req.body.REGION_CODE || "",
		COMP_CODE: req.body.COMP_CODE || "",
		EST_CODE: req.body.EST_CODE || "",
		WERKS: req.body.WERKS || "",
		AFD_CODE: req.body.AFD_CODE || "",
		AFD_NAME: req.body.AFD_NAME || "",
		WERKS_AFD_CODE: req.body.WERKS_AFD_CODE || "",
		START_VALID: yyyymmdd( new Date( req.body.START_VALID ) ) || "",
		END_VALID: yyyymmdd( new Date( req.body.END_VALID ) ) || "",
		UPDATE_USER: req.body.UPDATE_USER || "",
		UPDATE_TIME: yyyymmdd.withTime( new Date() ) || ""
	}, { new: true } )
	.then( data => {
		if( !data ) {
			return res.status( 404 ).send( {
				status: false,
				message: "Data not found 1 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			} );
		}
		res.send( {
			status: true,
			message: 'Success',
			data: data
		} );
	}).catch( err => {
		if( err.kind === 'ObjectId' ) {
			return res.status( 404 ).send( {
				status: false,
				message: "Data not found 2 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			} );
		}
		return res.status( 500 ).send( {
			status: false,
			message: "Data error updating with id " + req.params.GET_WERKS_AFD_CODE,
			data: {}
		} );
	});
};

// Delete data with the specified ID in the request
exports.delete = ( req, res ) => {
	afdelingModel.findOneAndRemove( { WERKS_AFD_CODE : req.params.GET_WERKS_AFD_CODE } )
	.then( data => {
		if( !data ) {
			return res.status( 404 ).send( {
				status: false,
				message: "Data not found 2 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			} );
		}
		res.send( {
			status: true,
			message: 'Success',
			data: {}
		} );
	}).catch( err => {
		if( err.kind === 'ObjectId' || err.name === 'NotFound' ) {
			return res.status(404).send({
				status: false,
				message: "Data not found 1 with id " + req.params.GET_WERKS_AFD_CODE,
				data: {}
			} );
		}
		return res.status( 500 ).send( {
			status: false,
			message: "Could not delete data with id " + req.params.GET_WERKS_AFD_CODE,
			data: {}
		} );
	} );
};
*/