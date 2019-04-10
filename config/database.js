/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		production: {
			url: 'mongodb://s_inspeksi:1nsp3k5i2019@dbapp.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		},
		development: {
			url: 'mongodb://s_inspeksi:s_inspeksi@dbappdev.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		}
	}