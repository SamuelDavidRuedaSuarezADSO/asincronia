/*
  5. Lea el archivo user.json y transforme todos los nombres a mayúsculas
  (recorra usuario por usuario) validando que solo se permita ingresar letras
  mayúsculas (se valida con un proxy)
    a. Modifique solo los usuarios que tengan el rol aprendiz en true
    b. Modifique solo los usuarios que más de dos nombres ejemplo (John
    Becerra)
    c. Modifique solo los usuarios que contenga la palabra ADSO en su
    user
*/

let promesa = new Promise((resolve, reject) => { // Se crea una nueva promesa con dos parámetros: resolve y reject.
    fetch("user.json") // Se hace una solicitud fetch para obtener el contenido del archivo "user.json".
    .then((response) => response.json()) // Se obtiene la respuesta y se la convierte a formato JSON.
    .then((data) => { // Se obtiene el objeto JSON obtenido de la respuesta.
        const proxy = new Proxy(data.users, { // Se crea un Proxy para el array de usuarios.
            set: function(target, property, value) { // Se define el método set del Proxy para validar y transformar los nombres.
                if (property === 'name') { // Si la propiedad a modificar es 'name'.
                    if (/^[A-Z]+$/.test(value)) { // Se verifica si el nuevo valor es solo letras mayúsculas.
                        target[property] = value.toUpperCase(); // Si es así, se transforma a mayúsculas y se asigna al target.
                    } else {
                        throw new Error('Solo se permiten letras mayúsculas.'); // Si no, se lanza un error.
                    }
                } else {
                    target[property] = value; // Si no es 'name', se asigna el valor sin transformaciones.
                }
                return true; // Se retorna true para indicar que la operación fue exitosa.
            }
        });

        const aprendices = proxy.filter(user => user.aprendiz); // Se filtran los usuarios con la propiedad 'aprendiz' en true.

        aprendices.forEach(user => { // Se itera sobre los usuarios filtrados.
            if (user.name.split(' ').length > 2) { // Se verifica si el nombre tiene más de dos palabras.
                if (user.user.includes('ADSO')) { // Se verifica si el nombre de usuario incluye 'ADSO'.
                    user.name = user.name.toUpperCase(); // Si cumple ambas condiciones, se convierte el nombre a mayúsculas.
                }
            }
        });

        resolve(aprendices); // Se resuelve la promesa con los usuarios modificados.
    });
});

promesa.then((resultado) => { // Se añade un manejador para el caso de que la promesa se resuelva correctamente.
    console.log(resultado); // Se muestra en consola el resultado en forma de tabla.
});
