import { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
// Icône 
import { RxCross1 } from "react-icons/rx"; 
// composants réutilisables
import FormContainer from "../../../components/shared/FormContainer"; 
import Loader from "../../../components/shared/Loader"; 
// Hook RTK Query pour envoyer les données au backend
import { useAddRecipeMutation } from "../../../redux/recipes/recipesApiSlice";

import "./addRecipe.styles.css"; // Style spécifique pour ce composant

export default function AddRecipe() {
  // États pour gérer les différents champs du formulaire
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]); // Liste des ingrédients
  const [name, setName] = useState(""); // Nom de la recette
  const [country, setCountry] = useState(""); // Origine de la recette
  const [category, setCategory] = useState(""); // Catégorie (Apéritif, Plat, etc.)
  const [regime, setRegime] = useState(""); // Régime alimentaire
  const [makingTime, setMakingTime] = useState(0); // Temps de préparation
  const [cookingTime, setCookingTime] = useState(0); // Temps de cuisson
  const [instructions, setInstructions] = useState(""); // Étapes de la recette
  const [previewImage, setPreviewImage] = useState(null); // Prévisualisation de l'image
  const [error, setError] = useState(""); // Gestion des erreurs pour afficher un message utilisateur

  // Hook RTK Query pour la mutation (ajout de recette)
  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  // Fonction pour ajouter un ingrédient à la liste
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  // Fonction pour supprimer un ingrédient spécifique par son index
  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Fonction pour mettre à jour un ingrédient spécifique
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // Gestion de l'image (prévisualisation)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Crée une URL temporaire pour prévisualiser l'image
    }
  };

  // Validation et soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérification des champs obligatoires
    if (!name || !country || !category || !regime || !instructions) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Vérification des ingrédients
    const isInvalidIngredient = ingredients.some(
      (ingredient) => !ingredient.name || !ingredient.quantity || !ingredient.unit
    );
    if (isInvalidIngredient) {
      setError("Veuillez remplir tous les champs pour chaque ingrédient.");
      return;
    }

    // Réinitialisation de l'erreur en cas de formulaire valide
    setError("");

    // Tentative d'envoi des données au backend
    try {
      await addRecipe({
        name,
        country,
        category,
        regime,
        ingredients,
        makingTime,
        cookingTime,
        instructions,
      }).unwrap();
      alert("Recette ajoutée avec succès !");
      console.log("Données envoyées :", addRecipe);

      // Réinitialisation des champs après succès
      setIngredients([{ name: "", quantity: "", unit: "" }]);
      setName("");
      setCountry("");
      setCategory("");
      setRegime("");
      setMakingTime(0);
      setCookingTime(0);
      setInstructions("");
      setPreviewImage(null);
    } catch (error) {
      // Gestion des erreurs lors de la requête

      setError("Une erreur est survenue lors de l'ajout de la recette.");
      console.error("Erreur :", error);
    }
  };

  return (
    <section className="bg-Recipe d-flex flex-column align-items-center pb-3">
      <FormContainer size="12">
        <h1 className="text-center mb-4">Créer une recette</h1>

        {/* Affichage d'une alerte en cas d'erreur */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Colonne gauche : Informations générales */}
            <Col xs={12} md={6} className="mb-4">
              <Card className="mb-4">
                <Card.Header>Informations générales</Card.Header>
                <Card.Body>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Nom de la recette *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nom de la recette"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="country" className="mb-3">
                    <Form.Label>Pays *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nationalité de la recette"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Catégorie *</Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="aperitif">Apéritif</option>
                      <option value="starter">Entrée</option>
                      <option value="main">Plat</option>
                      <option value="dessert">Dessert</option>
                      <option value="boisson">Boisson</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="regime" className="mb-3">
                    <Form.Label>Régime *</Form.Label>
                    <Form.Control
                      as="select"
                      value={regime}
                      onChange={(e) => setRegime(e.target.value)}
                      required
                    >
                      <option value="">Sélectionner un régime</option>
                      <option value="traditionnal">Traditionnelle</option>
                      <option value="vegetarian">Végétarien</option>
                      <option value="vegan">Végan</option>
                      <option value="gluten-free">Sans gluten</option>
                    </Form.Control>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Image */}
              <Card className="mb-4">
                <Card.Header>Image</Card.Header>
                <Card.Body>
                  <Form.Group controlId="imageUrl">
                    <Form.Label>Image de la recette :</Form.Label>
                    <Form.Control
                      type="file"
                      name="imageUrl"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Group>
                  {previewImage && (
                    <div className="text-center mt-3">
                      <img
                        src={previewImage}
                        alt="Prévisualisation"
                        className="img-fluid rounded"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Colonne droite : Ingrédients et étapes */}
            <Col xs={12} md={6}>
              <Card className="mb-4">
                <Card.Header>Ingrédients</Card.Header>
                <Card.Body>
                  {ingredients.map((ingredient, index) => (
                    <Row key={index} className="align-items-center mb-3">
                      <Col xs={12} sm={5} className="mb-2 mb-sm-0">
                        <Form.Control
                          type="text"
                          placeholder="Nom de l'ingrédient"
                          value={ingredient.name}
                          onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                          required
                        />
                      </Col>
                      <Col xs={6} sm={3} className="mb-2 mb-sm-0">
                        <Form.Control
                          type="number"
                          placeholder="Quantité"
                          value={ingredient.quantity}
                          onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                          required
                        />
                      </Col>
                      <Col xs={6} sm={3} className="mb-2 mb-sm-0">
                        <Form.Control
                          as="select"
                          value={ingredient.unit}
                          onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                          required
                        >
                          <option value="">Unité</option>
                          <option value="g">g</option>
                          <option value="ml">ml</option>
                          <option value="pcs">tasse</option>
                          <option value="tbsp">cuillère à soupe</option>
                          <option value="tsp">cuillère à café</option>
                        </Form.Control>
                      </Col>
                      <Col xs={12} sm={1}>
                        <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>
                          <RxCross1 />
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="outline-success" className="mt-2" onClick={handleAddIngredient}>
                    Ajouter un ingrédient
                  </Button>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>Préparation</Card.Header>
                <Card.Body>
                  <Form.Group controlId="instructions">
                    <Form.Label>Les étapes :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      placeholder="Décrivez les étapes..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bouton de soumission */}
          <Button type="submit" variant="success" className="w-100 mt-3">
            {isLoading ? <Loader /> : "Enregistrer la recette"}
          </Button>
        </Form>
      </FormContainer>
    </section>
  );
}
