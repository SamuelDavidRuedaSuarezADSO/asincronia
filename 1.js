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




// Función de filtrado para buscar repositorios con el nombre "TallerBasicoJS"
const filtrar = x => x.name === "TallerBasicoJS";

// Crear una promesa para leer el archivo JSON
const leer = new Promise((resolve, reject) => {
  fetch('user.json')
    .then(response => resolve(response.json()))
    .catch(error => reject(error));
});

// Leer el archivo JSON usando la promesa creada
leer.then(data => {
  // Buscar al usuario "Samuel David"
  let user = data.users.find(user => user.name === "Samuel David");
  if (!user) {
    throw new Error("Usuario 'Samuel David' no encontrado.");
  }

  // Crear una promesa para consultar los repositorios del usuario en GitHub
  const consultar = new Promise((resolve, reject) => {
    fetch(`https://api.github.com/users/${user.user}/repos`)
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });

  // Consultar los repositorios del usuario en GitHub usando la promesa creada
  consultar.then(usuariogithub => {
    // Buscar el repositorio "TallerBasicoJS" e imprimirlo si se encuentra
    usuariogithub.forEach(element => {
      if (element.name === "TallerBasicoJS") {
        console.log(element);
      }
    });

    // Filtrar los repositorios usando la función de filtrado y mostrarlos
    const dataFiltrada = usuariogithub.filter(filtrar);
    console.log(dataFiltrada);
    console.log(usuariogithub);
  }).catch(error => {
    console.error("Hubo un error al consultar los repositorios:", error);
  });
}).catch(error => {
  console.error("Hubo un error al leer el archivo JSON:", error);
});
