const mongoose = require( 'mongoose' )

const ProdutoModel = new mongoose.Schema( {
  nome: {
    type: String,
    required: true
  },
  marca: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  quantidade: {
    type: String,
    required: true
  }
}, { collection: 'produto' } )

ProdutoModel.method( {
} )

ProdutoModel.statics = {
  get ( id ) {
    return this.findById( id, {'__v': 0} )
      .exec()
  },
  list ( { skip = 0, limit = 50 } = {} ) {
    return this.find( {}, { '__v': 0 } )
    .skip( skip )
    .limit( limit )
    .exec()
  }
}

module.exports = mongoose.model( 'Produto', ProdutoModel )