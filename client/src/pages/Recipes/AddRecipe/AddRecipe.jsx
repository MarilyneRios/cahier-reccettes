import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// React-Bootstrap
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";

// Icône
import { RxCross1 } from "react-icons/rx";

// Composants réutilisables
import FormContainer from "../../../components/shared/FormContainer";
import Loader from "../../../components/shared/Loader";
import BackButton from "../../../components/shared/BackButton";

// Image sur Firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";

// Import de la mutation addRecipe
import { useAddRecipeMutation } from "../../../redux/recipes/recipesApiSlice";

import "./addRecipe.styles.css";

export default function AddRecipe() {
  const { currentUser } = useSelector((state) => state.user);

  const [recipe, setRecipe] = useState({
    name: "",
    country: "",
    category: "",
    regime: "",
    ingredients: [],
    instructions: [],
    comments: [],
    makingTime: "",
    cookingTime: "",
    pseudo: currentUser?.username || "",
    imageUrl: "",
    userId: currentUser?.id || null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // redux RTK
  const [addRecipe] = useAddRecipeMutation();

  // image recipe
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageError("Aucune image sélectionnée.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageError("Le fichier sélectionné n'est pas une image.");
      return;
    }

    if (!validateFile(file)) {
      return; // Si la validation échoue, on arrête l'exécution ici
    }

    setImageError(null);
    setPreviewImage(URL.createObjectURL(file));
    setFile(file);
  };

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Le fichier doit être une image");
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2 MB
      setImageError("L'image doit être inférieure à 2 Mo");
      return false;
    }
    setImageError(""); // Réinitialiser les erreurs
    return true;
  };

  // Fonction pour upload l'image sur Firebase
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // Vous pouvez gérer ici l'affichage de la progression si nécessaire
      },
      (error) => {
        console.error(error);
        setImageError("Erreur lors du téléchargement de l'image");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setRecipe((prevData) => ({
            ...prevData,
            imageUrl: downloadURL, // Mise à jour avec l'URL de l'image
          }));
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file); // Appel à la fonction pour uploader l'image
    }
  }, [file]);

  // Gestion des ingrédients
  const handleAddIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
        { name: "", quantity: "", unit: "" },
      ],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    setRecipe((prevRecipe) => {
      const updatedIngredients = [...prevRecipe.ingredients];
      updatedIngredients[index][field] = value;
      return { ...prevRecipe, ingredients: updatedIngredients };
    });
  };

  // Gestion des instructions
  const handleAddInstruction = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...prevRecipe.instructions, ""],
    }));
  };

  const handleRemoveInstruction = (index) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: prevRecipe.instructions.filter((_, i) => i !== index),
    }));
  };

  const handleInstructionChange = (index, value) => {
    setRecipe((prevRecipe) => {
      const updatedInstructions = [...prevRecipe.instructions];
      updatedInstructions[index] = value;
      return { ...prevRecipe, instructions: updatedInstructions };
    });
  };

  // Gestion des comments (bienfaits)
  const handleAddComment = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      comments: [...prevRecipe.comments, ""],
    }));
  };

  const handleRemoveComment = (index) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      comments: prevRecipe.comments.filter((_, i) => i !== index),
    }));
  };

  const handleCommentChange = (index, value) => {
    setRecipe((prevRecipe) => {
      const updatedComments = [...prevRecipe.comments];
      updatedComments[index] = value;
      return { ...prevRecipe, comments: updatedComments };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const recipeData = { ...recipe };

      // Si une image a été ajoutée, l'URL est déjà stockée dans `recipe.imageUrl`
      await addRecipe(recipeData).unwrap(); // Utilisation de la mutation
      navigate(-1); // Redirection après soumission réussie
    } catch (error) {
      setError("Erreur lors de la création de la recette.");
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-Recipe d-flex flex-column align-items-center pb-3">
      <FormContainer size="12">
        <h1 className="text-center mb-4">Créer une recette</h1>
        <BackButton />

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Colonne gauche */}
            <Col xs={12} md={6} className="mb-2">
              <Card className="mb-3">
                <Card.Header>Informations générales</Card.Header>
                <Card.Body>
                {/* Mise en page pour Category et Regime */}
                <div className="row">
                    <Form.Group controlId="name"  className="col-12 col-md-6 mb-2">
                      <Form.Label>Nom de la recette *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nom de la recette"
                        value={recipe.name}
                        onChange={(e) =>
                          setRecipe({ ...recipe, name: e.target.value })
                        }
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="country" className="col-12 col-md-6 mb-2">
                      <Form.Label>Pays *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nationalité de la recette"
                        value={recipe.country}
                        onChange={(e) =>
                          setRecipe({ ...recipe, country: e.target.value })
                        }
                        required
                      />
                    </Form.Group>
                  </div>
                  {/* Mise en page pour Category et Regime */}
                  <div className="row">
                    <Form.Group  controlId="category"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Catégorie *</Form.Label>
                      <Form.Control
                        as="select"
                        value={recipe.category}
                        onChange={(e) =>
                          setRecipe({ ...recipe, category: e.target.value })
                        }
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

                    <Form.Group controlId="regime"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Régime *</Form.Label>
                      <Form.Control
                        as="select"
                        value={recipe.regime}
                        onChange={(e) =>
                          setRecipe({ ...recipe, regime: e.target.value })
                        }
                        required
                      >
                        <option value="">Sélectionner un régime</option>
                        <option value="traditionnal">Traditionnelle</option>
                        <option value="vegetarian">Végétarien</option>
                        <option value="vegan">Végan</option>
                        <option value="gluten-free">Sans gluten</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>

              <Card className="mb-3" id="Temps_de_préparation_et_cuisson">
                <Card.Header>Temps de préparation et cuisson</Card.Header>
                <Card.Body>
                  <Form>
                    <div className="row">
                      <Form.Group controlId="makingTime"
                        className="col-12 col-md-6 mb-2"
                      >
                        <Form.Label>Préparation (en min) *</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Temps de préparation"
                          value={recipe.makingTime}
                          onChange={(e) =>
                            setRecipe({ ...recipe, makingTime: e.target.value })
                          }
                          required
                        />
                      </Form.Group>

                      <Form.Group  controlId="cookingTime"
                        className="col-12 col-md-6 mb-2"
                      >
                        <Form.Label>Cuisson (en min) *</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          placeholder="Temps de cuisson"
                          value={recipe.cookingTime}
                          onChange={(e) =>
                            setRecipe({
                              ...recipe,
                              cookingTime: e.target.value,
                            })
                          }
                          required
                        />
                      </Form.Group>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              {/* Image */}
              <Card className="mb-2" id="ImageAddRecipe">
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
                    {imageError && <p className="text-danger">{imageError}</p>}
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

            {/* Colonne droite */}
            <Col xs={12} md={6}>
              <Card className="mb-3" id="ingredient">
                <Card.Header>Ingrédients</Card.Header>
                <Card.Body>
                  {recipe.ingredients.length === 0 ? (
                    <p className="text-muted">
                      Aucun ingrédient ajouté pour le moment.
                    </p>
                  ) : (
                    recipe.ingredients.map((ingredient, index) => (
                      <Row key={index} className="align-items-center mb-3 mx-3">
                        <Col xs={12} sm={5} className="mb-2 mb-sm-0">
                          <Form.Control
                            type="text"
                            placeholder="Nom de l'ingrédient"
                            value={ingredient.name}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            required
                          />
                        </Col>
                        <Col xs={6} sm={3} className="mb-2 mb-sm-0">
                          <Form.Control
                            type="number"
                            min="0"
                            placeholder="Quantité"
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
                        <Col xs={6} sm={3} className="mb-2 mb-sm-0">
                          <Form.Control
                            as="select"
                            value={ingredient.unit}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "unit",
                                e.target.value
                              )
                            }
                            required
                          >
                            <option value="">Unité</option>
                            <option value="nombre">nombre</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="pcs">tasse</option>
                            <option value="tbsp">cuillère à soupe</option>
                            <option value="tsp">cuillère à café</option>
                          </Form.Control>
                        </Col>
                        <Col xs={12} sm={1}>
                          <Button
                            variant="danger"
                            className="m-0"
                            onClick={() => handleRemoveIngredient(index)}
                          >
                            <RxCross1 />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  )}
                  <Button
                    variant="outline-success"
                    className="mt-2"
                    onClick={handleAddIngredient}
                  >
                    Ajouter un ingrédient
                  </Button>
                </Card.Body>
              </Card>

              <Card className="mb-3" id="preparation">
                <Card.Header>Préparation</Card.Header>
                <Card.Body>
                  {recipe.instructions.length === 0 ? (
                    <p className="text-muted">
                      Aucune instruction ajouté pour le moment.
                    </p>
                  ) : (
                    recipe.instructions.map((instruction, index) => (
                      <Row key={index} className="mb-2">
                        <Col xs={10}>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={3}
                            placeholder={`Étape de préparation ${index + 1}`}
                            value={instruction}
                            onChange={(e) =>
                              handleInstructionChange(index, e.target.value)
                            }
                          />
                        </Col>
                        <Col xs={2}>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveInstruction(index)}
                          >
                            <RxCross1 />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  )}
                  <Button
                    variant="outline-success"
                    onClick={handleAddInstruction}
                  >
                    Ajouter une étape
                  </Button>
                </Card.Body>
              </Card>
              <Card className="mb-3" id="biennfaits">
                <Card.Header>Bienfaits</Card.Header>
                <Card.Body>
                  {recipe.comments.length === 0 ? (
                    <p className="text-muted">
                      Aucun bienfait ajouté pour le moment.
                    </p>
                  ) : (
                    recipe.comments.map((comment, index) => (
                      <Row key={index} className="mb-2">
                        <Col xs={10}>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={2}
                            placeholder={`Bienfait ${index + 1}`}
                            value={comment}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                          />
                        </Col>
                        <Col xs={2}>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveComment(index)}
                          >
                            <RxCross1 />
                          </Button>
                        </Col>
                      </Row>
                    ))
                  )}
                  <Button variant="outline-success" onClick={handleAddComment}>
                    Ajouter un bienfait
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button id="buutonAddRecipe"
            type="submit"
            variant="success"
            className="w-100 mt-2 mb-3 btnAddRecipe"
          >
            {isLoading ? <Loader /> : "Enregistrer la recette"}
          </Button>
        </Form>
      </FormContainer>
    </section>
  );
}
