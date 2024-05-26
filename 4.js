/*
  4. Basados en la solución del punto 3 daremos solución a los siguientes
  puntos:
    a. Muestre solo los resultados que tengan menos de 5 repositorios
    públicos en una tabla por consola.
    b. Muestre solo los resultados de los repositorios que contengan la
    palabra JavaScript en su name
    c. Ordene de menor a mayor según el nombre del repositorio
    d. Muestre solo los repositorios que tengan mas de cinco letras en su
    nombre
*/

// Función para leer el archivo users.json y devolver una promesa con los datos
function leer() {
  return new Promise((resolve) => {  // Crea una nueva promesa
    fetch('user.json')  // Hace una solicitud HTTP para obtener el archivo users.json
      .then(response => response.json())  // Convierte la respuesta a formato JSON
      .then(data => {
        resolve(data.users.filter(usuario => usuario.aprendiz));  // Filtra solo los usuarios que son aprendices y resuelve la promesa
      });
  });
}

// Función para obtener los repositorios públicos de un usuario
async function obtener(usuario) {
  const response = await fetch(`https://api.github.com/users/${usuario.user}/repos`);  // Hace una solicitud HTTP para obtener los repositorios del usuario
  const repos = await response.json();  // Convierte la respuesta a formato JSON
  
  let repositoriosPublicos = [];  // Crea un arreglo vacío para almacenar los repositorios públicos
  repos.forEach(repo => {
    if (!repo.private) {  // Verifica si el repositorio no es privado
      repositoriosPublicos.push(repo);  // Agrega el repositorio público al arreglo
    }
  });
  
  return repositoriosPublicos;  // Devuelve el arreglo de repositorios públicos
}

// Función principal para ejecutar el proceso
async function ver() {
  // Obtener usuarios y filtrar aprendices
  let usuarios = await leer();  // Espera a que se lean los usuarios del archivo JSON
  let aprendices = usuarios.filter(usuario => usuario.aprendiz);  // Filtra los usuarios que son aprendices

  // Unir todos los resultados en un solo arreglo
  let todosRepos = [];  // Crea un arreglo vacío para almacenar todos los repositorios
  await Promise.all(aprendices.map(async usuario => {  // Recorre cada aprendiz
    let repositorios = await obtener(usuario);  // Obtiene los repositorios del usuario
    todosRepos.push({ usuario, repositorios });  // Agrega el usuario y sus repositorios al arreglo
  }));

  // a. Mostrar usuarios con menos de 5 repositorios públicos
  todosRepos.forEach(entry => {  // Recorre cada entrada en el arreglo de todos los repositorios
    if (entry.repositorios.length < 5) {  // Verifica si el usuario tiene menos de 5 repositorios
      console.log(`Usuario ${entry.usuario.name} tiene menos de 5 repositorios públicos:`);  // Muestra un mensaje en la consola
      console.log(entry.repositorios.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));  // Muestra los repositorios en una tabla en la consola
    }
  });

  // b. Mostrar repositorios que contengan la palabra "JavaScript" en su nombre
  todosRepos.forEach(entry => {  // Recorre cada entrada en el arreglo de todos los repositorios
    let reposConJS = entry.repositorios.filter(repo => repo.name.includes('JavaScript'));  // Filtra los repositorios que contienen "JavaScript" en su nombre
    if (reposConJS.length > 0) {  // Verifica si hay repositorios que contienen "JavaScript"
      console.log(`Repositorios de ${entry.usuario.name} que contienen "JavaScript" en su nombre:`);  // Muestra un mensaje en la consola
      console.log(reposConJS.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));  // Muestra los repositorios en una tabla en la consola
    }
  });

  // c. Ordenar de menor a mayor según el nombre del repositorio
  todosRepos.forEach(entry => {  // Recorre cada entrada en el arreglo de todos los repositorios
    let reposOrdenados = entry.repositorios.slice().sort((a, b) => a.name.localeCompare(b.name));  // Ordena los repositorios por nombre
    console.log(`Repositorios de ${entry.usuario.name} ordenados por nombre:`);  // Muestra un mensaje en la consola
    console.log(reposOrdenados.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));  // Muestra los repositorios ordenados en una tabla en la consola
  });

  // d. Mostrar repositorios con nombres de más de cinco letras
  todosRepos.forEach(entry => {  // Recorre cada entrada en el arreglo de todos los repositorios
    let reposLargos = entry.repositorios.filter(repo => repo.name.length > 5);  // Filtra los repositorios con nombres de más de cinco letras
    if (reposLargos.length > 0) {  // Verifica si hay repositorios con nombres de más de cinco letras
      console.log(`Repositorios de ${entry.usuario.name} con nombres de más de cinco letras:`);  // Muestra un mensaje en la consola
      console.log(reposLargos.map(repo => ({ Nombre: repo.name, Descripción: repo.description })));  // Muestra los repositorios en una tabla en la consola
    }
  });
}

// Llamar a la función principal
ver();  // Ejecuta la función principal


