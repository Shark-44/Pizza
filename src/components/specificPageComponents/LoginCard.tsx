import { useState } from "react";
import { login } from "../../api/userService";

const LoginCard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);  

  const handleSubmit = async () => {
    try {
      const loggedInUser = await login(name, password);
      console.log("Utilisateur connecté:", loggedInUser); 
      setUserId(loggedInUser.iduser);
      setError(null);
    } catch (err) {
      console.error("Erreur de connexion :", err); 
      setError("Erreur de connexion, vérifiez vos identifiants.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Identifiez-vous
          </h1>

          <label htmlFor="login-input" className="block text-lg text-gray-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={name}
            onChange={(event) => {
              if (!event.target.value.includes(">") && !event.target.value.includes("<")) {
                setName(event.target.value);
              }
            }}
          />

          <label htmlFor="password-input" className="block text-lg text-gray-700 mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              if (!event.target.value.includes(">") && !event.target.value.includes("<")) {
                setPassword(event.target.value);
              }
            }}
          />

          {error && <p className="text-red-500 mb-4">{error}</p>} {/* Affichage des erreurs */}

          <input
            type="button"
            value="LOGIN"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
