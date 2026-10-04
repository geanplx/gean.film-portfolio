/* Monta o site a partir de js/config.js (páginas por "#/rota"). Normalmente você NÃO precisa editar este arquivo. */
const $ = (s, el = document) => el.querySelector(s);
const T = SITE.textos, C = SITE.contatos;
const esc = s => { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; };
const foto = (cat, f) => { const o = typeof f === "string" ? { arquivo: f } : f;
  return { src: cat.pasta + o.arquivo, titulo: o.titulo || "", descricao: o.descricao || "", cat: cat.titulo }; };
const cats = SITE.categorias.map(k => ({ ...k, lista: k.fotos.map(f => foto(k, f)) }));
const servicos = SITE.servicos.map(s => typeof s === "string" ? { titulo: s, descricao: "" } : s);
const wa = `https://wa.me/${C.whatsapp}`, ig = `https://instagram.com/${C.instagram}`;
const marca = SITE.logo ? `<img src="${SITE.logo}" alt="${esc(SITE.marca)}" class="logo-img">` : esc(SITE.marca);
const btn = (h, t, g) => `<a class="btn${g ? " btn-ghost" : ""}" href="${h}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`;
document.documentElement.dataset.tema = SITE.tema === "auto" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro") : (SITE.tema || "claro");
document.title = `${SITE.marca} — ${SITE.cidade}`;
let lista = [], idx = 0;
const palavras = SITE.nome.split(" "), nomeHtml = `${esc(palavras[0])}${palavras.length > 1 ? ` <em>${esc(palavras.slice(1).join(" "))}</em>` : ""}`;
const colagem = [[SITE.imagemHero, 0], ...cats.slice(0, 4).map((k, i) => [k.lista[i % k.lista.length].src, 0])].slice(0, 4);

const rota = [["#/", T.menuInicio], ["#/portfolio", T.menuPortfolio], ["#/servicos", T.menuServicos], ["#/sobre", T.menuSobre], ["#/contato", T.menuContato]];
$("#app").innerHTML = `
<header class="topo" id="topo"><a class="marca" href="#/">${marca}</a><nav>${rota.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</nav></header>
<main id="view"></main>
<footer class="rodape"><a class="marca" href="#/">${marca}</a><span>${esc(SITE.cidade)}</span>
  <span class="rl"><a href="${ig}" target="_blank" rel="noopener">@${esc(C.instagram)}</a><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></span>
  <small>© ${new Date().getFullYear()} ${esc(SITE.marca)}</small></footer>
<div class="lb" id="lb" hidden><button class="lb-x" aria-label="Fechar">×</button><button class="lb-p" aria-label="Anterior">‹</button>
  <figure><img id="lbImg" alt=""><figcaption><span id="lbCap"></span><small id="lbN"></small></figcaption></figure><button class="lb-n" aria-label="Próxima">›</button></div>`;

const card = k => `<a class="card" href="#/portfolio/${k.id}"><img src="${k.lista[0].src}" alt="" loading="lazy"><span class="seta">↗</span>
  <span class="card-txt"><b>${esc(k.titulo)}</b><small>${k.lista.length} ${T.statFotos}</small></span></a>`;
const bento = () => `<div class="bento rv">${cats.map(card).join("")}</div>`;
const cab = (rot, tit, txt) => `<div class="cab"><p class="rot">${rot}</p><h1>${tit}</h1>${txt ? `<p class="lead">${txt}</p>` : ""}</div>`;
const contato = () => `<section class="contato rv"><div><h2>${esc(SITE.ctaTitulo)}</h2><p>${esc(SITE.ctaTexto)}</p></div><div class="contato-links">
  ${[["WhatsApp", wa], ["Instagram", ig], ...(C.email ? [[C.email, "mailto:" + C.email]] : []), ...SITE.redes.map(r => [r.nome, r.url])].map(([t, h]) =>
  `<a href="${h}" target="_blank" rel="noopener">${esc(t)}<span>↗</span></a>`).join("")}</div></section>`;

