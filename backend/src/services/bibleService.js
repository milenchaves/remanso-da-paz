const axios = require('axios');

const API_BASE_URL = 'https://rest.api.bible/v1';
const BIBLE_ID = process.env.BIBLE_ID || '61fd76eafa1577c2-02';

const VERSES = [
    'GEN.1.1',     
    'PSA.1.1',
    'PSA.23.1',
    'PSA.27.1',
    'PSA.34.8',
    'PSA.37.5',
    'PSA.46.1',
    'PSA.51.10',
    'PSA.91.1',
    'PSA.119.105',
    'PRO.3.5',
    'PRO.3.6',
    'PRO.4.23',
    'ISA.40.31',
    'ISA.41.10',
    'JER.29.11',
    'MAT.5.3',
    'MAT.5.9',
    'MAT.6.33',
    'MAT.7.7',
    'MAT.11.28',
    'MAT.28.19',
    'MAT.28.20',
    'JHN.3.16',
    'JHN.8.32',
    'JHN.10.10',
    'JHN.14.6',
    'ACT.1.8',
    'ROM.5.8',
    'ROM.8.1',
    'ROM.8.28',
    'ROM.8.38',
    'ROM.8.39',
    '1CO.10.13',
    '1CO.13.4',
    '1CO.13.5',
    '1CO.13.6',
    '1CO.13.7',
    '2CO.5.17',
    'GAL.2.20',
    'GAL.5.22',
    'GAL.5.23',
    'EPH.2.8',
    'EPH.2.9',
    'EPH.6.11',
    'PHP.4.4',
    'PHP.4.6',
    'PHP.4.7',
    'PHP.4.13',
    'COL.3.23',
    '1TH.5.16',
    '1TH.5.17',
    '1TH.5.18',
    '2TI.1.7',
    'HEB.4.12',
    'HEB.11.1',
    'HEB.12.2',
    'JAS.1.5',
    '1PE.5.7',
    '1JN.4.7',
    '1JN.4.8',
    '1JN.4.18',
    'REV.3.20',
];
    const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'api-key': process.env.BIBLE_API_KEY || '',
    },
    });

    class BibleService {
    constructor() {
        this.versiculoDoDia = null;
        this.ultimaAtualizacao = null;
    }

    async buscarVersiculoAleatorio() {
        try {
        const day = new Date().getDate();
       const verseIndex = Math.floor(Math.random() * VERSES.length);
        const verseID = VERSES[verseIndex]

        const response = await api.get(`/bibles/${BIBLE_ID}/passages/${verseID}`, {
            params: {
            'content-type': 'html',
            },
        });

        const passage = response.data.data;

        this.versiculoDoDia = {
            livro: passage.reference,
            capitulo: null,
            versiculo: null,
            texto: passage.content,
            versao: 'BLT', 
            data: new Date().toLocaleDateString('pt-BR'),
        };

        this.ultimaAtualizacao = new Date();

        console.log(
            `Novo versículo carregado: ${this.versiculoDoDia.livro} ${this.versiculoDoDia.capitulo}:${this.versiculoDoDia.versiculo}`
        );

        return this.versiculoDoDia;
        } catch (error) {
        console.error('Erro ao buscar versículo:', error.response?.data || error.message);
        throw new Error('Não foi possível buscar o versículo');
        }
    }

    obterVersiculoDoDia() {
        if (!this.versiculoDoDia) {
        throw new Error('Nenhum versículo carregado ainda');
        }
        return this.versiculoDoDia;
    }

    async buscarVersiculoEspecifico(livro, capitulo, versiculo) {
        try {
        const response = await api.get(`/verses/nvi/${livro}/${capitulo}/${versiculo}`);

        return {
            livro: response.data.book.name,
            capitulo: response.data.chapter,
            versiculo: response.data.number,
            texto: response.data.text,
            versao: response.data.book.version,
        };
        } catch (error) {
        console.error('Erro ao buscar versículo específico:', error.response?.data || error.message);
        throw new Error('Versículo não encontrado');
        }
    }

    async listarLivros() {
        try {
        const response = await api.get('/books');
        return response.data;
        } catch (error) {
        console.error('Erro ao listar livros:', error.response?.data || error.message);
        throw new Error('Não foi possível listar os livros');
        }
    }
    }

module.exports = new BibleService();