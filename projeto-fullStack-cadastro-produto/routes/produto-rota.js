const router = require('express').Router();

const Produto = require('../model/produtoModel')

//GET ALL
router.get("/", async (req, res) => {
    try {
        const produto = await Produto.find();
        res.status(200).json(produto)
    } catch (error){
        res.status(500).json({ error: error});
    }
})

//GET BY ID
router.get("/:id", async(req, res) => {
     const id = req.params.id

    try {
        const noticia = await Produto.findOne({_id: id});

        if(!noticia){
            res.status(422).json({error: "Produto não encontrado"});
            return
        }

        res.status(200).json(noticia)
        return
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//POST
router.post("/", async(req, res) => {
    const produto = new Produto(req.body)

    try {
        res.json(await produto.save( produto ))

    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//UPDATE
router.put('/:id', async(req, res) => {
    try {
        let id = req.params.id;
        const produto = Produto(req.body);
        res.json( await Produto.findByIdAndUpdate( id, produto, {new: true} ) );
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

//DELETE
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        res.json(await Produto.findOneAndDelete({_id: id }))     
    } catch (error) {
        res.status(500).json({ error: error});
    }
})

module.exports = router;