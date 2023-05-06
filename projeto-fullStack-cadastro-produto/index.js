const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(cors())

//configuração para trabalhar com JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//Rotas da API  
const rotasCurso = require('./routes/curso-rota')
app.use('/curso', rotasCurso)

//Conexão com o banco de dados NÃO RELACIONAL   
mongoose.connect("mongodb://localhost:27017/curso")
.then((result) => {
    console.log("CONEXÃO REALIZADA");
    app.listen(3000);
})
.catch((error) => {
    console.log("ERROR DE CONEXÃO" + error)
} )