// Nuestro ejecutador. El que llamara a todo para iniciar el servicio
import app from "./app.js";
import { connectDB } from "./db.js";

const port = process.env.PORT || 3000;
console.log(port)
// Primero la coneccion a db
connectDB()
// Levantar el servidor 
app.listen(port)


console.log(`http://localhost:${port}`)
