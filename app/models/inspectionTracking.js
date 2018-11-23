const mongoose = require( 'mongoose' );

const InspectionTrackingSchema = mongoose.Schema( {

	TRACK_INSPECTION_CODE: String,
	BLOCK_INSPECTION_CODE: String,
	DATE_TRACK: {
			type: Date,
			default: function() {
				return null;
			}
		},
	LAT_TRACK: String,
	LONG_TRACK: String,
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
	},

});

module.exports = mongoose.model( 'InspectionTracking', InspectionTrackingSchema, 'TR_TRACK_INSPECTION' );