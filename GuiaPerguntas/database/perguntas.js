const { Sequelize } = require('sequelize')
const sequelize = require('sequelize')
const connection = require('./database')

//model
const perguntas = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false //Impede que o campo seja vázio
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false //Impede que o campo seja vázio
    }

})
perguntas.sync({force: false}).then(()=>{
    console.log("Tabela criada")
}).catch((erro)=>{
    console.log(erro)
}) //Sincronizando dados

module.exports = perguntas