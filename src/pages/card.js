function cardComponent(params) {
  const div = document.createElement("div");
  div.className = "card-containers";

  div.innerHTML = `
     <div class="card">
        <img src="${params.img}" alt="Imagen servicio" class="card-img">
        <div class="card-content">
           <h4 class="card-title">${params.titulo}</h4>
           <p class="card-text">${params.texto}</p>
        </div>
     </div>
    `;

  return div;
}

function getServices() {
  return fetch(
    "https://cdn.contentful.com/spaces/suqq7buvcyma/environments/master/entries?access_token=4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI&content_type=servicios&include=1"
  )
    .then((res) => res.json())
    .then((data) => {
      // data.items es un array de servicios
      const services = data.items.map((item) => {
        const fields = item.fields;
        const imgId = fields.img.sys.id;
        const asset = data.includes.Asset.find((a) => a.sys.id === imgId);
        const imageUrl = "https:" + asset.fields.file.url;

        return {
          titulo: fields.titulo,
          texto: fields.texto,
          img: imageUrl,
        };
      });

      return services; // devuelve array de objetos {titulo, texto, img}
    })
    .catch((error) => {
      console.error("Error al obtener servicios:", error);
      return [];
    });
}

function getWorks() {
  return fetch("https://cdn.contentful.com/spaces/suqq7buvcyma/environments/master/entries?access_token=4vVjti7vmNE7mPPoACDo1I4os6QlknOhkjq0F2QmqAI&content_type=trabajos&include=1")
    .then((res) => res.json())
    .then((data) => {
      return data.items.map((item) => {
        const imgId = item.fields.img.sys.id;
        const asset = data.includes.Asset.find((a) => a.sys.id === imgId);
        return {
          title: item.fields.title, // 
          texto: item.fields.text,
          img: "https:" + asset.fields.file.url,
        };
      });
    });
}