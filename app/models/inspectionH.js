const mongoose = require( 'mongoose' );

const InspectionHSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	INSPECTION_DATE: String,
	INSPECTION_RESULT: String,
	STATUS_SYNC: String,
	SYNC_TIME: String,
	START_INSPECTION: String,
	END_INSPECTION: String,
	LAT_START_INSPECTION: String,
	LONG_START_INSPECTION: String,
	LAT_END_INSPECTION: String,
	LONG_END_INSPECTION: String,
	INSERT_USER: String,
	INSERT_TIME: String,
	UPDATE_USER: String,
	UPDATE_TIME: String,
	DELETE_USER: String,
	DELETE_TIME: String

});

module.exports = mongoose.model( 'Inspection H', InspectionHSchema, 'TR_BLOCK_INSPECTION_H' );