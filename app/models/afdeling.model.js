const mongoose = require( 'mongoose' );

const AfdelingSchema = mongoose.Schema( {
	REGION_CODE: String,
	COMP_CODE: String,
	EST_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	AFD_NAME: String,
	WERKS_AFD_CODE: String,
	START_VALID: String,
	END_VALID: String,
	INSERT_USER: String,
	INSERT_TIME: String,
	UPDATE_USER: String,
	UPDATE_TIME: String
});

module.exports = mongoose.model( 'Afdeling', AfdelingSchema, 'TM_AFD' );