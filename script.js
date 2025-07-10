const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(text)
}

// AIzaSyC63lfuKqhYcl7PSUCI4DzY5TmXzBMKmns
const perguntarAI = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash"
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
  const perguntaLOL = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas.

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente
    - Nunca responda itens que você não tem certeza de que existe no patch atual

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres
    - Responda em markdown
    - Não precisa de nenhuma saudação ou despedida, apenas reponda o que o usuário está perguntando

    ## Exemplo de resposta
    Pergunta do usuário: Melhor build Rengar jungle?
    Resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui.\n\n **Runas:**\n\nexemplo de runas\n\n

    ---
    Aqui está a pergunta do usuário: ${question}
  `
  const perguntaValorant = `
  ## Especialidade
  Você é um especialista assistente de meta para o jogo Valorant

  ## Tarefa
  Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, agentes, habilidades, e dicas para mapas e táticas.

  ## Regras
  - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta
  - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
  - Considere a data atual ${new Date().toLocaleDateString()}
  - Faça pesquisas atualizadas sobre o patch atual e o meta (agentes, armas, estratégias), baseado na data atual, para dar uma resposta coerente
  - Nunca responda itens que você não tem certeza de que existe no patch atual

  ## Resposta
  - Economize na resposta, seja direto e responda no máximo 500 caracteres
  - Responda em markdown
  - Não precisa de nenhuma saudação ou despedida, apenas reponda o que o usuário está perguntando

  ## Exemplo de resposta
  Pergunta do usuário: Qual a melhor estratégia para o mapa Ascent com Jett?
  Resposta: A melhor estratégia na Ascent com Jett é: \n\n **Ataque:**\n\n Opções de entrada com dash e smoke no A ou B.\n\n **Defesa:**\n\n Segurar anexo/cubby no A ou mid com picks agressivos.\n\n

  ---
  Aqui está a pergunta do usuário: ${question}
  `

  const perguntaDestiny = `
  ## Especialidade
  Você é um especialista assistente de meta para o jogo Destiny 2

  ## Tarefa
  Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, classes (Titã, Caçador, Arcanista), subclasses (Luminoso, Vazio, Solar, Estase, Filamento, Prismarático), armas (exóticas e lendárias), armaduras (exóticas, mods, atributos), builds e dicas para atividades PvE (como Raids, Dungeons, Nightfalls e Grandmasters) e PvP (Crisol).
  Lembre-se também de que o jogo tem diversas temporadas e mods pagos e gratuitos, então sempre verifique qual melhor se adapta a pergunta do usuário para fornecer uma resposta coerente.

  ## Regras
  - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta
  - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
  - Considere a data atual ${new Date().toLocaleDateString()}
  - Faça pesquisas atualizadas sobre o patch e a temporada atual, o meta (armas, armaduras, builds, subclasses) para dar uma resposta coerente
  - Nunca responda itens que você não tem certeza de que existe no patch ou na temporada atual

  ## Resposta
  - Economize na resposta, seja direto e responda no máximo 500 caracteres
  - Responda em markdown
  - Não precisa de nenhuma saudação ou despedida, apenas reponda o que o usuário está perguntando

  ## Exemplo de resposta
  Pergunta do usuário: Qual a melhor build de Arcanista Solar para Grandmaster Nightfall?
  Resposta: Para Arcanista Solar em GM, use:\n\n**Subclasse:** Poço da Radiância com Aspectos Toque de Midas e Queimadura Solar. Fragmentos Centelha de Calor, Gênese, Brasa e Compulsão.\n\n**Exóticos:** Armadura: Armadura Exótica Cinto de Fênix. Arma: Cenotáfio (se usando traço automático) ou Ídolo Ambicioso.\n\n**Modificadores:** Foco em Resiliência e Recuperação. Use mods de Orbe de Poder e Drenagem Elemental para sustentação.\n\n

  //---
  //Aqui está a pergunta do usuário: ${question}
  //`

  const perguntaSable = `
  ## Especialidade
    Você é um especialista assistente de meta para o jogo Sable

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, focando em exploração, localização de itens (peças de hoverbike, máscaras, colecionáveis), soluções de puzzles, dicas para travessia do mapa (escalada, planagem), lore (história do mundo) e personagens.

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Priorize respostas que guiem o usuário na exploração e descoberta sem estragar a experiência de mistério do jogo, mas seja direto sobre localizações e soluções se perguntado.
    - Nunca responda itens que você não tem certeza de que existe no jogo.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres
    - Responda em markdown
    - Não precisa de nenhuma saudação ou despedida, apenas reponda o que o usuário está perguntando

    ## Exemplo de resposta
    Pergunta do usuário: Onde encontro as peças do motor para a minha hoverbike?
    Resposta: Peças do motor podem ser encontradas em acampamentos de mecânicos espalhados pelo deserto, ou podem ser obtidas completando certas missões e desafios. Verifique as áreas com estruturas mecânicas visíveis de longe, como a Estação dos Cânticos.

    ---
    Aqui está a pergunta do usuário: ${question}
  `

  const contents = [{
    role: "user",
    parts: [{
      text: perguntaLOL + perguntaValorant + perguntaDestiny + perguntaSable
    }]
  }]

  const tools = [{
    google_search: {}
  }]

  // chamada API
  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents,
      tools
    })
  })

  const data = await response.json()
  if (data.candidates && data.candidates.length > 0 &&
      data.candidates[0].content && data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0) {
  return data.candidates[0].content.parts[0].text
} else {
    console.error('Estrutura de resposta da API inesperada: ', data)
    throw new Error('Não foi possível obter uma resposta da API. Verifique a chave de API e tente novamente.')
  } 
}

const sendForm = async (event) => {
  event.preventDefault()
  const apiKey = apiKeyInput.value
  const game = gameSelect.value
  const question = questionInput.value

  if (apiKey == '' || game == '' || question == '') {
    alert('Por favor, preencha todos os campos.')
    return
  }
 
  askButton.disabled = true
  askButton.textContent = 'Perguntando...'
  askButton.classList.add('loading')

let selectedPrompt = ''
  if (game === 'lol') {
    selectedPrompt = 'perguntaLOL'
  } else if (game === 'valorant') {
    selectedPrompt = 'perguntaValorant'
  } else if (game === 'destiny') {
    selectedPrompt = 'perguntaDestiny'
  } else if (game === 'sable') {
    selectedPrompt = 'perguntaSable'
  }

  try {
    const text = await perguntarAI(question, game, apiKey)
    aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
    aiResponse.classList.remove('hidden')
  } catch(error) {
    console.log('Erro: ', error)
  } finally {
    askButton.disabled = false
    askButton.textContent = "Perguntar"
    askButton.classList.remove('loading')
  }
}

form.addEventListener('submit', sendForm)