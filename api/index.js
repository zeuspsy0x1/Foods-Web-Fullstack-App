//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getDietsAndSendThemToDb, dbFetchAllRecipes, dbFetchByTitle } = require('../api/src/controllers/dbFunctions')
const  { getById, getByTitle }  = require('../api/src/controllers/apiFunctions')

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
	server.listen(5000, () => {
		console.log('Backend listening at PORT 5000'); // eslint-disable-line no-console
	});
});

getDietsAndSendThemToDb() //traigo las dietas, si ya estan en db, no hace nada

//dbFetchByTitle('pollo')
//dbFetchAllRecipes()
//getById(567)
//getByTitle('chicken')