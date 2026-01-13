const bibleService = require('../services/bibleService');

    class BibleController {
    async getVersiculoDoDia(req, res) {
        try {
        const versiculo = bibleService.obterVersiculoDoDia();
        res.json({
            sucesso: true,
            dados: versiculo
        });
        } catch (error) {
        res.status(404).json({
            sucesso: false,
            mensagem: error.message
        });
        }
    }

    async atualizarVersiculo(req, res) {
        try {
        const versiculo = await bibleService.buscarVersiculoAleatorio();
        res.json({
            sucesso: true,
            mensagem: 'Versículo atualizado com sucesso',
            dados: versiculo
        });
        } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
        }
    }

    async getVersiculoEspecifico(req, res) {
        try {
        const { livro, capitulo, versiculo } = req.params;
        const dados = await bibleService.buscarVersiculoEspecifico(
            livro,
            capitulo,
            versiculo
        );
        res.json({
            sucesso: true,
            dados
        });
        } catch (error) {
        res.status(404).json({
            sucesso: false,
            mensagem: error.message
        });
        }
    }

    async getLivros(req, res) {
        try {
        const livros = await bibleService.listarLivros();
        res.json({
            sucesso: true,
            dados: livros
        });
        } catch (error) {
        res.status(500).json({
            sucesso: false,
            mensagem: error.message
        });
        }
    }
    }

module.exports = new BibleController();