const mongoose = require( 'mongoose' );

const InspectionDSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE_D: String,
	BLOCK_INSPECTION_CODE: String,
	CONTENT_CODE: String,
	AREAL: String,
	VALUE: String,
	STATUS_SYNC: String,
	SYNC_TIME: String,
	INSERT_USER: String,
	INSERT_TIME: String,
	UPDATE_USER: String,
	UPDATE_TIME: String,
	DELETE_USER: String,
	DELETE_TIME: String
});

module.exports = mongoose.model( 'Inspection D', InspectionDSchema, 'TR_BLOCK_INSPECTION_D' );