const views = {
  home: () => `
<section class="hero">${SITE.status ? `<p class="status"><i></i>${esc(SITE.status)}</p>` : ""}<p class="rot">${esc(SITE.rotulo)} · ${esc(SITE.cidade)}</p><h1>${nomeHtml}</h1>
  <div class="colagem">${colagem.map(([s], i) => `<img src="${s}" alt="" style="--i:${i}">`).join("")}</div>
  <div class="hero-base"><p class="lead">${esc(SITE.tituloHero)} ${esc(SITE.descricao)}</p><div class="acoes">${btn("#/portfolio", T.botaoPortfolio)}${btn(wa, T.botaoContato, 1)}</div></div></section>
<section class="bloco"><p class="rot rv">${T.rotuloDestaque}</p><h2 class="titulo rv">${T.tituloDestaque}</h2>${bento()}</section>
<section class="olhar rv"><p class="rot">${T.rotuloDif}</p><h2>${esc(SITE.tituloDiferenciais[0])} <em>${esc(SITE.tituloDiferenciais[1])}</em></h2>
  <div class="ogrid">${SITE.diferenciais.map(d => `<article><h3>${esc(d.titulo)}</h3><p>${esc(d.texto)}</p></article>`).join("")}</div></section>
${SITE.depoimentos.length ? `<section class="olhar rv"><p class="rot">${T.tituloDepoimentos}</p><div class="ogrid">${SITE.depoimentos.map(d => `<article><h3>“${esc(d.texto)}”</h3><p>${esc(d.autor)}${d.detalhe ? " · " + esc(d.detalhe) : ""}</p></article>`).join("")}</div></section>` : ""}
${contato()}`,
  portfolio: () => `<section class="pg">${cab(T.rotuloDestaque, T.tituloPortfolio, "")}${bento()}</section>${contato()}`,
  servicos: () => `<section class="pg">${cab(esc(SITE.marca), T.tituloServicos, "")}<div class="scards">${servicos.map(s => `<article><h3>${esc(s.titulo)}</h3><p>${esc(s.descricao || "")}</p></article>`).join("")}</div>
  ${SITE.pacotes.length ? `<div class="scards">${SITE.pacotes.map(p => `<article><h3>${esc(p.nome)}</h3><strong>${esc(p.preco)}</strong><p>${p.itens.map(esc).join("<br>")}</p></article>`).join("")}</div>` : ""}</section>${contato()}`,
  sobre: () => `<section class="pg sobre"><img src="${SITE.imagemSobre}" alt="${esc(SITE.nome)}"><div><p class="rot">${esc(SITE.cidade)}</p><h1>${T.tituloSobre}</h1>
  <p class="nome">${esc(SITE.nome)}</p>${SITE.biografia.map(p => `<p>${esc(p)}</p>`).join("")}</div></section>${contato()}`,
  contato: () => `<section class="pg">${cab(esc(SITE.cidade), T.tituloContato, T.textoContato)}</section>${contato()}`,
  serie: k => { const prox = cats[(cats.indexOf(k) + 1) % cats.length]; lista = k.lista;
    return `<section class="pg"><a class="volta" href="#/portfolio">← ${T.tituloPortfolio}</a>${cab(`${k.lista.length} ${T.statFotos}`, esc(k.titulo), esc(k.descricao || ""))}
  <div class="galeria">${k.lista.map((f, j) => `<button class="ft" data-i="${j}"><img src="${f.src}" alt="${esc(f.titulo || f.cat)}" loading="lazy"></button>`).join("")}</div>
  <a class="prox" href="#/portfolio/${prox.id}"><small>${T.verSerie}</small><b>${esc(prox.titulo)} →</b></a></section>`; }
};
function render() {
  const [, r, id] = (location.hash || "#/").split("/"); const k = cats.find(c => c.id === id);
  $("#view").innerHTML = r === "portfolio" ? (k ? views.serie(k) : views.portfolio()) : (views[r] || views.home)();
  document.querySelectorAll(".topo nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === `#/${r || ""}`));
  scrollTo(0, 0);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
}
function abrir(i) {
  idx = (i + lista.length) % lista.length; const f = lista[idx];
  $("#lbImg").src = f.src; $("#lbImg").alt = f.titulo || f.cat;
  $("#lbCap").textContent = [f.titulo || f.cat, f.descricao].filter(Boolean).join(" — "); $("#lbN").textContent = `${idx + 1} / ${lista.length}`;
  $("#lb").hidden = false; document.body.classList.add("trava");
}
const fechar = () => { $("#lb").hidden = true; document.body.classList.remove("trava"); };
$("#view").onclick = e => { const b = e.target.closest(".ft"); if (b) abrir(+b.dataset.i); };
$(".lb-x").onclick = fechar; $(".lb-p").onclick = () => abrir(idx - 1); $(".lb-n").onclick = () => abrir(idx + 1);
$("#lb").onclick = e => { if (e.target.id === "lb") fechar(); };
document.onkeydown = e => { if ($("#lb").hidden) return; if (e.key === "Escape") fechar(); if (e.key === "ArrowLeft") abrir(idx - 1); if (e.key === "ArrowRight") abrir(idx + 1); };
addEventListener("scroll", () => $("#topo").classList.toggle("rolou", scrollY > 10), { passive: true });
addEventListener("hashchange", render); render();
