const mongoose = require( 'mongoose' );

const InspectionHSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	INSPECTION_DATE: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	INSPECTION_RESULT: String,
	STATUS_SYNC: String,
	SYNC_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	START_INSPECTION: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	END_INSPECTION: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	LAT_START_INSPECTION: String,
	LONG_START_INSPECTION: String,
	LAT_END_INSPECTION: String,
	LONG_END_INSPECTION: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	UPDATE_USER: String,
	UPDATE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	},
	DELETE_USER: String,
	DELETE_TIME: {
		type: Number,
		get: v => Math.floor( v ),
		set: v => Math.floor( v ),
		alias: 'i',
		default: function() {
			return 0;
		}
	}

});

module.exports = mongoose.model( 'Inspection H', InspectionHSchema, 'TR_BLOCK_INSPECTION_H' );