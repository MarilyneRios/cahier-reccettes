import { useNavigate } from 'react-router-dom';
import { IoReturnUpBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Retourne à la page précédente
  };

  return (
    <button
      onClick={handleGoBack}
      className="btn btn-dark mt-2 fs-4 rounded d-flex align-items-center justify-content-center"
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
      }}
      title="Revenir à la page précédente"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <IoReturnUpBack size={28} />
    </button>
  );
};

export default BackButton;
