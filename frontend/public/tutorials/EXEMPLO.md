# Exemplo de como adicionar imagens aos tutoriais

## Passo 1: Coloque as imagens na pasta correta

Coloque as imagens na pasta `frontend/public/tutorials/` organizadas por tutorial:

```
frontend/public/tutorials/
├── tutorial-1/
│   ├── passo-1.jpg    (imagem do passo 1)
│   ├── passo-2.jpg    (imagem do passo 2)
│   └── passo-3.jpg    (imagem do passo 3)
├── tutorial-2/
│   ├── passo-1.jpg
│   ├── passo-2.jpg
│   └── passo-3.jpg
└── ...
```

## Passo 2: Atualize o arquivo tutorialService.js

No arquivo `backend/src/services/tutorialService.js`, atualize o campo `image` de cada passo:

### Exemplo para o Tutorial 1 (YouTube):

```javascript
{
  step: 1,
  title: 'Abrir a porta vermelha.',
  description: 'Primeiro, você vai procurar...',
  image: '/tutorials/tutorial-1/passo-1.jpg'  // ← Adicione o caminho aqui
},
{
  step: 2,
  title: 'Chamar o microfone.',
  description: 'Quando você entrar no YouTube...',
  image: '/tutorials/tutorial-1/passo-2.jpg'  // ← Adicione o caminho aqui
},
{
  step: 3,
  title: 'Falar com o celular.',
  description: 'Quando você toca no microfone...',
  image: '/tutorials/tutorial-1/passo-3.jpg'  // ← Adicione o caminho aqui
}
```

## Importante:

- O caminho começa com `/` porque as imagens estão na pasta `public`
- O Vite serve automaticamente arquivos da pasta `public` na raiz
- Use nomes descritivos para facilitar a organização
- Formatos suportados: JPG, PNG, WebP, GIF

