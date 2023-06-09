const router = require('express').Router();
const Receita = require('../model/receita');

// Rota para ler todas as receitas
router.get('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  try {
    const receitas = await Receita.find();
    res.status(200).json(receitas);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para ler uma receita pelo ID
router.get('/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const id = req.params.id;

  try {
    const receita = await Receita.findOne({ _id: id });

    if (!receita) {
      res.status(404).json({ error: 'A receita não foi encontrada' });
      return;
    }

    res.status(200).json(receita);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para criar uma nova receita
router.post('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const { titulo, ingredientes, instrucoes, img } = req.body;

  if (!titulo || !ingredientes || !instrucoes ) {
    res.status(422).json({ error: 'Campos obrigatórios não foram preenchidos' });
    return;
  }

  const receita = {
    titulo,
    ingredientes,
    instrucoes,
    img,
  };

  try {
    await Receita.create(receita);
    res.status(201).json({ message: 'Receita inserida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para atualizar uma receita pelo ID
router.put('/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const id = req.params.id;
  const { titulo, ingredientes, instrucoes, img } = req.body;

  const receita = {
    titulo,
    ingredientes,
    instrucoes,
    img,
  };

  try {
    const updatedReceita = await Receita.findByIdAndUpdate(id, receita, { new: true });

    if (!updatedReceita) {
      res.status(404).json({ error: 'A receita não foi encontrada' });
      return;
    }

    res.status(200).json(updatedReceita);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Rota para excluir uma receita pelo ID
router.delete('/:id', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const id = req.params.id;

  try {
    const deletedReceita = await Receita.findByIdAndDelete(id);

    if (!deletedReceita) {
      res.status(404).json({ error: 'A receita não foi encontrada' });
      return;
    }

    res.status(200).json({ message: 'Receita removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
