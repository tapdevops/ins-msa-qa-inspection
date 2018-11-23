const mongoose = require( 'mongoose' );

const InspectionLogSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	PROSES: String,
	IMEI: String,
	SYNC_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}
});

module.exports = mongoose.model( 'LogHInspection', InspectionLogSchema, 'T_LOG_BLOCK_INSPECTION_H' );