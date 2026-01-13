    const express = require('express');
    const OpenAI = require('openai').default;
    require('dotenv').config();

    const router = express.Router();

    const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
    });

    router.post('/text-to-speech', async (req, res) => {
    try {
        const { text, voice = 'nova' } = req.body;

        if (!text) {
        return res.status(400).json({ 
            sucesso: false,
            mensagem: 'Texto é obrigatório' 
        });
        }

        const mp3 = await openai.audio.speech.create({
        model: 'tts-1',
        voice: voice,
        input: text,
        speed: 0.95,
        response_format: 'mp3'
        });

        const buffer = Buffer.from(await mp3.arrayBuffer());

        res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length,
        'Content-Disposition': 'inline; filename="versiculo.mp3"'
        });
        
        res.send(buffer);

    } catch (error) {
        console.error('Erro ao gerar áudio:', error);
        res.status(500).json({ 
        sucesso: false,
        mensagem: 'Erro ao gerar áudio',
        erro: error.message 
        });
    }
    });

    module.exports = router;