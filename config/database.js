/*
 |--------------------------------------------------------------------------
 | Database Connections
 |--------------------------------------------------------------------------
 |
 | Here are each of the database connections setup for your application.
 | Of course, examples of configuring each database platform that is
 | supported by NodeJS is shown below to make development simple.
 |
 */
	module.exports = {
		dev: {
			url: 'mongodb://s_inspeksi:s_inspeksi@dbappdev.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		},
		qa: {
			url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbappqa.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		},
		prod: {
			url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbapp.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		}
	}
