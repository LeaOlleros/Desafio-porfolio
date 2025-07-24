function main() {
  navComponent(document.querySelector(".navbar"));

  const servicesContainer = document.querySelector(".cards");
  console.log("Contenedor de servicios:", servicesContainer);

  getServices().then((services) => {
    services.forEach((service) => {
      const card = cardComponent(service);
      servicesContainer.appendChild(card);
    });
  });

  footer(document.querySelector(".footer"));
}
