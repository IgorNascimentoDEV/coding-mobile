const express = require('express');
const mongoose = require('mongoose');

const app = express();

//configuração para trabalhar com JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//Rotas da API  
const rotasProduto = require('./routes/produto-rota')
app.use('/produto', rotasProduto)

//Conexão com o banco de dados NÃO RELACIONAL   
mongoose.connect("mongodb://localhost:27017/produtos")
.then((result) => {
    console.log("CONEXÃO REALIZADA");
    app.listen(3000);
})
.catch((error) => {
    console.log("ERROR DE CONEXÃO" + error)
} )