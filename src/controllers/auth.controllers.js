import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";
// Nuestras funciones que se ejecutaran al llamar un enpoit

export const inicio = (req, res) => {
  res.json({
    text: "Todo ok",
  });
  // res.end
};  
// Es asincrono por que estoy recibo datos del front
export const register = async (req, res) => {
  const { email, password, username } = req.body;
  // Esto, puede que valla bien o mal, para ayudar metemos dentro de un tryCatch
  try {
    //validacion para encontrar user duplicados
    const userFound = await User.findOne({email})
    if(userFound) return res.status(400).json(["El correo ya esta en uso "]) 

    // Has para encriptar la passware
    const passwordHash = await bcrypt.hash(password, 10);

    // cuando se cree un nuevo usuario se te pasare el usern,ema,pass
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Guarda en la db mi instancia con los datos enviados
    // Lo guardamos en una constante para que al momento de guardar se cree la fecha
    const saveUser = await newUser.save();
    // Esto me devuelve un token. Crea un token 
    const token = await createAccessToken({ id: saveUser._id });
    // Guardamos en cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });
    // respondemos un json 
    res.json({
        "id"       : saveUser._id,
        "username" : saveUser.username,
        "email"    : saveUser.email,
        "createdAt": saveUser.createdAt,
        "updatedAt": saveUser.updatedAt
    })
  } catch (error) {
    res.status(500).json({
        "message": 'error'
    })
  }
};

export const login = async (req, res) => {  
// Como es el login solo necesito el email, password
  const { email, password } = req.body;

  // Esto, puede que valla bien o mal, para ayudar metemos dentro de un tryCatch
  try {

    // Necesito saber si el usuario existe. Esto bucara el usuario 
    const userFound = await User.findOne({email});

    if( !userFound) return res.status(400).json({"message": 'Usuario no econtrado'})


    // Has para encriptar la passware
    const isMatch = await bcrypt.compare(password, userFound.password);
    if( !isMatch ) return res.status(400).json({"message": 'Password incorrecto'})

    // Esto me devuelve un token. Crea un token 
    const token = await createAccessToken({ id: userFound._id });
    // Guardamos en cookie
    res.cookie("token", token);
    // respondemos un json 
    res.json({
        "id"       : userFound._id,
        "username" : userFound.username,
        "email"    : userFound.email,
        "createdAt": userFound.createdAt,
        "updatedAt": userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json({
        "message": error
    })
  }
};

export const logout =  (req, res) => {
  // Recetea el token
  res.cookie('token', "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
  // res.end()
}

export const profile = async (req, res) => {

  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ messaege: "User not found" });
  return res.json({
    id: userFound.id,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
  console.log(req.user, 'Desde Profile')
  res.json({'message': 'Hola Mi profile '}) 
}

// verify
export const verifyToken = async (req, res) => {
  // Extraigo cookie de la request 
  // console.log(req.cookie)
  const {token} = req.cookies
  if(!token) return res.status(401).json({message: " Token no autorizado"})

  jwt.verify( token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message:"No autorizado desde jwt"})

    const userFound = await User.findById(user.id);
    if(!userFound) return res.status(401).json({
      message: "No autorizado de verify"
    })
    
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email, 
    })
    
  })
}