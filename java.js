let contenedor = document.getElementById("contenedor");

fetch("https://dragonball-api.com/api/characters")
  .then(res => res.json())
  .then(data => {
    let lista = data.items;

    lista.forEach(pers => {
      let div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
        <img src="${pers.image}">
        <div class="info">
          <span class="nombre">${pers.name}</span>
          <span>Ki: ${pers.ki}</span>
          <span>Ki Máximo: ${pers.maxKi}</span>
          <span>Raza: ${pers.race}</span>
          <span>Género: ${pers.gender}</span>
          <span>Afiliación: ${pers.affiliation}</span>
          <span>Planeta de origen: ${pers.originPlanet}</span>
          <span"><strong>Descripción:</strong> ${pers.description}</span>
        </div>
      `;

      contenedor.appendChild(div);
    });
  })
  .catch(() => {
    contenedor.innerHTML = "<p>Error al cargar personajes.</p>";
  });

