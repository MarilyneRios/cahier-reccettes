import { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import "./addRecipe.styles.css";

export default function AddRecipe() {
  //les états
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  // Gestion des ingrédients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  // Gestion de la prévisualisation de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Validation et soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const isInvalidIngredient = ingredients.some(
      (ingredient) =>
        !ingredient.name || !ingredient.quantity || !ingredient.unit
    );

    if (isInvalidIngredient) {
      setError("Veuillez remplir tous les champs pour chaque ingrédient.");
      return;
    }

    setError("");
    setIngredients([{ name: "", quantity: "", unit: "" }]);
    alert("Recette ajoutée avec succès !");
 
  };

  return (
    <section className="bg-Recipe d-flex flex-column align-items-center pb-3">
      <FormContainer size="12" className="" >
        <h1 className="text-center mb-4">Créer une recette</h1>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          {/* Colonne gauche */}
          <Col xs={12} md={6} className="mb-4">
            <Card className="mb-4 custom-class">
              <Card.Header className="cardHeader-addRecipe">
                Informations générales
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} sm={8} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label>
                        Nom de la recette <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ecrire le nom de la recette"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={4} className="mb-3">
                    <Form.Group controlId="country">
                      <Form.Label>
                        Pays <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nationalité de la recette"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="category">
                      <Form.Label>Catégorie :</Form.Label>
                      <Form.Control as="select" required>
                        <option value="">Sélectionner une catégorie</option>
                        <option value="aperitif">Apéritif</option>
                        <option value="starter">Entrée</option>
                        <option value="main">Plat</option>
                        <option value="dessert">Dessert</option>
                        <option value="boisson">Boisson</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="mb-3">
                    <Form.Group controlId="regime">
                      <Form.Label>Régime :</Form.Label>
                      <Form.Control as="select">
                        <option value="">Sélectionner un régime</option>
                        <option value="traditionnal">Traditionnelle</option>
                        <option value="vegetarian">Végétarien</option>
                        <option value="vegan">Végan</option>
                        <option value="gluten-free">Sans gluten</option>
                        <option value="other">Autres</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Group controlId="makingTime" className="mb-3">
                      <Form.Label>Temps de préparation (min) :</Form.Label>
                      <Form.Control type="number" min="0" placeholder="0" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="cookingTime" className="mb-3">
                      <Form.Label>Temps de cuisson (min) :</Form.Label>
                      <Form.Control type="number" min="0" placeholder="0" />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

              {/* Section Image */}
              <Card className="mb-4 custom-class">
              <Card.Header className="cardHeader-addRecipe">Image</Card.Header>
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

                {/* Prévisualisation */}
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

          {/* Colonne droite */}
          <Col xs={12} md={6}>
            <Card className="mb-4 custom-class">
              <Card.Header className="cardHeader-addRecipe">
                Ingrédients
              </Card.Header>
              <Card.Body>
                {ingredients.map((ingredient, index) => (
                  <Row key={index} className="align-items-center mb-3">
                    <Col xs={12} sm={5} className="mb-2 mb-sm-0 p-1">
                      <Form.Control
                        type="text"
                        placeholder="Nom de l'ingrédient"
                        value={ingredient.name || ""}
                        onChange={(e) =>
                          handleIngredientChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </Col>
                    <Col xs={6} sm={3} className="mb-2 mb-sm-0 p-1">
                      <Form.Control
                        type="number"
                        min="0"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        required
                      />
                    </Col>
                    <Col xs={6} sm={3} className="mb-2 mb-sm-0 p-1">
                      <Form.Control
                        as="select"
                        value={ingredient.unit}
                        onChange={(e) =>
                          handleIngredientChange(index, "unit", e.target.value)
                        }
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
                    <Col xs={12} sm={1} className="p-1">
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveIngredient(index)}
                      >
                        <RxCross1 />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  variant="outline-success"
                  className="mt-2"
                  onClick={handleAddIngredient}
                >
                  Ajouter un ingrédient
                </Button>
              </Card.Body>
            </Card>

            <Card className="mb-4 custom-class">
              <Card.Header className="cardHeader-addRecipe">
                Préparation
              </Card.Header>
              <Card.Body>
                <Form.Group controlId="instructions">
                  <Form.Label>Les étapes :</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={20}
                    placeholder="Décrivez les étapes..."
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button type="submit" variant="success" className="w-100 mt-3">
          Enregistrer la recette
        </Button>
        <Loader />
      </FormContainer>
    </section>
  );
}
