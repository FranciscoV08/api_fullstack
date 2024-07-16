import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js';
import authTask from './routes/tasks.routes.js';

import cookieParser from 'cookie-parser';
import cors from 'cors'

// Lo inicializamos para guardar el objeto que nos trae
const app = express();
// Permitimos que los dominios se comuniquen. 
app.use(cors({
    origin: '*',
    credentials:true //Agregamos las credencias que le pasa axios. PERMITIDO 
}))
// App usa morgan y muestranos la configuracion por consola "dev"
// Morgan sirve para que miremos las peticiones que le mandan back
app.use(morgan('dev'))
// express utiliza o entiende los datos json
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)
app.use('/api', authTask)

export default app;
