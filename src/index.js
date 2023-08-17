const app=require('./config/server.js');
require('./app/routes/rutas')(app);

// iniciar servidor

app.listen(app.get('port'),()=>{
    console.log('Activo en el puerto', app.get('port'))
})




