function navComponent(el) {
  const componenteEl = document.createElement("div");

  componenteEl.innerHTML = `
      <nav>
        <div class="nav">
          <a href="index.html" class="nav__logo">
            <img src="img/logo-personal.jpg" alt="logo" class="nav__logo-img"/>
          </a>
          <span class="abrir-ventana">
            <img src="img/menu.png" alt="menu" class="nav__logo-menu"/>
          </span>
        <div class="nav__desktop">
          <ul class="nav__links">
           <li class="nav__link"><a href="portfolio.html">Portfolio</a></li>
           <li class="nav__link"><a href="servicios.html">Servicios</a></li>
           <li class="nav__link"><a href="contacto.html">Contacto</a></li>
          </ul>
         </div>
        </div>
        <div class="ventana">
          <span class="ventana__cerrar">X</span>
          <ul class="ventana__contenido">
            <li class="ventana__contenido-item"><a href="portfolio.html">Portfolio</a></li>
            <li class="ventana__contenido-item"><a href="servicios.html">Servicios</a></li>
            <li class="ventana__contenido-item"><a href="contacto.html">Contacto</a></li>
          </ul>
        </div>
      </nav>
    `;

  const botonAbrir = componenteEl.querySelector(".abrir-ventana");
  const ventanaEl = componenteEl.querySelector(".ventana");
  const botonCerrar = componenteEl.querySelector(".ventana__cerrar");

  botonAbrir.addEventListener("click", () => {
    ventanaEl.style.display = "inherit";
  });

  botonCerrar.addEventListener("click", () => {
    ventanaEl.style.display = "";
  });

  el.appendChild(componenteEl);
}