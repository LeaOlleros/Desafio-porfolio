const SPACE_ID = "suqq7buvcyma";
const ACCESS_TOKEN = "4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI";

("q7buvcyma/environments/master/entries?access_token=4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI&content_type=bienvenida&include=1");

function getBienvenida() {
  return fetch(
    "https://cdn.contentful.com/spaces/suqq7buvcyma/environments/master/entries?access_token=4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI&content_type=bienvenida&include=1"
  )
    .then((res) => res.json())
    .then((data) => {
      const { titulo, img } = data.items[0].fields;
      const imageUrl = `https:${
        data.includes.Asset.find((a) => a.sys.id === img.sys.id).fields.file.url
      }`;

      return {
        title: titulo.replace(
          "Soy Augusto",
          '<span class="highlight">Soy Augusto</span>'
        ),
        image: imageUrl,
      };
    })
    .catch((error) => console.error("Error al obtener bienvenida:", error));
}

function renderBienvenida(data) {
  document.querySelector(".main__content-title").innerHTML = data.title;
  document.querySelector(".main__content-img").src = data.image;
}

function getPresentacion() {
  return fetch(
    "https://cdn.contentful.com/spaces/suqq7buvcyma/environments/master/entries?access_token=4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI&content_type=presentacion&include=1"
  )
    .then((res) => res.json())
    .then((data) => {
      const presentacion = data.items[0].fields;
      const imageId = presentacion.img.sys.id;
      const asset = data.includes.Asset.find((a) => a.sys.id === imageId);
      const imageUrl = "https:" + asset.fields.file.url;
      return {
        title: presentacion.titulo,
        text: presentacion.texto,
        image: imageUrl,
      };
    })
    .catch((error) => console.error("Error al obtener presentación:", error));
}

function renderPresentacion(data) {
  document.querySelector(".presentation__content-title").textContent =
    data.title;
  document.querySelector(".presentation__content-text").textContent = data.text;
  document.querySelector(".presentation__content-img").src = data.image;
}

function main() {
  navComponent(document.querySelector(".navbar"));

  getBienvenida().then(renderBienvenida);

  getPresentacion().then(renderPresentacion);

  const servicesContainer = document.querySelector(".cards");

  getServices().then((services) => {
    services.forEach((service) => {
      const card = cardComponent(service);
      servicesContainer.appendChild(card);
    });
  });

  const form = document.querySelector(".form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const mensaje = document.querySelector("#mensaje").value;

    const body = {
      to: "augustoyt21@gmail.com", 
      message: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    };

    const optionsForm = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    fetch("https://apx.school/api/utils/email-to-student", optionsForm)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el envío");
        }
        return response.json();
      })
      .then((data) => {
        const sendMessage = document.querySelector(".send-message");
        sendMessage.classList.remove("error");
        sendMessage.classList.add("good");
        sendMessage.textContent = "El mensaje se envió correctamente";
      })
      .catch((err) => {
        const sendMessage = document.querySelector(".send-message");
        sendMessage.classList.remove("good");
        sendMessage.classList.add("error");
        sendMessage.textContent =
          "El mensaje no pudo enviarse. Intente nuevamente en unos minutos";
      });
  });


  footer(document.querySelector(".footer"));
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  console.log(form); // Esto debería mostrar el formulario en la consola

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Esto evita la recarga
    console.log("Submit capturado"); // Esto debería aparecer en la consola
    // Aquí va el resto del código para manejar el envío
  });

  // Llama a la función footer aquí, asegurate de pasarle el contenedor correcto
  const container = document.querySelector(".footer-container"); // Asegurate de que exista
  footer(container);
});


}

main();