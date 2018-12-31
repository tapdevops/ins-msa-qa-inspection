const mongoose = require( 'mongoose' );

const InspectionLogSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	PROSES: String,
	IMEI: String,
	SYNC_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	INSERT_USER: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	}
});

module.exports = mongoose.model( 'LogHInspection', InspectionLogSchema, 'T_LOG_BLOCK_INSPECTION_H' );