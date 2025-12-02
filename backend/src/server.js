const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bibleRoutes = require('./routes/bibleRoutes');
const { agendarAtualizacaoDiaria, inicializarVersiculo } = require('./jobs/bibleJob');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Versículos Bíblicos',
        rotas: {
        versiculoDoDia: '/api/versiculo-do-dia',
        atualizarVersiculo: 'POST /api/atualizar-versiculo',
        versiculoEspecifico: '/api/versiculo/:livro/:capitulo/:versiculo',
        livros: '/api/livros'
        }
    });
    });

    app.use('/api', bibleRoutes);

    const iniciarServidor = async () => {
    try {
        await inicializarVersiculo();
        agendarAtualizacaoDiaria();
        
        app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Acesse: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();