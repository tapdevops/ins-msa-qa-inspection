const mongoose = require( 'mongoose' );

const BlockSchema = mongoose.Schema( {
	REGION_CODE: String,
	COMP_CODE: String,
	EST_CODE: String,
	WERKS: String,
	AFD_CODE: String,
	BLOCK_CODE: String,
	BLOCK_NAME: String,
	WERKS_AFD_BLOCK_CODE: String,
	LATITUDE_BLOCK: String,
	LONGITUDE_BLOCKS: String,
	START_VALID: String,
	END_VALID: String,
	INSERT_USER: String,
	INSERT_TIME: String,
	UPDATE_USER: String,
	UPDATE_TIME: String
});

module.exports = mongoose.model( 'Block', BlockSchema, 'TM_BLOCK' );