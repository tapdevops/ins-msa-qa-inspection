/*
|--------------------------------------------------------------------------
| Module Exports
|--------------------------------------------------------------------------
*/
	module.exports = {
		production: {
			url: 'mongodb://dbapp:dbapp123@dbapp.tap-agri.com:27017/s_inspeksi?authSource=admin',
			ssl: false
		},
		development: {
			url: 'mongodb://s_inspeksi:s_inspeksi@dbappdev.tap-agri.com:4848/s_inspeksi?authSource=s_inspeksi',
			ssl: false
		}
	}