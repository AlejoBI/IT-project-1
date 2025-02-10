import { useNavigate } from "react-router-dom";

const BackToHomeButton = ({ text = "🏠 Inicio" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="fixed top-4 left-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
    >
      {text}
    </button>
  );
};

export default BackToHomeButton;
