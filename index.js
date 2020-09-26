const { request } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

let autores = [];

var validarExistenciaAutor = function(req, res, next) {
    const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        return res.status(404).send('autor not found')
    }

    req.autorEncontrado = autor
    next();
};

/* app.use(validarExistenciaAutor); */

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

app.get('/autores/:id', validarExistenciaAutor, (req, res) => {
    /* const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('autor not found')
    } */
    res.send(req.autorEncontrado);
})


/* DELETE: elimina el autor con el id indicado */

app.delete('/autores/:id', validarExistenciaAutor, (req, res) => {
    /* const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('Autor not found')
    } */

    const index = autores.indexOf(req.autorEncontrado)
    autores.splice(index, 1);
    res.send('Autor eliminado');
})

/* PUT: modifica el autor con el id indicado */

app.put('/autores/:id', validarExistenciaAutor, (req, res) => {
    /* const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('Autor not found');
        return
    } */
    req.autorEncontrado.nombre = req.body.nombre;
    req.autorEncontrado.apellido = req.body.apellido;
    req.autorEncontrado.fechaDeNacimiento = req.body.fechaDeNacimiento;
    req.autorEncontrado.libros = req.body.libros;

    res.send('El autor con el id indicado fue modificado');
})

/* Valida a través de un middleware que el escritor exista en tu array */





/* Rutas / Libros
/autores/:id/libros
GET: devuelve todos los libros de un autor */

app.get('/autores/:id/libros', validarExistenciaAutor, (req, res) => {
    /* const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('autor not found')
    } */
    res.send(req.autorEncontrado.libros);
})

/* POST: agrega un nuevo libro al autor */

app.get('/autores/:id/libros', validarExistenciaAutor, (req, res) => {
    /* const autorId = parseInt(req.params.id);
    const autor = autores.find(autor => autor.id === autorId)
    if (!autor) {
        res.status(404).send('autor not found')
    } */

    const libro = {
        id: autores.length + 1,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        anioPublicaion: req.body.fechaDeNacimiento,
    };

    req.autorEncontrado.libros.push(libro);
    res.send(req.autorEncontrado);
})


/* Utiliza el mismo middleware para verificar que el autor exista */

/* OK */

/* /autores/:id/libros/:idLibro
GET: devuelve el libro con el id indicado del autor */

app.get('/autores/:id/libros/:idLibro', validarExistenciaAutor, (req, res) => {

    const libroId = parseInt(req.params.idLibro);
    const libro = req.autorEncontrado.libros.find(libro => libro.id === libroId)
    if (!libro) {
        res.status(404).send('libro not found')
    }

    res.send(libro);
})


/* PUT: modifica el libro con el id indicado del autor */

/* DELETE: eliminar el libro con el id indicado del autor */

/* Crea un nuevo middleware para verificar la existencia del libro y también que corresponda al autor */

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})