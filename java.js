let lista = document.querySelector("#personajes-lista");

function cargarPersonajes(apiUrl) {
  lista.innerHTML = "Cargando personajes...";

  fetch(apiUrl)
    .then(res => res.json())
    .then(datos => {
      lista.innerHTML = "";

      let personajes = Array.isArray(datos) ? datos : datos.items;

      if (!personajes || personajes.length === 0) {
        lista.innerHTML = "No se encontraron personajes.";
        return;
      }

      for (let i = 0; i < personajes.length; i++) {
        let personaje = personajes[i];

        let li = document.createElement("li");
        let info = "";

        for (let clave in personaje) {
          if (clave === "image") continue;
          info += `<span><strong>${clave}:</strong> ${personaje[clave]}</span>`;
        }

        li.innerHTML = `
          <img src="${personaje.image}" alt="${personaje.name}">
          <div class="info">
            ${info}
          </div>
        `;
      }
    })

}

cargarPersonajes("https://dragonball-api.com/api/characters");
