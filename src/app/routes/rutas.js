const dbConnection = require('../../config/dbConnection');

module.exports = app =>{
    const conexion=dbConnection();

    // **************************************
    // PAGINA PRINCIPAL
    app.get('/',(req,res)=>{
        res.render('index')
    })

    // CATALOGO DE LIBROS

    app.get('/catalogo', (req,res)=>{
        
        conexion.query('SELECT * FROM libros', (err,resultLibros)=>{
           
            conexion.query('SELECT * FROM autores', (err,resultAutores)=>{

                conexion.query('SELECT * FROM prestamos', (err,resultPrestamos)=>{
                    res.render('catalogo.ejs',{
                        libros:resultLibros,
                        autor:resultAutores,
                        prestamo:resultPrestamos
                    })
                })
                
            })
        }) 
    })



    app.get('/eliminar_libro/:id',(req,res)=>{
        const id=req.params.id;
        const query = 'DELETE FROM libros WHERE id_libro = ?'
        
        conexion.query(query,[id],(err,result)=>{
            if(err){
                console.log('Error al borrar el libro');
                res.status(500).send('ESTE LIBRO ESPERA SU DEVOLUCION NO PUEDE SER ELIMINADO')
            } else{
                console.log('libro eliminado')
                res.redirect('/catalogo')
            }
        })
    })


    app.get('/agregar_libro',(req,res)=>{
        res.render('agregar_libro')
    })



    app.post('/agregar_libro',(req,res)=>{
        const titulo = req.body.titulo;
        const nombre = req.body.nombre;
        const año = req.body.año;
        const genero = req.body.genero;
        const queryL = 'INSERT INTO libros (titulo, año, id_autor, genero) VALUES (?, ?, ?, ?)'
        conexion.query('INSERT INTO autores SET?',{
            nombre
        })
        const query = 'SELECT * FROM autores'
        
        conexion.query(query,(err,resultA)=>{
            var autor=resultA[resultA.length-1].id_autor
            
            conexion.query(queryL,[titulo,año,autor,genero],(err,resultL)=>{
                res.redirect('/catalogo');
                
            })
        })
    })




    app.get('/modificar_libro/:id',(req,res)=>{
        const id=req.params.id;
        const query='SELECT * FROM libros WHERE id_libro=?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                
                res.status(500).send('Error al obtener los datos')
            }else {
                conexion.query('SELECT * FROM autores',(err,resultA)=>{
                    for(i=0;i<resultA.length;i++){
                        if(resultA[i].id_autor==result[0].id_autor){
                            var nombre=resultA[i].nombre
                        }
                        
                    }
                    
                    res.render('modificar_libro',{
                        libros: result[0],
                        nombre: nombre

                    })
                })
            }
        })
    })

    app.post('/modificar_libro/:id',(req,res)=>{
        const id=req.params.id;
        const {titulo,nombre,año,genero} = req.body;
        const query='UPDATE libros SET titulo=?, id_autor=? , año=?, genero=? WHERE id_libro=?';
        const queryL='SELECT * FROM libros'
        const queryA='UPDATE autores SET nombre=? WHERE id_autor=?'

        conexion.query(queryL,(err,resultL)=>{
            var indexA=resultL
            for(i=0;i<resultL.length;i++){
                if (indexA[i].id_libro==id){
                    var id_autor = resultL[i].id_autor
                    break
                }
            }
            
            conexion.query(queryA,[nombre,id_autor],(err,resultA)=>{
                conexion.query(query,[titulo,id_autor,año,genero,id],(err,result)=>{
                    if(err){
                        console.error('Error al modificar el libro')
                        res.status(500).send('Error al editar el registro')
                    }else {
                        console.log("Libro modificado correctamente");
                        res.redirect('/catalogo')
                    }
                })
            })

        })
    })
    


    // REGISTRO DE CLIENTES

    app.get('/registro', (req,res)=>{
        conexion.query('SELECT * FROM clientes', (err,result)=>{
          
            res.render('registro.ejs',{
                clientes: result
            })
        })
        
    })

    app.post('/registro_clientes',(req,res)=>{
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const email = req.body.email;
        conexion.query('INSERT INTO clientes SET?',{
            nombre,
            apellido,
            email
        },(err,result)=>{
            res.redirect('/registro');
        })
    })


    app.get('/eliminar/:id',(req,res)=>{
        const id=req.params.id;
        const query = 'DELETE FROM clientes WHERE id_cliente = ?'
        conexion.query(query,[id],(err,result)=>{
            
            if(err){
                console.log('Error al eliminar al cliente');
                res.status(500).send('El cliente tiene un libro en su poseción ')
            } else{
                console.log('cliente eliminado')
                res.redirect('/registro')
            }
        })
    })


    app.get('/modificar/:id',(req,res)=>{
        const id=req.params.id;
        const query='SELECT * FROM clientes WHERE id_cliente=?';
        conexion.query(query,[id],(err,result)=>{
            if(err){

                res.status(500).send('Error al obtener los datos')
            }else {
                
                res.render('modificar_cliente',{
                    cliente: result[0]
                })
            }
        })
    })

    app.post('/modificar/:id',(req,res)=>{
        const id=req.params.id;
        const {nombre,apellido,email} = req.body;
        const query='UPDATE clientes SET nombre=?, apellido=?, email=? WHERE id_cliente=?';

        conexion.query(query,[nombre,apellido,email,id],(err,result)=>{
            if(err){
                console.error('Error al modificar')
                res.status(500).send('Error al modificar')
            }else {
                console.log("registro modificado");
                res.redirect('/registro')
            }
        })
    })


    // PRESTAMOS

    app.get('/prestamo', (req,res)=>{
        
        conexion.query('SELECT * FROM libros', (err,resultLibros)=>{
           
            conexion.query('SELECT * FROM clientes', (err,resultClientes)=>{

                conexion.query('SELECT * FROM prestamos', (err,resultPrestamos)=>{
                    
                    res.render('prestamo.ejs',{
                        libros:resultLibros,
                        cliente:resultClientes,
                        prestamo: resultPrestamos
                        
                    })
                }) 
            })
        }) 
    })


    app.get('/prestamo/:id',(req,res)=>{
        const id=req.params.id;
        const query='SELECT * FROM prestamos WHERE id_prestamo=?';
        conexion.query(query,[id],(err,result)=>{
            if(err){
                
                res.status(500).send('Error al obtner los datos')
            }else {
                
                res.render('solicitud',{
                    id:id
                })
            }
        })
    })

    app.post('/prestamo/:id',(req,res)=>{
        const id_libro=req.params.id;
        const id_cliente=req.body.id_cliente;
        
        
        const query = 'INSERT INTO prestamos (id_libro, id_cliente, fecha_prestamo, fecha_devolucion) VALUES (?,?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 WEEK))';
        conexion.query(query, [id_libro, id_cliente], (err, result) => {
            if (err) {
                console.error(err);
                res.send('Error al realizar el préstamo, asegurese de tener un usuario registrado y verifique su ID');
            } else {
                console.log('Préstamo realizado exitosamente.');
                res.redirect('/prestamo')
            }
            
        })

    })




    // **************************************

}










