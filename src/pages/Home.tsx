import { useState } from "react";
import Button from "../components/aggregate/button";
import useFetchOrders from "../hooks/useFetchOrders";
import { Link } from "react-router-dom";
import { useGenerateOrderNumber } from '../hooks/useGenerateOrderNumber'; 
import { createOrder } from '../api/orderService'; 

const Home = () => {
    const { orders, error } = useFetchOrders();
    const { orderNumber } = useGenerateOrderNumber('E'); 
    const [creationError, setCreationError] = useState<string | null>(null);

    const handleButtonClick = async () => {
        if (orders.length > 0) {
            console.log('Liste Commandes récupérées:', orders);
        }
        if (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
            return; 
        }

      
        if (orderNumber) {
            const timestamp = new Date().toISOString().replace('Z', '');
            
            try {
                const newOrder = await createOrder(orderNumber, timestamp); 
                console.log('Commande créée avec succès:', newOrder);
            } catch (err) {
                console.error('Erreur lors de la création de la commande:', err);
                setCreationError('Erreur lors de la création de la commande');
            }
        }
    };

    return (
        <div className="bg-yellow-50 h-screen flex justify-center items-center">
                <Link 
                to={{
                    pathname: "/Order"
                }} 
                state={{ id: 2 }}  
                >
                <Button 
                    label="Entrer"
                    onClick={handleButtonClick} 
                    className=""
                />
            </Link>
            {creationError && <p>{creationError}</p>} 
        </div>
    );
};

export default Home;
