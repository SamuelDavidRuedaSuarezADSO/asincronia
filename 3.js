/*
  3. Basado en la solución del punto 2, transforme esta solución utilizando
  async/await
    a. muestre los repositorios públicos de cada aprendiz en consola.
    b. Una todos los resultados en un solo arreglo
    c. Filtre la consulta con solo los aprendices que tengan el rol de
    aprendiz, esta solución se deba dar antes de realizar la solicitud al
    api
*/

// Función para leer y filtrar usuarios aprendices del archivo JSON
function leer() {
  return new Promise((resolve, reject) => { // Crea una nueva promesa
    fetch('user.json') // Realiza una solicitud fetch para obtener el archivo 'user.json'
      .then(response => { // Maneja la respuesta de la solicitud fetch
        return response.json(); // Convierte la respuesta a formato JSON
      })
      .then(data => { // Maneja los datos convertidos a JSON
        resolve(data.users.filter(usuario => usuario.aprendiz)); // Filtra los usuarios que son aprendices y resuelve la promesa con estos usuarios
      });
  });
}

// Función asincrónica para obtener los repositorios públicos de un usuario
async function coger(usuario) {
  let response = await fetch(`https://api.github.com/users/${usuario.user}/repos`); // Realiza una solicitud fetch a la API de GitHub para obtener los repositorios del usuario
  let repos = await response.json(); // Convierte la respuesta a formato JSON

  let trabajos = []; // Inicializa un array vacío para almacenar los repositorios públicos
  for (let i = 0; i < repos.length; i++) { // Itera sobre los repositorios
    if (!repos[i].private) { // Verifica si el repositorio no es privado
      trabajos.push(repos[i]); // Añade el repositorio público al array 'trabajos'
    }
  }

  return trabajos; // Devuelve el array de repositorios públicos
}

// Función asincrónica para mostrar los repositorios públicos de los usuarios aprendices
async function ver() {
  let usuarios = await leer(); // Llama a la función 'leer' y espera a que se resuelva para obtener los usuarios aprendices
  let aprendices = usuarios.filter(usuario => usuario.aprendiz); // Filtra los usuarios que son aprendices

  let todosRepos = []; // Inicializa un array para almacenar todos los repositorios públicos

  for (const usuario of aprendices) { // Itera sobre cada usuario aprendiz
    const repositorios = await coger(usuario); // Llama a la función 'coger' para obtener los repositorios públicos del usuario
    todosRepos.push(...repositorios); // Añade los repositorios obtenidos al array 'todosRepos'

    // Muestra en la consola los repositorios públicos del usuario
    console.log(`Repositorios públicos de ${usuario.name}:`);
    console.table(repositorios.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));
  }

  // Muestra en la consola todos los repositorios públicos de los aprendices
  console.log('Todos los repositorios públicos de los aprendices:');
  console.table(todosRepos.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));
}

ver(); // Llama a la función 'ver' para iniciar el proceso



