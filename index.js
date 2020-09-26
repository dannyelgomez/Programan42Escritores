const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let autores = [];


/* Escritores Genera un array y que cada posición contenga un elemento tipo objeto como el siguiente: */

/* Rutas / Acciones
/autores – 
GET: devuelve todos los autores */

app.get('/autores', (req, res) => {
    res.send(autores)
})

/* POST: crea un nuevo autor  */

app.post('/autores', (req, res) => {
    const autor = {
        id: autores.length + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fechaDeNacimiento: req.body.fechaDeNacimiento,
        libros: req.body.libros
    };

    autores.push(autor);
    res.send('' + autor.id);
})

/* /autores/:id
GET: devuelve el autor con el id indicado */

app.get('/autores/:id', (req, res) => {
    const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('autor not found')
    }
    res.send(autor);
})


/* DELETE: elimina el autor con el id indicado */

app.delete('/autores/:id', (req, res) => {
    const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('Autor not found')
    }
    const index = autores.indexOf(autor)
    autores.splice(index, 1);
    res.send('Autor eliminado');
})

/* PUT: modifica el autor con el id indicado */

/* Valida a través de un middleware que el escritor exista en tu array */




/* Rutas / Libros
/autores/:id/libros
GET: devuelve todos los libros de un autor */


/* POST: agrega un nuevo libro al autor */


/* Utiliza el mismo middleware para verificar que le autor exista */

/* /autores/:id/libros/:idLibro
GET: devuelve el libro con el id indicado del autor */

/* PUT: modifica el libro con el id indicado del autor */

/* DELETE: eliminar el libro con el id indicado del autor */

/* Crea un nuevo middleware para verificar la existencia del libro y también que corresponda al autor */

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})