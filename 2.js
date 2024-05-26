/*
  2. Lea el archivo users.json suministrado por el instructor y tome como base
  las capturas para luego mostrar todos los datos de usuario de cada
  aprendiz, este ejercicio de desarrolla con promesas.
    a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
    y el avatar de cada aprendiz
*/

function leer() {
  return new Promise((resolve, reject) => { // Crea una nueva promesa para manejar la lectura del archivo JSON
    fetch('user.json') // Realiza una solicitud fetch para obtener el archivo 'user.json'
      .then(response => { // Maneja la respuesta de la solicitud fetch
        return response.json(); // Convierte la respuesta a formato JSON
      })
      .then(data => { // Maneja los datos convertidos a JSON
        resolve(data.users.filter(usuario => usuario.aprendiz)); // Filtra los usuarios que son aprendices y resuelve la promesa con estos usuarios
      })
  });
}

function avatar(usuarios) {
  return Promise.all(usuarios.map(usuario => { // Usa Promise.all para manejar múltiples solicitudes fetch simultáneamente
    return fetch(`https://api.github.com/users/${usuario.user}/repos`) // Realiza una solicitud fetch a la API de GitHub para obtener los repositorios del usuario
      .then(response => { // Maneja la respuesta de la solicitud fetch
        return response.json(); // Convierte la respuesta a formato JSON
      })
      .then(dato => { // Maneja los datos convertidos a JSON
        if (dato.length > 0 && dato[0].owner && dato[0].owner.avatar_url) { // Verifica que haya repositorios y que el primer repositorio tenga un owner con avatar_url
          return dato[0].owner.avatar_url; // Devuelve la URL del avatar del propietario del primer repositorio
        }
      })
  }));
}

function ver() {
  leer() // Llama a la función leer() para obtener los usuarios aprendices
    .then(usuarios => { // Maneja la lista de usuarios aprendices obtenida de la función leer()
      return avatar(usuarios).then(avatares => { // Llama a la función avatar() para obtener las URLs de los avatares de los usuarios y maneja las URLs obtenidas
        return console.table(usuarios.map((usuario, n) => ({ Nombre: usuario.name, Avatar: avatares[n] }))); // Mapea los usuarios y sus avatares a un formato de tabla y los imprime en la consola
      });
    })
}

ver(); // Llama a la función ver() para iniciar el proceso
