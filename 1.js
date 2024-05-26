/*
  1. Basados en las imágenes solucionar los siguientes puntos:
    a. Describa el paso a paso del ejercicio (comente cada línea de
    código).
    b. Solucione el mismo ejercicio, utilizando solo promesas no
    async/await.
    c. Describa el paso a paso del ejercicio (comente cada línea de código)
*/

// Crea una función qeu flitra al usuario
const filtro = x => x.name === "TallerBasicoJS";

(async () => {
  // Leer archivo JSON
  let response = await fetch('main.json'); // Realiza una solicitud para obtener el archivo 'main.json'
  let user = await response.json(); // Convierte la respuesta en un objeto JSON

  // Consultar usuario en GitHub
  let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`);
  // Realiza una solicitud al GitHub usando el nombre del usuario del JSON

  let usuariogithub = await respuestGithub.json(); // Convierte la respuesta de GitHub en un objeto JSON

  if (!usuariogithub.ok) {
    console.error("Error de conexion")
  }

  // Iterar sobre los repositorios y buscar el repositorio llamado "SamuelDavidRuedaSuarezADSO"
  usuariogithub.forEach(element => {
    if (element.name === "TallerBasicoJS") { // Si el nombre del repositorio es "SamuelDavidRuedaSuarezADSO"
      console.log(element); // Imprime el repositorio en la consola
    }
  });

  // Filtrar el array de repositorios usando la función filtrar
  let data = usuariogithub.filter(filtro);
  console.log(data); // Imprime los repositorios filtrados
  console.log(usuariogithub); // Imprime todos los repositorios
})();



//SIn async/away y con promesas

// Leer el archivo JSON usando la promesa creada
leer.then(data => { // Maneja la promesa 'leer' y obtiene los datos del JSON una vez que se resuelve
  // Buscar al usuario "Samuel David" en el array de usuarios
  let user = data.users.find(user => user.name === "Samuel David"); // Busca un objeto usuario cuyo nombre sea "Samuel David" en el array 'users'
  
  // Si no se encuentra el usuario, lanzar un error
  if (!user) { // Verifica si no se encontró el usuario
    throw new Error("Usuario 'Samuel David' no encontrado."); // Lanza un error indicando que el usuario no fue encontrado
  }

  // Crear una promesa para consultar los repositorios del usuario en GitHub
  const consultar = new Promise((resolve, reject) => { // Crea una nueva promesa para manejar la solicitud a la API de GitHub
    // Hacer una solicitud a la API de GitHub para obtener los repositorios del usuario
    fetch(`https://api.github.com/users/${user.user}/repos`) // Realiza una solicitud fetch a la API de GitHub usando el nombre de usuario
      // Resolver la promesa con la respuesta convertida a JSON
      .then(response => resolve(response.json())) // Convierte la respuesta a JSON y resuelve la promesa
      // Rechazar la promesa si hay un error durante la solicitud
      .catch(error => reject(error)); // Rechaza la promesa si ocurre un error durante la solicitud
  });

  // Consultar los repositorios del usuario en GitHub usando la promesa creada
  consultar.then(usuariogithub => { // Maneja la promesa 'consultar' y obtiene los datos de los repositorios una vez que se resuelve
    // Buscar el repositorio "TallerBasicoJS" e imprimirlo si se encuentra
    usuariogithub.forEach(element => { // Recorre cada repositorio en el array 'usuariogithub'
      if (element.name === "TallerBasicoJS") { // Verifica si el nombre del repositorio es "TallerBasicoJS"
        console.log(element); // Imprime el repositorio encontrado en la consola
      }
    });

    // Filtrar los repositorios usando la función de filtrado y mostrarlos
    const dataFiltrada = usuariogithub.filter(filtrar); // Filtra los repositorios usando la función 'filtrar'
    console.log(dataFiltrada); // Imprime los repositorios filtrados en la consola
    console.log(usuariogithub); // Imprime todos los repositorios en la consola
  }).catch(error => { // Maneja cualquier error que ocurra al consultar los repositorios
    console.error("Hubo un error al consultar los repositorios:", error); // Imprime el error en la consola
  });
}).catch(error => { // Maneja cualquier error que ocurra al leer el archivo JSON
  console.error("Hubo un error al leer el archivo JSON:", error); // Imprime el error en la consola
});
