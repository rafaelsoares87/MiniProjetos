const { Sequelize } = require('sequelize')
const sequelize = require('sequelize')
const connection = require('./database')

//mode2
const Resposta = connection.define('respostas', {
    texto: {
        type: Sequelize.STRING,
        allowNull: false //Impede que o campo seja vázio
    },
    perguntatitulo: {
        type: Sequelize.STRING,
        allowNull: false //Impede que o campo seja vázio
    }

})
Resposta.sync({force: false}).then(()=>{
    console.log("Tabela Resposta criada")
}).catch((erro)=>{
    console.log(erro)
}) //Sincronizando dados

module.exports = Resposta
















//const { Sequelize } = require('sequelize')

//const connection = require('./database')

//const Resposta = connection.define('respostas', {
   // texto: {
        //type: Sequelize.TEXT,
        //allowNull: false
   // },
    //perguntaId: {
        //type: Sequelize.INTEGER,
        //allowNull: false

   // }
//})
//Resposta.sync({force: false}).then(()=>{
    //console.log("Tabela resposta criada")
//}).catch((erro)=>{
    //console.log(erro)
//}) //Sincronizando dados

//module.exports = Resposta