// Nuestro ejecutador. El que llamara a todo para iniciar el servicio
import app from "./app.js";
import { connectDB } from "./db.js";

// Primero la coneccion a db
connectDB()
// Levantar el servidor 
app.listen(4000)


console.log('http://localhost:4000/')