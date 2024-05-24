/*
  3. Basado en la solución del punto 2, transforme esta solución utilizando
  async/await
    a. muestre los repositorios públicos de cada aprendiz en consola.
    b. Una todos los resultados en un solo arreglo
    c. Filtre la consulta con solo los aprendices que tengan el rol de
    aprendiz, esta solución se deba dar antes de realizar la solicitud al
    api
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

async function coger(usuario) {
  let response = await fetch(`https://api.github.com/users/${usuario.user}/repos`);
  let repos = await response.json();

  let trabajos = [];
  for (let i = 0; i < repos.length; i++) {
    if (!repos[i].private) {
      trabajos.push(repos[i]);
    }
  }

  return trabajos;
}

async function ver() {
  let usuarios = await leer();
  let aprendices = usuarios.filter(usuario => usuario.aprendiz);

  aprendices.forEach(

  );

}

ver();


