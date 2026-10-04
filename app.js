const $ = (s, el = document) => el.querySelector(s);

function iniciarSite() {
    try {
        if (typeof SITE === "undefined") {
            throw new Error("config.js não carregou.");
        }

        const T = SITE.textos || {};
        const C = SITE.contatos || {};

        const esc = (s) => {
            const d = document.createElement("div");
            d.textContent = s ?? "";
            return d.innerHTML;
        };

        const wa = C.whatsapp
            ? `https://wa.me/${C.whatsapp}`
            : "#";

        const ig = C.instagram
            ? `https://instagram.com/${C.instagram}`
            : "#";

        const categorias = (SITE.categorias || []).map(cat => ({
            ...cat,
            pasta: cat.pasta || "",
            lista: (cat.fotos || []).map(f => {
                const obj = typeof f === "string"
                    ? { arquivo: f }
                    : f;

                return {
                    src: (cat.pasta || "") + obj.arquivo,
                    titulo: obj.titulo || "",
                    descricao: obj.descricao || "",
                    cat: cat.titulo || ""
                };
            })
        }));

        const app = $("#app");

        if (!app) {
            throw new Error("Elemento #app não encontrado.");
        }

        const marca = SITE.logo
            ? `<img src="${SITE.logo}" alt="${esc(SITE.marca)}" class="logo-img">`
            : esc(SITE.marca);

        const rota = [
            ["#/", T.menuInicio || "Início"],
            ["#/portfolio", T.menuPortfolio || "Portfólio"],
            ["#/servicos", T.menuServicos || "Serviços"],
            ["#/sobre", T.menuSobre || "Sobre"],
            ["#/contato", T.menuContato || "Contato"]
        ];

        document.documentElement.dataset.tema = SITE.tema || "claro";
        document.title = `${SITE.marca || "GEAN.FILM"} — ${SITE.cidade || ""}`;

        app.innerHTML = `
            <header class="topo" id="topo">
                <a class="marca" href="#/">${marca}</a>

                <nav>
                    ${rota.map(([href, texto]) =>
                        `<a href="${href}">${esc(texto)}</a>`
                    ).join("")}
                </nav>
            </header>

            <main id="view"></main>

            <footer class="rodape">
                <a class="marca" href="#/">${marca}</a>
                <span>${esc(SITE.cidade || "")}</span>

                <span class="rl">
                    ${C.instagram
                        ? `<a href="${ig}" target="_blank" rel="noopener">@${esc(C.instagram)}</a>`
                        : ""}

                    ${C.whatsapp
                        ? `<a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>`
                        : ""}
                </span>

                <small>
                    © ${new Date().getFullYear()} ${esc(SITE.marca || "")}
                </small>
            </footer>

            <div class="lb" id="lb" hidden>
                <button class="lb-x" aria-label="Fechar">×</button>
                <button class="lb-p" aria-label="Anterior">‹</button>

                <figure>
                    <img id="lbImg" alt="">
                    <figcaption>
                        <span id="lbCap"></span>
                        <small id="lbN"></small>
                    </figcaption>
                </figure>

                <button class="lb-n" aria-label="Próxima">›</button>
            </div>
        `;

        const btn = (href, texto, ghost = false) => `
            <a class="btn${ghost ? " btn-ghost" : ""}"
               href="${href}"
               ${href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
                ${esc(texto)}
            </a>
        `;

        const card = cat => {
            const primeira = cat.lista[0];

            if (!primeira) return "";

            return `
                <a class="card" href="#/portfolio/${cat.id}">
                    <img src="${primeira.src}"
                         alt="${esc(cat.titulo)}"
                         loading="lazy">

                    <span class="seta">↗</span>

                    <span class="card-txt">
                        <b>${esc(cat.titulo)}</b>
                        <small>${cat.lista.length} ${esc(T.statFotos || "fotografias")}</small>
                    </span>
                </a>
            `;
        };

        const bento = () => `
            <div class="bento rv">
                ${categorias.map(card).join("")}
            </div>
        `;

        const contato = () => `
            <section class="contato rv">

                <div>
                    <h2>${esc(SITE.ctaTitulo || "Vamos conversar?")}</h2>

                    <p>
                        ${esc(SITE.ctaTexto || "Entre em contato para falar sobre seu projeto.")}
                    </p>
                </div>

                <div class="contato-links">

                    ${C.whatsapp ? `
                        <a href="${wa}" target="_blank" rel="noopener">
                            WhatsApp
                            <span>↗</span>
                        </a>
                    ` : ""}

                    ${C.instagram ? `
                        <a href="${ig}" target="_blank" rel="noopener">
                            Instagram
                            <span>↗</span>
                        </a>
                    ` : ""}

                    ${C.email ? `
                        <a href="mailto:${C.email}">
                            ${esc(C.email)}
                            <span>↗</span>
                        </a>
                    ` : ""}

                </div>

            </section>
        `;

        const views = {

            home: () => `
                <section class="hero">

                    ${SITE.status ? `
                        <p class="status">
                            <i></i>
                            ${esc(SITE.status)}
                        </p>
                    ` : ""}

                    <p class="rot">
                        ${esc(SITE.rotulo || "")}
                        ${SITE.cidade ? " · " + esc(SITE.cidade) : ""}
                    </p>

                    <h1>
                        ${esc(SITE.nome || SITE.marca || "Gean Pablo")}
                    </h1>

                    <div class="colagem">

                        ${
                            SITE.imagemHero
                            ? `<img src="${SITE.imagemHero}"
                                    alt="${esc(SITE.nome || "")}"
                                    style="--i:0">`
                            : ""
                        }

                        ${categorias.slice(0, 3).map((cat, i) => {
                            const foto = cat.lista[0];

                            return foto
                                ? `<img src="${foto.src}"
                                        alt="${esc(cat.titulo)}"
                                        style="--i:${i + 1}">`
                                : "";
                        }).join("")}

                    </div>

                    <div class="hero-base">

                        <p class="lead">
                            ${esc(SITE.tituloHero || "")}
                            ${esc(SITE.descricao || "")}
                        </p>

                        <div class="acoes">
                            ${btn("#/portfolio", T.botaoPortfolio || "Ver portfólio")}

                            ${C.whatsapp
                                ? btn(wa, T.botaoContato || "Chamar no WhatsApp", true)
                                : ""}
                        </div>

                    </div>

                </section>

                <section class="bloco">

                    <p class="rot rv">
                        ${esc(T.rotuloDestaque || "Portfólio")}
                    </p>

                    <h2 class="titulo rv">
                        ${esc(T.tituloDestaque || "Explore meu trabalho")}
                    </h2>

                    ${bento()}

                </section>

                <section class="olhar rv">

                    <p class="rot">
                        ${esc(T.rotuloDif || "Meu olhar")}
                    </p>

                    <h2>
                        ${esc((SITE.tituloDiferenciais || ["", ""])[0])}

                        <em>
                            ${esc((SITE.tituloDiferenciais || ["", ""])[1])}
                        </em>
                    </h2>

                    <div class="ogrid">

                        ${(SITE.diferenciais || []).map(d => `
                            <article>
                                <h3>${esc(d.titulo)}</h3>
                                <p>${esc(d.texto)}</p>
                            </article>
                        `).join("")}

                    </div>

                </section>

                ${contato()}
            `,

            portfolio: () => `
                <section class="pg">

                    <div class="cab">
                        <p class="rot">Portfólio</p>

                        <h1>
                            ${esc(T.tituloPortfolio || "Portfólio")}
                        </h1>
                    </div>

                    ${bento()}

                </section>

                ${contato()}
            `,

            servicos: () => `
                <section class="pg">

                    <div class="cab">
                        <p class="rot">${esc(SITE.marca || "")}</p>

                        <h1>
                            ${esc(T.tituloServicos || "Serviços")}
                        </h1>
                    </div>

                    <div class="scards">

                        ${(SITE.servicos || []).map(s => `
                            <article>
                                <h3>${esc(s.titulo)}</h3>
                                <p>${esc(s.descricao || "")}</p>
                            </article>
                        `).join("")}

                    </div>

                </section>

                ${contato()}
            `,

            sobre: () => `
                <section class="pg sobre">

                    ${
                        SITE.imagemSobre
                        ? `<img src="${SITE.imagemSobre}"
                                alt="${esc(SITE.nome || "")}">`
                        : ""
                    }

                    <div>

                        <p class="rot">
                            ${esc(SITE.cidade || "")}
                        </p>

                        <h1>
                            ${esc(T.tituloSobre || "Sobre mim")}
                        </h1>

                        <p class="nome">
                            ${esc(SITE.nome || "")}
                        </p>

                        ${(SITE.biografia || []).map(p =>
                            `<p>${esc(p)}</p>`
                        ).join("")}

                    </div>

                </section>

                ${contato()}
            `,

            contato: () => `
                <section class="pg">

                    <div class="cab">

                        <p class="rot">
                            ${esc(SITE.cidade || "")}
                        </p>

                        <h1>
                            ${esc(T.tituloContato || "Vamos conversar?")}
                        </h1>

                        <p class="lead">
                            ${esc(T.textoContato || "")}
                        </p>

                    </div>

                </section>

                ${contato()}
            `,

            serie: cat => `

                <section class="pg">

                    <a class="volta" href="#/portfolio">
                        ← ${esc(T.tituloPortfolio || "Portfólio")}
                    </a>

                    <div class="cab">

                        <p class="rot">
                            ${cat.lista.length} ${esc(T.statFotos || "fotografias")}
                        </p>

                        <h1>
                            ${esc(cat.titulo)}
                        </h1>

                        <p class="lead">
                            ${esc(cat.descricao || "")}
                        </p>

                    </div>

                    <div class="galeria">

                        ${cat.lista.map((foto, i) => `
                            <button class="ft" data-i="${i}">
                                <img src="${foto.src}"
                                     alt="${esc(foto.titulo || foto.cat)}"
                                     loading="lazy">
                            </button>
                        `).join("")}

                    </div>

                </section>

                ${contato()}
            `
        };

        let listaAtual = [];
        let indiceAtual = 0;

        function render() {

            const partes = (location.hash || "#/").split("/");

            const rota = partes[1] || "";
            const id = partes[2];

            const categoria = categorias.find(c => c.id === id);

            if (rota === "portfolio" && categoria) {
                listaAtual = categoria.lista;
                $("#view").innerHTML = views.serie(categoria);
            } else if (rota === "portfolio") {
                $("#view").innerHTML = views.portfolio();
            } else {
                $("#view").innerHTML =
                    (views[rota] || views.home)();
            }

            document.querySelectorAll(".topo nav a").forEach(a => {
                a.classList.toggle(
                    "on",
                    a.getAttribute("href") === `#/${rota}`
                );
            });

            scrollTo(0, 0);

            if ("IntersectionObserver" in window) {

                const observer = new IntersectionObserver(entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("in");
                            observer.unobserve(entry.target);

                        }

                    });

                }, { threshold: 0.12 });

                document.querySelectorAll(".rv")
                    .forEach(el => observer.observe(el));
            }
        }

        function abrir(indice) {

            if (!listaAtual.length) return;

            indiceAtual =
                (indice + listaAtual.length) %
                listaAtual.length;

            const foto = listaAtual[indiceAtual];

            $("#lbImg").src = foto.src;
            $("#lbImg").alt = foto.titulo || foto.cat;

            $("#lbCap").textContent =
                [foto.titulo || foto.cat, foto.descricao]
                    .filter(Boolean)
                    .join(" — ");

            $("#lbN").textContent =
                `${indiceAtual + 1} / ${listaAtual.length}`;

            $("#lb").hidden = false;
            document.body.classList.add("trava");
        }

        function fechar() {

            $("#lb").hidden = true;
            document.body.classList.remove("trava");
        }

        $("#view").addEventListener("click", e => {

            const botao = e.target.closest(".ft");

            if (botao) {
                abrir(Number(botao.dataset.i));
            }

        });

        $(".lb-x").addEventListener("click", fechar);

        $(".lb-p").addEventListener("click", () =>
            abrir(indiceAtual - 1)
        );

        $(".lb-n").addEventListener("click", () =>
            abrir(indiceAtual + 1)
        );

        $("#lb").addEventListener("click", e => {

            if (e.target.id === "lb") {
                fechar();
            }

        });

        document.addEventListener("keydown", e => {

            if ($("#lb").hidden) return;

            if (e.key === "Escape") fechar();

            if (e.key === "ArrowLeft")
                abrir(indiceAtual - 1);

            if (e.key === "ArrowRight")
                abrir(indiceAtual + 1);

        });

        window.addEventListener("hashchange", render);

        window.addEventListener("scroll", () => {

            const topo = $("#topo");

            if (topo) {
                topo.classList.toggle("rolou", scrollY > 10);
            }

        }, { passive: true });

        render();

    } catch (erro) {

        console.error("Erro ao carregar o GEAN.FILM:", erro);

        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:30px;
                font-family:Arial,sans-serif;
                background:#f3f4f7;
                color:#111;
            ">
                <div style="
                    max-width:700px;
                    width:100%;
                    background:white;
                    padding:40px;
                    border-radius:20px;
                    box-shadow:0 20px 60px rgba(0,0,0,.12);
                ">
                    <h1>GEAN.FILM</h1>

                    <p>
                        O site encontrou um erro ao carregar.
                    </p>

                    <pre style="
                        background:#f1f1f1;
                        padding:20px;
                        border-radius:10px;
                        overflow:auto;
                    ">${esc(erro.message)}</pre>

                    <p>
                        Verifique se os arquivos
                        <strong>config.js</strong>,
                        <strong>app.js</strong> e
                        <strong>style.css</strong>
                        estão na raiz do projeto.
                    </p>
                </div>
            </div>
        `;
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarSite);
} else {
    iniciarSite();
}
