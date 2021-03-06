const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('recipe', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: true,
			primaryKey: true,
			autoincrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		summary: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		healthScore: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		steps: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},
	});
};
