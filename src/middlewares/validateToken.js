import jwt  from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// PROTEGER RUTAS MEDIANTE UNA FUNCION 
// En lugar de retornar una respuesta sigue con el next
export const authRequired = (req, res, next) => {
  // res.json({"message": "Estamos en Validate Token "})
  const { token } = req.cookies;
 
  if (!token) return res.status(400).json({ messaege: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, (err, user ) => {
    if (err) return res.status(400).json({ messaege: "invalid token" });
    // Guardo todo dentro del req.user. ESTO con el fin de al pasar al controller se pase con el user guardado
    req.user = user;
    // console.log(req.user)
  })
  next();
  // res.end()
};
