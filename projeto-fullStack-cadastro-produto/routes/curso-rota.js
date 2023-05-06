const router = require('express').Router();

const Curso = require('../model/cursoModel')

//GET ALL
router.get("/", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    try {
        const curso = await Curso.find();
        res.status(200).json(curso)
    } catch (error){
        res.status(500).json({ error: error});
    }
})

//GET BY ID
router.get("/:id", async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     const id = req.params.id

    try {
        const curso = await Curso.findOne({_id: id});

        if(!curso){
            res.status(422).json({error: "Produto não encontrado"});
            return
        }

        res.status(200).json(curso)
        return
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//POST
router.post("/", async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const curso = new Curso(req.body)

    try {
        res.json(await curso.save( curso ))

    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//UPDATE
router.put('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    try {
        let id = req.params.id;
        const curso = Curso(req.body);
        res.json( await Produto.findByIdAndUpdate( id, curso, {new: true} ) );
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//DELETE
router.delete('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    try {
        const id = req.params.id;
        res.json(await Curso.findOneAndDelete({_id: id }))     
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

module.exports = router;