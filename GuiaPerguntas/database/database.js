const sequelize = require("sequelize") //Importando modulo equelize
const connection = new sequelize('guiaperguntas', 'root', 'chocolate', {
    host: 'localhost',
    dialect: 'mysql'
}) // chamando mysql

module.exports = connection //importando