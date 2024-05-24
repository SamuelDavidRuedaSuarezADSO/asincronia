/*
  2. Lea el archivo users.json suministrado por el instructor y tome como base
  las capturas para luego mostrar todos los datos de usuario de cada
  aprendiz, este ejercicio de desarrolla con promesas.
    a. Imprima el resultado en una tabla donde solo nos mostrar el nombre
    y el avatar de cada aprendiz
*/

function leer() {
  return new Promise((resolve, reject) => {
    fetch('user.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        resolve(data.users.filter(usuario => usuario.aprendiz));
      })
  });
}

function avatar(usuarios) {
  return Promise.all(usuarios.map(usuario => {
    return fetch(`https://api.github.com/users/${usuario.user}/repos`)
      .then(response => {
        return response.json();
      })
      .then(dato => {
        if (dato.length > 0 && dato[0].owner && dato[0].owner.avatar_url) {
          return dato[0].owner.avatar_url;
        }
      })
  }));
}

function ver() {
  leer()
    .then(usuarios => {
      return avatar(usuarios).then(avatares => {
        return console.table(usuarios.map((usuario, n) => ({ Nombre: usuario.name, Avatar: avatares[n] })));
      });
    })

}

ver();