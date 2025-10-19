
let contenedor = document.querySelector("#resultados");
let botonbl1 = document.querySelector("#botonbl1");
let botonbl2 = document.querySelector("#botonbl2");
let botondfb = document.querySelector("#botondfb");

function cargarLiga(apiUrl, nombreLiga) {
  contenedor.innerHTML = `Cargando ${nombreLiga}...`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(datos => {
      contenedor.innerHTML = "";

      if (datos.length === 0) {
        contenedor.innerHTML = "No hay partidos disponibles.";
        return;
      }

      datos.forEach(partido => {
        let equipo1 = partido.Team1?.TeamName || "Equipo 1";
        let equipo2 = partido.Team2?.TeamName || "Equipo 2";
        let fecha = new Date(partido.MatchDateTimeUTC).toLocaleString();
        let resultado = "Aún no jugado";

        if (partido.MatchResults && partido.MatchResults.length > 0) {
          let r = partido.MatchResults[partido.MatchResults.length - 1];
          resultado = ` ${r.PointsTeam1} - ${r.PointsTeam2}`;
        }

        contenedor.innerHTML += `
          <div class="card">
            <h3>${equipo1} vs ${equipo2}</h3>
            <p> ${fecha}</p>
            <p>${resultado}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      console.error("Error al cargar datos:", error);
      contenedor.innerHTML = " Error al cargar los datos.";
    });
}

botonbl1.onclick = () => cargarLiga("https://api.openligadb.de/getmatchdata/bl1/2024", "Bundesliga 1");
botonbl2.onclick = () => cargarLiga("https://api.openligadb.de/getmatchdata/bl2/2024", "Bundesliga 2");
botondfb.onclick = () => cargarLiga("https://api.openligadb.de/getmatchdata/dfb/2024", "DFB Pokal");
