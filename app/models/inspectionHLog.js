const mongoose = require( 'mongoose' );

const InspectionLogSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	PROSES: String,
	IMEI: String,
	SYNC_TIME: String,
	INSERT_USER: String,
	INSERT_TIME: String
});

module.exports = mongoose.model( 'Log Inspection', InspectionLogSchema, 'T_LOG_BLOCK_INSPECTION_H' );