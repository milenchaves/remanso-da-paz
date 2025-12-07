# Pasta de Imagens dos Tutoriais

Coloque aqui as imagens dos tutoriais organizadas por tutorial.

## Estrutura sugerida:

```
tutorials/
├── tutorial-1/          # Pesquisar música ou vídeo no YouTube
│   ├── passo-1.jpg
│   ├── passo-2.jpg
│   └── passo-3.jpg
├── tutorial-2/          # Ligar para alguém pelo WhatsApp
│   ├── passo-1.jpg
│   ├── passo-2.jpg
│   └── passo-3.jpg
├── tutorial-3/          # Enviar um áudio pelo WhatsApp
│   └── ...
└── ...
```

## Formato das imagens:
- Use formatos: JPG, PNG ou WebP
- Tamanho recomendado: 800x600px ou maior (proporção 4:3)
- Peso: tente manter abaixo de 500KB por imagem para melhor performance

## Como referenciar no código:
No arquivo `backend/src/services/tutorialService.js`, use o caminho:
```javascript
image: '/tutorials/tutorial-1/passo-1.jpg'
```

