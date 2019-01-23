const mongoose = require( 'mongoose' );

const ViewInspectionSchema = mongoose.Schema( {});

module.exports = mongoose.model( 'ViewInspection', ViewInspectionSchema, 'VIEW_INSPECTION' );