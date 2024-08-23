//middleware de routage :
// pour protéger des routes spécifiques contre tout accès non autorisé.
/*
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};
*/


import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(403, "Token has expired! Please login again."));
      }
      return next(errorHandler(403, "Token is not valid!"));
    }

    req.user = user;
    next();
  });
};

// Middleware pour vérifier le rôle de l'utilisateur en cas d'évolution de l'app
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(errorHandler(403, "You do not have permission to access this resource!"));
    }
    next();
  };
};

/*
req.headers.authorization?.split(" ")[1];
    req.headers.authorization? => Est-ce que authorization existe dans le header?" Si oui, on continu 
    .split(" ") => coupe à chaque espace éléments, créant ainsi une liste.
    [1] => à prendre le deuxième élément de cette liste 
    
    ps: 
    le premier élément [0] est "Bearer", et le deuxième élément [1] est le token
    Si req.headers.authorization contient "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    Alors, split(" ") crée un tableau ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"],
*/