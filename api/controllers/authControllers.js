import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const display = (req, res) => {
  console.log('display request received');
  res.json({
    message: "hello world on api/authRoutes and authControllers",
  });
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Vérifier la présence du mot de passe dans la requête
  if (!password) {
    return res.status(400).json({ message: "Le mot de passe est requis" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "Inscription réussie" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //vérif si email est correct
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    //vérif le psw  avec compareSync
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    //token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 heures
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 heures
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 28800000); // 8 heures
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

/*
export const signout = (req, res) => {
 console.log('Signout request received');
 try {
  
  res.clearCookie('access_token'); 
  res.status(200).json('Signout successful!');
} catch (error) {
  console.error('Error during logout:', error);
  res.status(500).json('Logout failed');
}
}*/
export const signout = (req, res) => {
  console.log('Signout request received');
  try {
    res.clearCookie('access_token');
    
    // Log to verify that the cookies have been cleared
    const cookiesAfterClear = req.cookies['access_token'];
    if (!cookiesAfterClear) {
      console.log('Cookies successfully cleared');
    } else {
      console.log('Cookies not cleared:', cookiesAfterClear);
    }

    res.status(200).json('Signout successful!');
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json('Logout failed');
  }
}
