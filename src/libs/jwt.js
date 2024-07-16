import jwt from 'jsonwebtoken'

import { TOKEN_SECRET } from "../config.js";
// Importa la constante TOKEN_SECRET desde un archivo de configuración. Esta constante se usa para firmar el token.
export const createAccessToken = (payload) => {
  // Exporta una función llamada createAccessToken que toma un argumento payload.
  return new Promise((resolve, reject) => {
    // Retorna una nueva promesa. Las promesas se utilizan para manejar operaciones asíncronas, como la generación de un token.
    // Se utiliza la función jwt.sign para crear un nuevo token.
    jwt.sign(
      payload,  // El payload del token. Esta es la información que se codificará en el token.
      TOKEN_SECRET,  // La clave secreta utilizada para firmar el token. Esto asegura que solo el servidor pueda generar tokens válidos.
      {
        expiresIn: "1d",  // Opciones para la generación del token. En este caso, se especifica que el token expira en 1 día.
      },
      (error, token) => {
        // Callback function que se ejecuta una vez que jwt.sign termina su proceso. Recibe un error y el token generado.
        if (error) reject(error);
        // Si hay un error durante la generación del token, la promesa se rechaza con el error.
        resolve(token);
        // Si no hay errores, la promesa se resuelve con el token generado.
      }
    );
  });
};
