'use strict'

const mongoose = require( 'mongoose' )

const Receita = mongoose.model('Receita', {
    titulo: {
    type: String,
    
  },
  ingredientes: {
    type: String,
   
  },
  instrucoes: {
    type: String,
    
  },
  img: {
    type: String,
  }
})


module.exports = Receita;