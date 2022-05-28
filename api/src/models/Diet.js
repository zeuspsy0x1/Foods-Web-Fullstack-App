const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('diet', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: true,
			primaryKey: true,
			autoincrement: true,
			unique: true,
			primaryKey: false, // RRR: los id en los modelos deben especificar que no son PK si no lo son, no lo puse y se rompio todo
		},

		name: {
			primaryKey: true,
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});
};
