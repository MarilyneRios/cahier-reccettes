import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// React-Bootstrap
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { GoTrash } from "react-icons/go";

// Icône
import { RxCross1 } from "react-icons/rx";

// Composants réutilisables
import FormContainer from "../../../components/shared/FormContainer";
import Loader from "../../../components/shared/Loader";
import BackButton from "../../../components/shared/BackButton";
import bookImage from "../../../assets/homeBg2.png";
// Image sur Firebase
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../firebase";

// Import de la mutation addRecipe
import { useUpdateRecipeMutation } from "../../../redux/recipes/recipesApiSlice";
import { useDisplayOneRecipeQuery } from "../../../redux/recipes/recipesApiSlice";
import { useDeleteRecipeMutation } from "../../../redux/recipes/recipesApiSlice";

//notification
import { toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./changeRecipe.styles.css";

export default function ChangeRecipe() {
  //
  const { currentUser } = useSelector((state) => state.user);
  // Récupération de l'ID recipe depuis l'URL
  const { id } = useParams();

  // vérifier chaque étape du processus
  console.log("ID récupéré depuis l'URL:", id);

  const navigate = useNavigate();

  //Initialiser l'état de la recette
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

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  // Pour récupérer les datas du recipe
  const { data: recipeData, isError } = useDisplayOneRecipeQuery(id);
  console.log("Données complètes de la recette:", recipeData);


  // vérifier chaque étape du processus
  console.log("Données reçues du backend (recipeData):", recipeData);
  console.log(
    "isLoading:",
    isLoading,
    "| isError:",
    isError,
    "| error:",
    error
  );

  // Mettre à jour l'état du recipe qd les datas sont récupérées
  useEffect(() => {
    if (recipeData && recipeData.recipe) {
      // Éviter la mise à jour si recipeData est déjà utilisé
      if (recipe.name === "") {
        setRecipe({
          ...recipe,
          name: recipeData.recipe.name || "",
          country: recipeData.recipe.country || "",
          category: recipeData.recipe.category || "",
          regime: recipeData.recipe.regime || "",
          ingredients: Array.isArray(recipeData.recipe.ingredients)
            ? recipeData.recipe.ingredients
            : [],
          instructions: recipeData.recipe.instructions || [],
          comments: recipeData.recipe.comments || [],
          makingTime: recipeData.recipe.makingTime || "",
          cookingTime: recipeData.recipe.cookingTime || "",
          imageUrl: recipeData.recipe.imageUrl || "",
        });
      }
    }
  }, [recipeData, recipe.name]);

  // vérifier chaque étape du processus
  console.log("État actuel de recipe après mise à jour:", recipe);

  // Modifier les datas de recipe
  const [updateRecipe] = useUpdateRecipeMutation(id);

  // Pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    console.log(
      "Changement détecté dans le champ:",
      e.target.name,
      "Nouvelle valeur:",
      e.target.value
    );
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  //////////////////////////////////////////////////
  // télécharger image firebase
  //////////////////////////////////////////////////
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
    if (file.size > 3.5 * 1024 * 1024) {
      // 2 MB
      setImageError("L'image doit être inférieure à 3.5 Mo");
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

  ////////////////////////////////////////////////////////
  // // ingredients
  ////////////////////////////////////////////////////////
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { name: "", quantity: "", unit: "" }, // Ajoute un ingrédient vide
      ],
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  ////////////////////////////////////////////////////////
  // // instuctions
  ////////////////////////////////////////////////////////
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
  ////////////////////////////////////////////////////////
  // // comments
  ////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////
  // //Supp une recette
  ////////////////////////////////////////////////////////
   // Modifier les datas de recipe
   const [deleteRecipe] = useDeleteRecipeMutation(id);

  const handleDeleteRecipe = async () => {
    try {
      // Appel à la mutation pour supprimer la recette
      await deleteRecipe(id).unwrap();
      // Vous pouvez ajouter ici des actions après la suppression, comme la redirection ou la mise à jour de l'état
      console.log('Recette supprimée avec succès');
      console.log("Affichage de la notification...");
      toast.success("Recette supprimée avec succès!");

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette', error);
      toast.error( "Erreur lors de la mise à jour !");
    }

  };
  ////////////////////////////////////////////////////////
  // // Soumettre le formulaire
  ////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Données envoyées au backend:", recipe);
      await updateRecipe({ id, ...recipe });
      toast.success("Recette modifiée avec succès.");
      navigate(-1); 
    } catch (error) {
      setError("Erreur lors de la mise à jour de la recette.");
      toast.error( "Erreur lors de la  mise à jour de la recette !");
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-Recipe d-flex flex-column align-items-center pb-3">
      <FormContainer size="12">
      <h1 className="text-center mb-4">
  <span className="d-inline d-md-none">Modifier</span>
  <span className="d-none d-md-inline">Modifier une recette</span>
</h1>

        <BackButton />

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Colonne gauche */}
            <Col xs={12} md={6} className="mb-2">
              <Card className="mb-3">
                <Card.Header>Informations générales</Card.Header>
                <Card.Body>
                  {/* Mise en page pour name et country */}
                  <div className="row">
                    <Form.Group
                      controlId="name"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Nom de la recette *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nom de la recette"
                        value={recipe.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="country"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Pays *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nationalité de la recette"
                        value={recipe.country}
                        onChange={handleChange}
                        name="country"
                        required
                      />
                    </Form.Group>
                  </div>
                  {/* Mise en page pour Category et Regime */}
                  <div className="row">
                    <Form.Group
                      controlId="category"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Catégorie *</Form.Label>
                      <Form.Control
                        as="select"
                        value={recipe.category}
                        onChange={handleChange}
                        name="category"
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

                    <Form.Group
                      controlId="regime"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Régime *</Form.Label>
                      <Form.Control
                        as="select"
                        value={recipe.regime}
                        onChange={handleChange}
                        name="regime"
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
                  <div className="row">
                    <Form.Group
                      controlId="makingTime"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Préparation (en min) *</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Temps de préparation"
                        value={recipe.makingTime}
                        onChange={handleChange}
                        name="makingTime"
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="cookingTime"
                      className="col-12 col-md-6 mb-2"
                    >
                      <Form.Label>Cuisson (en min) *</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="Temps de cuisson"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                        name="cookingTime"
                        required
                      />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>

              {/* Image */}
              <Card className="mb-2" id="ImageAddRecipe">
                <Card.Header>Image</Card.Header>
                <Card.Body className="text-center">
                  <img
                    src={recipe.imageUrl || bookImage}
                    alt={recipe.name}
                    className="recipe-image img-fluid w-100 border border-white rounded mb-3"
                    style={{
                      width: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <Form.Group controlId="imageUrl">
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
                        <Col xs={12} sm={5} className="mb-2 mb-sm-0 pe-0">
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
                            value={ingredient.quantity}
                            onChange={(e) =>
                              handleIngredientChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            style={{ width: '80px' }} 
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
                            style={{ width: '80px' }}
                            required
                          >
                            <option value="">Unité</option>
                            <option value="nombre">nbre</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="pcs">tasse</option>
                            <option value="tbsp">c.soupe</option>
                            <option value="tsp">c.café</option>
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
                        <Col xs={10} className="pe-0  w-75">
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
                        <Col xs={2} className="text-center">
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
              <Card className="mb-2" id="biennfaits">
                <Card.Header>Bienfaits</Card.Header>
                <Card.Body>
                  {recipe.comments.length === 0 ? (
                    <p className="text-muted">
                      Aucun bienfait ajouté pour le moment.
                    </p>
                  ) : (
                    recipe.comments.map((comment, index) => (
                      <Row key={index} className="mb-2 align-items-center">
                        <Col xs={10}  className="pe-0  w-75">
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={2}
                            Col={5}
                            placeholder={`Bienfait ${index + 1}`}
                            value={comment}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                          />
                        </Col>
                        <Col xs={2} className="text-center">
                          <Button
                            variant="danger"
                            className=" " 
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

          <Button
            id="buttonChangeRecipe"
            type="submit"
            variant="success"
            className=" my-3 fs-5 fs-md-6"
          >
            {isLoading ? <Loader /> : "Modifier la recette"}
          </Button>
          <Button
            variant="danger"
            id="buttonDeleteRecipe"
            className=" my-3  fs-5 fs-md-6 "
            onClick={handleDeleteRecipe}
          >
             <GoTrash />
          </Button>
        </Form>
      </FormContainer>
    </section>
  );
}
