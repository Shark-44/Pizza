import Button from "../components/aggregate/button";
import useFetchOrders from "../hooks/useFetchOrders";
import { Link } from "react-router-dom";

const Home = () => {
    //si multi-kiosk bouger en pages Orders
    const { orders, error } = useFetchOrders();


    const handleButtonClick = () => {
        if (orders.length > 0) {
            console.log('Liste Commandes récupérées:', orders);
        }
        if (error) {
            console.error('Erreur lors de la récupération des commandes:', error);
        }
 
    };
    return (
        <div className="bg-yellow-50 h-screen flex justify-center items-center">
            <Link to="/Order">
                <Button 
                    label="Entrer"
                    onClick={() => handleButtonClick()}
                    className=""
                />
            </Link>
        </div>

    )
    }
    export default Home;