// Perguntas do Quiz de Conhecimentos baseadas nos tutoriais

export const QUIZ_LEVELS = [
  {
    id: 'easy',
    title: 'Nível 1: Fácil',
    description: 'Conceitos básicos e identificação de ícones.',
    questions: [
      {
        id: 1,
        question: 'Qual é a cor do ícone do WhatsApp?',
        options: ['Verde', 'Azul', 'Vermelho', 'Amarelo'],
        correct: 0,
        explanation: 'O WhatsApp tem um ícone verde com um telefone branco dentro.'
      },
      {
        id: 2,
        question: 'Para pesquisar música no YouTube com comando de voz, qual ferramenta devemos usar?',
        options: ['Teclado', 'Microfone', 'Câmera', 'Galeria'],
        correct: 1,
        explanation: 'O microfone permite pesquisar usando a voz, sem precisar digitar.'
      },
      {
        id: 3,
        question: 'Qual aplicativo usamos para tirar uma foto?',
        options: ['Calculadora', 'WhatsApp', 'Câmera', 'Galeria'],
        correct: 2,
        explanation: 'O botão branco redondo na parte de baixo da tela é usado para tirar fotos.'
      },
      {
        id: 4,
        question: 'Onde ficam guardadas as fotos do celular?',
        options: ['WhatsApp', 'Câmera', 'Galeria', 'Google'],
        correct: 2,
        explanation: 'A Galeria é onde todas as fotos são armazenadas e organizadas.'
      },
      {
        id: 5,
        question: 'Para enviar um áudio pelo WhatsApp, devemos:',
        options: ['Tocar no microfone', 'Segurar o microfone', 'Falar no telefone', 'Tocar na câmera'],
        correct: 1,
        explanation: 'É preciso segurar o botão do microfone enquanto fala, depois soltar para enviar.'
      },
      {
        id: 6,
        question: 'Qual aplicativo tem um ícone com a letra G colorida?',
        options: ['YouTube', 'WhatsApp', 'Google', 'Galeria'],
        correct: 2,
        explanation: 'O Google tem um ícone com a letra G nas cores azul, vermelho, amarelo e verde.'
      },
      {
        id: 7,
        question: 'Para fazer uma ligação de vídeo, qual botão tocamos?',
        options: ['Telefone verde', 'Câmera de vídeo', 'Microfone', 'Imagem'],
        correct: 1,
        explanation: 'O botão de câmera de vídeo no WhatsApp inicia uma chamada de vídeo.'
      },
      {
        id: 8,
        question: 'O YouTube tem um ícone de que cor?',
        options: ['Verde', 'Vermelho', 'Azul', 'Amarelo'],
        correct: 1,
        explanation: 'O YouTube tem um ícone vermelho com uma seta de play branca.'
      },
      {
        id: 9,
        question: 'Para pesquisar algo no Google usando a voz, tocamos em:',
        options: ['A letra G', 'O microfone', 'A barra de pesquisa', 'O botão de busca'],
        correct: 1,
        explanation: 'O ícone do microfone na barra de pesquisa permite usar a voz para pesquisar.'
      },
      {
        id: 10,
        question: 'Onde encontramos a lista de contatos para fazer uma ligação?',
        options: ['WhatsApp', 'Telefone', 'Google', 'YouTube'],
        correct: 1,
        explanation: 'O aplicativo Telefone tem a lista de contatos salvos no celular.'
      }
    ]
  },
  {
    id: 'medium',
    title: 'Nível 2: Médio',
    description: 'Passos intermediários e funcionalidades.',
    questions: [
      {
        id: 1,
        question: 'Qual é a sequência correta para enviar uma foto pelo WhatsApp?',
        options: [
          'Abrir WhatsApp → Tocar no clipe → Escolher Galeria → Selecionar foto → Enviar',
          'Abrir Galeria → Selecionar foto → Compartilhar → WhatsApp',
          'Abrir WhatsApp → Tocar na câmera → Tirar foto → Enviar',
          'Abrir WhatsApp → Tocar no microfone → Falar → Enviar'
        ],
        correct: 0,
        explanation: 'A sequência correta é: WhatsApp → clipe → Galeria → selecionar foto → enviar.'
      },
      {
        id: 2,
        question: 'Para gravar um vídeo, primeiro devemos:',
        options: [
          'Tocar no botão vermelho',
          'Mudar para o modo vídeo',
          'Abrir a galeria',
          'Enviar para alguém'
        ],
        correct: 1,
        explanation: 'Primeiro é preciso mudar da função "Foto" para "Vídeo" na câmera.'
      },
      {
        id: 3,
        question: 'Quando enviamos um áudio pelo WhatsApp, o que acontece quando soltamos o botão?',
        options: [
          'O áudio é apagado',
          'O áudio é enviado automaticamente',
          'O áudio é salvo na galeria',
          'Nada acontece'
        ],
        correct: 1,
        explanation: 'Ao soltar o botão do microfone, o áudio é enviado automaticamente para a conversa.'
      },
      {
        id: 4,
        question: 'Para ver fotos antigas na Galeria, devemos:',
        options: [
          'Tocar na foto mais recente',
          'Deslizar a tela para cima ou para baixo',
          'Abrir o WhatsApp',
          'Tocar no botão de busca'
        ],
        correct: 1,
        explanation: 'Deslizar a tela permite navegar por todas as fotos, como folhear um álbum.'
      },
      {
        id: 5,
        question: 'O que acontece quando tocamos no microfone do YouTube?',
        options: [
          'O vídeo para',
          'O celular começa a ouvir nossa voz para realizar uma pesquisa',
          'O volume aumenta',
          'Abre a galeria'
        ],
        correct: 1,
        explanation: 'O microfone ativa a função de pesquisa por voz, permitindo falar o que queremos buscar.'
      },
      {
        id: 6,
        question: 'Para fazer uma ligação pelo WhatsApp, após abrir a conversa, tocamos em:',
        options: [
          'O microfone',
          'O ícone de telefone no alto da tela',
          'A câmera',
          'O clipe'
        ],
        correct: 1,
        explanation: 'O ícone de telefone fica no canto superior direito da tela de conversa.'
      },
      {
        id: 7,
        question: 'Se você tirou uma foto que não gostou, em qual ícone deve tocar para apagá-la?',
        options: [
          'Na lupa',
          'Na lixeira',
          'No coração',
          'No microfone'
        ],
        correct: 1,
        explanation: 'O ícone de lixeira serve para excluir (jogar fora) arquivos que não queremos mais manter no celular.'
      },
      {
        id: 8,
        question: 'Para pesquisar no Google usando a voz, o que devemos fazer?',
        options: [
          'Falar diretamente no celular',
          'Tocar no microfone e depois falar',
          'Digitar e depois falar',
          'Abrir o WhatsApp primeiro'
        ],
        correct: 1,
        explanation: 'Primeiro tocamos no ícone do microfone, depois falamos o que queremos pesquisar.'
      },
      {
        id: 9,
        question: 'Onde encontramos o botão para desligar uma ligação de vídeo?',
        options: [
          'No canto superior esquerdo',
          'No centro inferior da tela (botão vermelho)',
          'No canto superior direito',
          'Não existe botão para desligar'
        ],
        correct: 1,
        explanation: 'O botão vermelho de telefone no centro inferior da tela encerra a chamada de vídeo.'
      },
      {
        id: 10,
        question: 'Para ver uma foto em tamanho grande na Galeria, devemos:',
        options: [
          'Deslizar a tela',
          'Tocar na foto uma vez',
          'Tocar duas vezes',
          'Segurar a foto'
        ],
        correct: 1,
        explanation: 'Tocar uma vez na foto abre ela em tamanho grande, ocupando toda a tela.'
      }
    ]
  },
  {
    id: 'hard',
    title: 'Nível 3: Difícil',
    description: 'Detalhes específicos e sequências completas.',
    questions: [
      {
        id: 1,
        question: 'Complete a sequência: Para pesquisar música no YouTube → [1] → [2] → Falar o nome da música',
        options: [
          '[1] Abrir YouTube [2] Tocar no microfone',
          '[1] Tocar no microfone [2] Abrir YouTube',
          '[1] Abrir Google [2] Tocar no microfone',
          '[1] Abrir WhatsApp [2] Tocar no microfone'
        ],
        correct: 0,
        explanation: 'A sequência completa é: Abrir YouTube → Tocar no microfone → Falar o nome da música.'
      },
      {
        id: 2,
        question: 'No WhatsApp, o que significa quando os dois tracinhos (✓✓) da mensagem ficam azuis?',
        options: [
          'A mensagem foi apagada',
          'A pessoa visualizou (leu) a mensagem',
          'A mensagem não foi enviada',
          'A pessoa está sem internet'
        ],
        correct: 1,
        explanation: 'Quando os dois tracinhos ficam azuis, significa que a outra pessoa abriu e visualizou sua mensagem.'
      },
      {
        id: 3,
        question: 'Para gravar um vídeo, em qual ordem fazemos as ações?',
        options: [
          'Abrir câmera → Mudar para modo vídeo → Aponte → Tocar botão vermelho → Tocar novamente para parar',
          'Abrir câmera → Tocar botão vermelho → Mudar para modo vídeo',
          'Mudar para modo vídeo → Abrir câmera → Tocar botão vermelho',
          'Aponte → Abrir câmera → Tocar botão vermelho'
        ],
        correct: 0,
        explanation: 'A ordem correta é: Abrir câmera → Mudar para modo vídeo → Aponte → Tocar botão vermelho para gravar → Tocar novamente para parar.'
      },
      {
        id: 4,
        question: 'O que acontece se soltarmos o botão do microfone antes de terminar de falar o áudio?',
        options: [
          'O áudio é enviado incompleto',
          'O áudio é apagado e não é enviado',
          'O áudio é salvo automaticamente',
          'Nada acontece, precisa tocar novamente'
        ],
        correct: 0,
        explanation: 'Se soltarmos antes de terminar, o áudio é enviado mesmo assim, com o que foi gravado até aquele momento.'
      },
      {
        id: 5,
        question: 'Para fazer uma ligação de vídeo pelo WhatsApp, qual é a sequência completa?',
        options: [
          'Abrir WhatsApp → Tocar no botão de vídeo → Escolher contato',
          'Abrir WhatsApp → Escolher contato → Tocar no botão de vídeo',
          'Escolher contato → Abrir WhatsApp → Tocar no botão de vídeo',
          'Tocar no botão de vídeo → Abrir WhatsApp → Escolher contato'
        ],
        correct: 1,
        explanation: 'A sequência correta é: Abrir WhatsApp → Escolher contato (abrir conversa) → Tocar no botão de vídeo no alto da tela.'
      },
      {
        id: 6,
        question: 'Na Galeria, para ver a foto anterior, devemos deslizar o dedo:',
        options: [
          'Para a esquerda',
          'Para a direita',
          'Para cima',
          'Para baixo'
        ],
        correct: 1,
        explanation: 'Para ver a foto anterior, deslizamos o dedo para a direita. Para a próxima, deslizamos para a esquerda.'
      },
      {
        id: 7,
        question: 'Qual é a diferença entre ligação normal e ligação de vídeo no WhatsApp?',
        options: [
          'Ligação normal usa botão verde, vídeo usa botão vermelho',
          'Ligação normal usa ícone de telefone, vídeo usa ícone de câmera',
          'Não há diferença',
          'Ligação normal é mais rápida'
        ],
        correct: 1,
        explanation: 'A ligação normal usa o ícone de telefone, enquanto a ligação de vídeo usa o ícone de câmera de vídeo.'
      },
      {
        id: 8,
        question: 'Para tirar uma selfie, após abrir a câmera, devemos:',
        options: [
          'Tocar no botão branco',
          'Tocar no ícone com duas flechas formando um círculo',
          'Deslizar a tela',
          'Tocar no botão vermelho'
        ],
        correct: 1,
        explanation: 'O ícone com duas flechas formando um círculo inverte a câmera para tirar uma selfie.'
      },
      {
        id: 9,
        question: 'Onde fica o botão do microfone na barra de pesquisa do YouTube?',
        options: [
          'No lado esquerdo',
          'No lado direito',
          'No centro',
          'Não existe botão de microfone'
        ],
        correct: 1,
        explanation: 'O botão do microfone fica no canto direito da barra de pesquisa do YouTube.'
      },
      {
        id: 10,
        question: 'Para encerrar uma ligação pelo aplicativo Telefone, tocamos em:',
        options: [
          'Botão verde',
          'Botão vermelho com telefone virado para baixo',
          'Botão azul',
          'Botão branco'
        ],
        correct: 1,
        explanation: 'O botão vermelho com o desenho de um telefone virado para baixo encerra a ligação.'
      }
    ]
  }
];

