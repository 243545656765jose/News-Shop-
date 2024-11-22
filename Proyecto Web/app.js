const express = require('express')
const morgan = require('morgan')
const archivoBD = require('./conexion')
const app = express()
const path = require('path')
const indexRoutes = require('./routes/index')
const bodyParser = require('body-parser')
const editarRoutes = require('./routes/editar')
app.use(express.static(path.join(__dirname, 'public')));
//Configuraciones
app.set('views',path.join(__dirname, 'views')) 
app.set('view engine','ejs')


//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use("/", indexRoutes);
app.use(editarRoutes);

app.listen(3000,()=> {
console.log(`Servidor en el puerto ${3000} activo`)
})
