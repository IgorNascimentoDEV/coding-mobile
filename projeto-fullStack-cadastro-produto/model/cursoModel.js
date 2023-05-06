const mongoose = require( 'mongoose' )

const cursoModel = new mongoose.Schema( {
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
}, { collection: 'curso' } )

cursoModel.method( {
} )

cursoModel.statics = {
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

module.exports = mongoose.model( 'Curso', cursoModel )