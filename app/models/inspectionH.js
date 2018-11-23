const mongoose = require( 'mongoose' );

const InspectionHSchema = mongoose.Schema( {
	BLOCK_INSPECTION_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	INSPECTION_DATE: {
		type: Date,
		default: function() {
			return null;
		}
	},
	INSPECTION_RESULT: String,
	STATUS_SYNC: String,
	SYNC_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	START_INSPECTION: {
		type: Date,
		default: function() {
			return null;
		}
	},
	END_INSPECTION: {
		type: Date,
		default: function() {
			return null;
		}
	},
	LAT_START_INSPECTION: String,
	LONG_START_INSPECTION: String,
	LAT_END_INSPECTION: String,
	LONG_END_INSPECTION: String,
	INSERT_USER: String,
	INSERT_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	UPDATE_USER: String,
	UPDATE_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	},
	DELETE_USER: String,
	DELETE_TIME: {
		type: Date,
		default: function() {
			return null;
		}
	}

});

module.exports = mongoose.model( 'Inspection H', InspectionHSchema, 'TR_BLOCK_INSPECTION_H' );