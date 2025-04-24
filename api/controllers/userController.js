//userController.js

import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

//test
export const display = (req, res) => {
    res.json({
      message: 'hello world on api/userRoutes and userController',
    });
};

// @desc    Mettre à jour un utilisateur existant
// @route   PUT /api/users/:id
// @access  Privé (token)
export const updateUser = async (req, res, next) => {
  // Sécurité : vérification user
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }

  try {
    // créer un objet updatedFields pour stocker les champs mis à jour
    const updatedFields = {};

    // Vérifiez si le champ 'username' est présent dans la requête
    if (req.body.username) {
      // Si oui, ajoutez la valeur du champ 'username' à updatedFields
      updatedFields.username = req.body.username;
    }
    if (req.body.email) {
      updatedFields.email = req.body.email;
    }
    if (req.body.password) {
      updatedFields.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.profilePicture) {
      updatedFields.profilePicture = req.body.profilePicture;
    }

    // met à jour updatedUser
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      // Utilisez $set pour mettre à jour les champs spécifiés
      { $set: updatedFields },
      { new: true }
    );

    // Excluez le mot de passe du document mis à jour
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}


// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Privé (token)
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
}  

// @desc    réinitialiser un mot de passe
// @route   PUT /api/users/resetPassword/:id
// @access  Privé (token)

export const resetPasswordUser = async (req, res, next) => {

    // Sécurité : vérification user
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account!'));
    }

    try {
      // créer un objet updatedFields pour stocker les champs mis à jour
      const updatedFields = {};
      // Vérifiez si le champ 'password' est présent dans la requête
      if (req.body.password) {
      // Si oui, ajoutez la valeur du champ 'password' à updatedFields

        updatedFields.password = bcryptjs.hashSync(req.body.password, 10);
      }
          // met à jour updatedUser
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      // Utilisez $set pour mettre à jour les champs spécifiés
      { $set: updatedFields },
      { new: true }
    );

    // Excluez le mot de passe du document mis à jour
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}