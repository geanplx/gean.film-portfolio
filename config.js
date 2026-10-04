/* =====================================================================
   CONFIGURAÇÃO DO PORTFÓLIO  —  EDITE APENAS ESTE ARQUIVO PARA O CONTEÚDO
   Textos, contatos, fotos e categorias ficam aqui.
   As cores e fontes ficam no início de css/style.css.
   ===================================================================== */
const SITE = {

  /* ---------- MARCA E IDENTIDADE ---------- */
  tema: "claro",                       // "claro" ou "escuro"
  marca: "Gean Pablo",        // nome profissional / marca (topo e rodapé)
  logo: "",                            // opcional: "images/logo.png" (se vazio, mostra o texto da marca)
  nome: "Gean Pablo",           // seu nome
  cidade: "Davinópolis, MA",
  rotulo: "Fotografia, filmmaking e edição de vídeo",       // linha pequena na capa
  status: "Disponível para novos projetos",                  // aviso com bolinha verde (deixe "" para esconder)
  tituloHero: "Imagens que guardam o momento.",   // frase grande da capa
  descricao: "Fotografia, filmmaking e edição de vídeo.",  // frase abaixo do título

  /* ---------- FOTOS DA CAPA E DO SOBRE ---------- */
  // Troque o nome do arquivo e salve a foto na pasta correspondente.
  imagemHero: "images/hero/foto-principal.jpg",
  posicaoHero: "center 12%",   // enquadramento da capa: "center 20%" sobe a imagem, "center 70%" desce
  imagemSobre: "images/sobre/minha-foto.jpg",

  /* ---------- POR QUE ESCOLHER (blocos numerados da página inicial) ---------- */
  tituloDiferenciais: ["Luz natural, gente de verdade", "e atenção a cada detalhe."],
  diferenciais: [
    { titulo: "Um olhar atento", texto: "Cada clique nasce da observação e do cuidado com o momento." },
    { titulo: "Direção leve", texto: "Orientação simples para você ficar à vontade e natural." },
    { titulo: "Edição com identidade", texto: "Cor e tratamento consistentes, com a sua cara." },
    { titulo: "Entrega organizada", texto: "Galeria pronta, em boa qualidade e dentro do prazo." }
  ],
  ctaTitulo: "Tem um projeto em mente? Vamos conversar.",
  ctaTexto: "Me chame no WhatsApp e conte o que você imagina.",

  /* ---------- SOBRE ---------- */
  biografia: [
    "Gean Pablo Lacerda Souza, 22 anos, Davinópolis — MA.",
    "Trabalho com fotografia, filmmaking e edição de vídeo, transformando momentos, ideias e histórias em conteúdo visual.",
    "Meu objetivo é criar registros que tenham significado — desde momentos importantes da vida até projetos, eventos e trabalhos profissionais. Busco unir criatividade, técnica e olhar pessoal para entregar imagens e vídeos que possam ser lembrados."
  ],
  // Cada serviço: só o nome, ou { titulo: "...", descricao: "..." }
  servicos: [
    { titulo: "Cobertura de eventos", descricao: "Festas, formaturas e celebrações registradas com naturalidade." },
    { titulo: "Ensaios e retratos", descricao: "Sessões individuais e de casal, com direção e leveza." },
    { titulo: "Filmmaking e edição de vídeo", descricao: "Vídeos e edição que transformam ideias e histórias em conteúdo visual." },
    { titulo: "Projetos autorais", descricao: "Séries pessoais, com olhar e narrativa próprios." }
  ],

  /* ---------- CONTATOS ---------- */
  contatos: {
    instagram: "gean.film",         // só o usuário, sem @
    whatsapp: "5599991481435",         // código do país + DDD + número, só números
    email: "geanpablo2208@gmail.com"   // opcional: deixe vazio para esconder
  },
  // Links extras (opcional). Adicione quantos quiser.
  redes: [
    // { nome: "Behance", url: "https://behance.net/seuusuario" }
  ],

  /* ---------- CATEGORIAS E FOTOS ----------
     Para criar uma categoria nova: copie um bloco, mude id, titulo e pasta,
     e crie a pasta em images/portfolio/.
     Cada foto pode ser só o nome do arquivo ("evento-01.jpg")
     ou um bloco com título e descrição:
       { arquivo: "evento-01.jpg", titulo: "Casamento", descricao: "Texto curto" }
  */
  categorias: [
    { id: "retratos", titulo: "Retratos", pasta: "images/portfolio/retratos/",
      descricao: "Pessoas, expressões e personalidade.",
      fotos: ["retrato-01.jpg", "retrato-02.jpg", "retrato-03.jpg", "retrato-04.jpg", "retrato-05.jpg", "retrato-06.jpg", "retrato-07.jpg"] },
    { id: "casais",   titulo: "Casais",   pasta: "images/portfolio/casais/",
      descricao: "Ensaios a dois, com leveza e cumplicidade.",
      fotos: ["casal-01.jpg", "casal-02.jpg", "casal-03.jpg", "casal-04.jpg", "casal-05.jpg", "casal-06.jpg", "casal-07.jpg", "casal-08.jpg", "casal-09.jpg"] },
    { id: "eventos",  titulo: "Eventos",  pasta: "images/portfolio/eventos/",
      descricao: "Coberturas de festas e celebrações.",
      fotos: ["evento-01.jpg", "evento-02.jpg"] },
    { id: "autoral",  titulo: "Autoral",  pasta: "images/portfolio/autoral/",
      descricao: "Meu olhar, sem encomenda.",
      fotos: ["foto-01.jpg", "foto-02.jpg"] }
  ],

  /* ---------- DEPOIMENTOS (opcional) ----------
     Deixe a lista vazia [] para esconder a seção. */
  depoimentos: [
    // { texto: "Trabalho incrível!", autor: "Nome do cliente", detalhe: "Casamento, 2025" }
  ],

  /* ---------- PACOTES / PREÇOS (opcional) ----------
     Deixe a lista vazia [] para esconder a seção. */
  pacotes: [
    // { nome: "Básico", preco: "R$ 000", itens: ["2 horas de cobertura", "50 fotos editadas"] }
  ],

  /* ---------- TEXTOS DAS SEÇÕES ---------- */
  textos: {
    menuInicio: "Início", menuServicos: "Serviços", menuPortfolio: "Portfólio", menuSobre: "Sobre", menuContato: "Contato",
    tituloSobre: "Sobre mim", tituloPortfolio: "Portfólio",
    tituloContato: "Vamos conversar?", textoContato: "Conte sobre o seu evento ou projeto.",
    tituloDepoimentos: "Depoimentos", tituloPacotes: "Pacotes",
    todas: "Todas", botaoPortfolio: "Ver fotos", botaoContato: "Chamar no WhatsApp", tituloDestaque: "Explore por série", rotuloDestaque: "Portfólio", rotuloDif: "Meu olhar", tituloServicos: "Serviços", verSerie: "Ver série",
    tituloCategorias: "Séries", statFotos: "fotografias", statSeries: "séries", tituloGaleria: "Todas as fotos", avisoExemplo: "Imagens de exemplo — substitua pelas suas fotos."
  },

  mostrarAvisoExemplo: false   // mude para false quando colocar suas fotos
};
