# Teste de Imagens

## Para testar se as imagens estão funcionando:

1. Coloque uma imagem de teste na pasta `tutorial-1` com o nome `passo-1.jpg`
2. No arquivo `backend/src/services/tutorialService.js`, atualize o primeiro passo do tutorial 1:

```javascript
{
  step: 1,
  title: 'Abrir a porta vermelha.',
  description: 'Primeiro, você vai procurar...',
  image: '/tutorials/tutorial-1/passo-1.jpg'  // ← Adicione este caminho
}
```

3. Reinicie o servidor do backend se necessário
4. Acesse o tutorial no navegador
5. Abra o Console do navegador (F12) para ver se há erros

## Verificações:

- ✅ O caminho deve começar com `/` (barra inicial)
- ✅ O caminho deve ser relativo à pasta `public`
- ✅ A imagem deve estar na pasta correta
- ✅ O formato da imagem deve ser suportado (jpg, png, webp, gif)

## Se a imagem não aparecer:

1. Verifique no Console do navegador se há erros 404
2. Verifique se o caminho no código está exatamente igual ao nome do arquivo
3. Verifique se a imagem está realmente na pasta `frontend/public/tutorials/tutorial-1/`
4. Tente acessar a imagem diretamente no navegador: `http://localhost:5173/tutorials/tutorial-1/passo-1.jpg`

