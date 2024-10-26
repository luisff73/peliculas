function carga_peliculas() {
  // Limpiamos el div para evitar duplicación
  divpeliculas.innerHTML = '';
  fetch('http://localhost:3000/peliculas')
    .then((response) => response.json())
    .then((json) => {
      peliculas = json;

      // Añadimos al div el contenido obtenido
      for (let i = 0; i < peliculas.length; i++) {
        divpeliculas.innerHTML += `
          <div data-key='${peliculas[i].id}'>
            <p>Nombre: ${peliculas[i].title}</p>
            <p>Genero: ${peliculas[i].content}</p>
            <p>Año Rodaje: ${peliculas[i].anyo}</p>
            <img src=${peliculas[i].imagen} width="200px" /><br />
            <button onclick="eliminar(this)">Eliminar pelicula</button>
          </div>
        `;
      }
    })
    .catch((error) => console.error('Error fetching data:', error));
}

function crear() {
  let peliculas = {
    title: formulario.titulo.value,
    content: formulario.genero.value,
    anyo: formulario.anyo.value,
    imagen: "imagen.webp" // Imagen estática
  };

  fetch("http://localhost:3000/peliculas", {
    method: "POST",
    body: JSON.stringify(peliculas),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json); // Corregido el typo en console.log
      peliculas.id = json.id;
      divpeliculas.innerHTML += `
        <div data-key='${peliculas.id}'>
          <p>Titulo: ${peliculas.title}</p>
          <p>Genero: ${peliculas.content}</p>
          <p>Año: ${peliculas.anyo}</p>
          <img src=${peliculas.imagen}/>
          <button onclick="eliminar(this)">Eliminar</button>
        </div>
      `;
    });
}

function eliminar(peliculas) {
  let id = peliculas.closest("div").getAttribute("data-key");
  peliculas.closest("div").remove();
  fetch(`http://localhost:3000/peliculas/${id}`, {
    method: "DELETE",
  });
}

function borrarTodos() {
  // Recorremos toda la colección y borramos uno a uno
  fetch(`http://localhost:3000/peliculas`)
    .then(response => response.json())
    .then(data => {   
      data.forEach(pelicula => {
        fetch(`http://localhost:3000/peliculas/${pelicula.id}`, {
          method: "DELETE",
        });
      });
      divpeliculas.innerHTML = ""; // Vaciamos el div después de borrar
    });
}

// Llamamos a carga_peliculas para cargar los datos
carga_peliculas(); 
