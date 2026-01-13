const express = require('express');
const router = express.Router();
const bibleController = require('../controllers/bibleController');

router.get('/versiculo-do-dia', (req, res) => {
    bibleController.getVersiculoDoDia(req, res);
});

    router.post('/atualizar-versiculo', (req, res) => {
    bibleController.atualizarVersiculo(req, res);
});

    router.get('/versiculo/:livro/:capitulo/:versiculo', (req, res) => {
    bibleController.getVersiculoEspecifico(req, res);
});

    router.get('/livros', (req, res) => {
    bibleController.getLivros(req, res);
});

module.exports = router;