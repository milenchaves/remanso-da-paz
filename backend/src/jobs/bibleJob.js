const cron = require('node-cron');
const bibleService = require('../services/bibleService');

const agendarAtualizacaoDiaria = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Executando atualização diária do versículo...');
    try {
        await bibleService.buscarVersiculoAleatorio();
        console.log('Versículo do dia atualizado com sucesso!');
        } catch (error) {
        console.error('Erro na atualização automática:', error.message);
        }
    });

    console.log('Agendamento diário configurado para 00:00');
    };

    const inicializarVersiculo = async () => {
    console.log('Buscando versículo inicial...');
    try {
        await bibleService.buscarVersiculoAleatorio();
        console.log('Versículo inicial carregado!');
    } catch (error) {
        console.error('Erro ao carregar versículo inicial:', error.message);
    }
    };

    module.exports = {
    agendarAtualizacaoDiaria,
    inicializarVersiculo
    };