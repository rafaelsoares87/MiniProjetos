const express = require("express"); //Importando express
const app = express(); // iniciando express
const bodyParser = require("body-parser") //importando body-parser
const connection = require("./database/database") //Conectando database do mysql
const perguntas = require("./database/perguntas") //Importando model de perguntas
const Resposta = require("./database/Resposta") //Importando respostas do usuário

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados")
    })
    .catch((erro)=>{
        console.log(erro)
    })

app.set('view engine', 'ejs')
app.use(express.static('public')) //Para imagens e outros elementos css

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //para arquivo Json




//Criando rota
app.get("/home", function(req,res){
    perguntas.findAll({row: true, order: [
        ['id','DESC' ] //DESC - Ordem descrescente e ASC = Ordem crescente
    ]}).then(perguntas => {
        res.render("home", {
            perguntas: perguntas
        })
    })
    //Select * all from (comando Mysql para listar dados da tabela)
    
})


app.get("/perguntar", function(req,res){
    res.render("perguntar")
})
//Pedindo ao Express usar EJS como view engine

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao //recebe "name" do imput
    perguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/home")
    })
    

}) //Metodo post para reCEBER dados do formulário
app.post("/comentarios", (req, res) => {
    var texto = req.body.texto
    var perguntatitulo = req.body.pergunta
    Resposta.create({
        texto: texto,
        perguntatitulo: perguntatitulo
    }).then(()=>{
        res.redirect("/home/" + perguntatitulo)
        //Redirecionando para a página da pergunta
    })

})


//Buscar id e exibir em outra página
app.get("/home/:titulo", function(req, res){
    var titulo = req.params.titulo
    
    perguntas.findOne({
        where: {titulo: titulo}
    }).then(ask =>{
        if(ask!=undefined){
            Resposta.findAll({
                where: {perguntatitulo: ask.titulo}
            }).then(respondidas => {
                res.render("perguntaspost", {
                    ask: ask,
                    respondidas: respondidas
                })

            }) // Buscar comentário relacionada a pergunta e exibir


          

        }else{
            res.redirect("/home")
        }
    })
})

app.listen(8080,() => {
    console.log("App rodando")
})