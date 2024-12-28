

import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { RxCross1 } from "react-icons/rx";
//import { toast } from "react-toastify";
import Loader from "../components/Loader";


export default function AddRecipe() {
  return (
    <FormContainer>
    <h1 className="text-center">Créer une recette</h1>
    <Form >
      <Form.Group className="my-2" controlId="name">
        <Form.Label>Nom de la recette :</Form.Label>
        <Form.Control
          className="form-control input-lg"
          type="text"
          name="name"
         
          placeholder="Ecrire le nom de la recette"
        ></Form.Control>
      </Form.Group>

      {/*pays */}
      <Form.Group className='my-2' controlId='country'>
      <Form.Label>Pays :</Form.Label>
      <Form.Control
          className="form-control input-lg"
          type="text"
          name="country"
          
          placeholder="Ecrire la nationalité de la recette"
      ></Form.Control>
    </Form.Group>

      <Form.Group className="my-2" controlId="category">
        <Form.Label>Catégorie : </Form.Label>
        <Form.Control
          as="select"
          className="form-control input-lg"
          aria-label="Default select example"
          name="category"
         
          
        >
          <option value="">Selectionner une catégorie</option>
          <option value="allCategories">Toutes</option>
          <option value="Aperitif">Apéritif</option>
          <option value="starter">Entrée</option>
          <option value="main">Plat</option>
          <option value="Dessert">Dessert</option>
          <option value="Boisson">Boisson</option>
        </Form.Control>
      </Form.Group>

      {/* select regime */}
      <Form.Group className="my-2" controlId="regime">
        <Form.Label>Régime : </Form.Label>
        <Form.Control
          as="select"
          className="form-control input-lg"
          aria-label="Default select example"
          name="regime"
         
        >
          <option value="">Selectionner une régime</option>
          <option value="traditionnal">traditionnelle</option>
          <option value="vegetarian">végétarien</option>
          <option value="vegan">végan</option>
          <option value="gluten">sans gluten</option>
          <option value="others">autres</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="my-2" controlId="ingredients">
        <Form.Label>Les ingrédients :</Form.Label>
        {/* Affichage des champs d'ingrédients avec la possibilité de supprimer */}
        
            <div className="d-flex mb-2">
              <input
                className="form-control input-lg"
                type="text"
            
                
                placeholder="Ecrire un ingrédient"
              />
              <Button
                className="btn-danger mx-2"
              
                type="button"
              >
                <RxCross1 />
              </Button>
            </div>
          
        {/* Bouton pour ajouter un ingrédient */}
        <Button
          className="btn-primary w-100 mx-2"
        
          type="button"
        >
          Ajouter un ingrédient
        </Button>
      </Form.Group>

      <Form.Group className="my-2" controlId="instructions">
        <Form.Label>La préparation :</Form.Label>
        <textarea
          className="form-control input-lg"
          type="text"
          name="instructions"
       
          placeholder="Ecrire les diverses étapes de la recette"
        ></textarea>
      </Form.Group>

      <Form.Group className="my-2" controlId="makingTime">
        <Form.Label>Le temps de préparation (min) :</Form.Label>
        <Form.Control
          className="form-control input-lg"
          type="number"
          name="makingTime"
      
          placeholder="0"
          min="0"
        ></Form.Control>
      </Form.Group>

      <Form.Group className="my-2" controlId="cookingTime">
        <Form.Label>Le temps de cuisson (min) :</Form.Label>
        <Form.Control
          className="form-control input-lg"
          type="number"
          name="cookingTime"
     
          placeholder="0"
          min="0"
        ></Form.Control>
      </Form.Group>

      <Form.Group className="my-2" controlId="comments">
        <Form.Label>Les bienfaits de la recette :</Form.Label>
        <Form.Control
          className="form-control input-lg"
          type="text"
          name="comments"
     
          placeholder="Ecrire les vertues de la recette"
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="imageUrl">
        <Form.Label>Image de la recette :</Form.Label>
        <Form.Control
          type="file"
          name="imageUrl"
          accept="image/*"
    
        />
    
        <Form.Label>ou par lien url :</Form.Label>
        <Form.Control
          className="form-control input-lg"
          type="text"
          name="imageUrl"
 
          placeholder="Importer le lien url de votre image"
        ></Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-3 w-100">
        Enregistrer la recette
      </Button>

      { <Loader />}
    </Form>
  </FormContainer>
  )
}
