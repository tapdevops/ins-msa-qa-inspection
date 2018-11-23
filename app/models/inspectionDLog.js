const mongoose = require( 'mongoose' );

const InspectionLogSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE_D: String,
	PROSES: String,
	IMEI: String,
	SYNC_TIME: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'LogDInspection', InspectionLogSchema, 'T_LOG_BLOCK_INSPECTION_D' );