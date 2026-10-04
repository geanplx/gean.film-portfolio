# Como editar seu portfólio

Você só precisa mexer em **3 lugares**:

- `js/config.js` → textos, contatos, nomes das fotos e categorias
- `css/style.css` → cores, fontes e espaçamentos (no começo do arquivo)
- pasta `images/` → suas fotografias

Para ver o site, abra o `index.html` no navegador. Depois de editar, salve e aperte **F5** na página.

> A foto da seção **Sobre** ainda é uma IMAGEM DE EXEMPLO. Troque pela sua.
> Se usar imagens de exemplo de novo, ligue o aviso com `mostrarAvisoExemplo: true` no `config.js`.

---

## 1. Onde colocar as fotografias
Dentro da pasta `images/`:

```
images/
├── hero/foto-principal.jpg      (capa)
├── sobre/minha-foto.jpg         (sua foto na seção Sobre)
└── portfolio/
    ├── retratos/
    ├── casais/
    ├── eventos/
    └── autoral/
```

Dica: use fotos em `.jpg`, com até ~2000 px no lado maior, para o site carregar rápido.

## 2. Como trocar a foto principal
1. Coloque sua foto em `images/hero/`.
2. Em `js/config.js`, ache `imagemHero` e escreva o nome do arquivo: `"images/hero/minha-capa.jpg"`.
3. Salve e atualize a página. (Mesma ideia para `imagemSobre`.)
4. Se o corte da capa cortar alguém, ajuste `posicaoHero` (ex.: `"center 20%"` ou `"center 70%"`).

## 3. Como adicionar uma nova fotografia
1. Coloque o arquivo na pasta da categoria, por exemplo `images/portfolio/eventos/casamento-01.jpg`.
2. Em `js/config.js`, ache a categoria `eventos` e adicione o nome na lista `fotos`:
```js
fotos: ["evento-01.jpg", "casamento-01.jpg"]
```
3. Se quiser título e descrição, use este formato:
```js
{ arquivo: "casamento-01.jpg", titulo: "Casamento Ana e Pedro", descricao: "Cerimônia ao pôr do sol." }
```
Atenção: vírgulas entre os itens, e o nome precisa ser **idêntico** ao do arquivo (maiúsculas e minúsculas contam).

## 4. Como remover uma fotografia
Apague o nome dela da lista `fotos` em `js/config.js`. (Se quiser, apague também o arquivo da pasta.)

## 5. Como criar uma nova categoria
1. Crie a pasta, por exemplo `images/portfolio/viagens/`.
2. Em `js/config.js`, copie um bloco de categoria inteiro e cole depois dele (com vírgula):
```js
{ id: "viagens", titulo: "Viagens", pasta: "images/portfolio/viagens/",
  descricao: "Lugares pelo mundo.",
  fotos: ["viagem-01.jpg", "viagem-02.jpg"] },
```
O botão de filtro aparece sozinho.

## 6. Onde alterar seu nome
Em `js/config.js`, no topo: `marca` (nome profissional), `nome` (seu nome) e `logo` (opcional: coloque `"images/logo.png"`).

## 7. Onde alterar os contatos
Em `js/config.js`, bloco `contatos`: `instagram` (sem @), `whatsapp` (só números, com 55 + DDD) e `email`. Outras redes ficam em `redes`.

## 8. Onde alterar os textos
Tudo em `js/config.js`: título da capa (`tituloHero`), `descricao`, `cidade`, `biografia` (cada linha é um parágrafo), `servicos` e a parte `textos` (títulos das seções).
Depoimentos e pacotes/preços: preencha as listas `depoimentos` e `pacotes` (há um exemplo comentado). Vazias, as seções ficam escondidas.

### Páginas e blocos novos (tudo em `js/config.js`)
O site agora tem páginas: Início, Portfólio, Serviços, Sobre e Contato. Cada série (categoria) aparece na página inicial como um cartão grande (mosaico) e abre numa página própria.
- `status`: o aviso com bolinha verde na capa (deixe `""` para esconder).
- `rotulo`: a linha pequena que aparece acima do seu nome na capa.
- `diferenciais` e `tituloDiferenciais`: os 4 blocos do "Meu olhar" (a segunda parte do título aparece em itálico com degradê).
- `servicos`: cada serviço tem `titulo` e `descricao`.
- `ctaTitulo` e `ctaTexto`: chamada final.

## 9. Onde alterar as cores
Em `css/style.css`, no bloco `:root` do começo: `--cor-fundo`, `--cor-texto`, `--cor-destaque` etc. Ali também ficam fontes, tamanhos, espaçamentos, bordas, número de colunas da galeria e velocidade das animações.
O tema padrão é claro. Para o tema escuro, em `js/config.js` use `tema: "escuro"`; com `tema: "auto"` o site segue o modo claro/escuro do aparelho.
Para trocar a fonte: escolha uma em fonts.google.com, troque o `<link>` no `index.html` e o nome em `--fonte-titulo` / `--fonte-texto`.

## 10. Como publicar o site (GitHub Pages, grátis)
1. Crie uma conta em github.com e um repositório novo (ex.: `portfolio`), público.
2. Envie todos os arquivos e pastas (botão **Add file → Upload files**), mantendo a estrutura.
3. Vá em **Settings → Pages**. Em *Branch*, escolha `main` e a pasta `/ (root)`. Salve.
4. Em alguns minutos o site abre em `https://seuusuario.github.io/portfolio/`.
5. Domínio próprio: compre um domínio, e em **Settings → Pages → Custom domain** digite-o e siga as instruções de DNS.

## Futuro: novas páginas
Copie o `index.html` com outro nome (ex.: `precos.html`) e adapte. As cores e fontes continuam vindo do mesmo `style.css`.

## Se algo quebrar
- Foto não aparece: confira o nome do arquivo e a pasta.
- Site em branco: provavelmente falta uma vírgula, aspas ou `]` em `config.js`. Aperte F12 no navegador e veja o erro em *Console*.
