const express = require('express');
const mongoose = require('mongoose');


const app = express();
const cors = require('cors');

//configurando leitura json
app.use(
  express.urlencoded({
    extended: true,
  }),     
)
app.use(express.json())
app.use(cors());

//rotas da api
const rotasReceita = require('./routes/rotasReceita')

app.use('/receita', rotasReceita)


mongoose.connect("mongodb://localhost:27017/receita", { 
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log("conexão feita!");
      app.listen(3000)
    })
    .catch((error) => {
      console.log("Erro ao conectar" + error);
    });