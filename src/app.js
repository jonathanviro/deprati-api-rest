import express from 'express';
import indexRoutes from './routes/index.routes.js';
import inventariosRoutes from './routes/inventarios.routes.js'

const app = express()

//Interpretar los json en un objeto javascript
app.use(express.json())

//Rutas peticiones http
app.use('/api', indexRoutes)
app.use('/api', inventariosRoutes);



app.use((req, res) => { 
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
})

export default app