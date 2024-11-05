import { useState } from "react";
import Button from "../components/aggregate/button";
import { useNavigate } from "react-router-dom";
import { createOrder } from '../api/orderService';
import { getCurrentDate } from "../utils/dateHelpers";
import { useOrderManagement } from '../hooks/useOrderManagement';
import LanguageSelector from "../components/specificPageComponents/LanguageSelector";
import TonyImage from '../assets/Images/Tony.webp';

const Home = () => {
  const { currentOrder, newOrderNumber, loading, error } = useOrderManagement();
  const navigate = useNavigate();
  const [creationError, setCreationError] = useState<string | null>(null);

  const handleEnter = async () => {
    try {
      if (currentOrder) {
        navigate('/Order', { state: { orderId: currentOrder.id } });
        return;
      }
      
      if (newOrderNumber) {
        const timestamp = getCurrentDate();
        const newOrder = await createOrder(newOrderNumber, timestamp);
        navigate('/Order', { state: { orderId: newOrder.id } });
      }
    } catch (err) {
      setCreationError('Erreur lors de la création/récupération de la commande');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 h-screen flex justify-center items-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 h-screen flex flex-col justify-center items-center">
      <img 
        src={TonyImage} 
        alt="Tony" 
        className="h-96 w-96 p-5 mb-5"
        style={{ borderRadius: '50px' }} 
      />
      <div className="mb-4">
        <Button
          label="Entrer"
          onClick={handleEnter}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        />
      </div>
      {creationError && (
        <p className="text-red-500 mt-4">{creationError}</p>
      )}
      <LanguageSelector />
    </div>
  );
};
export default Home;