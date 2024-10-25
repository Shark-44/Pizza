import FilterButtons from "./FilterButtons";
import OrderSummary from "./OrderSummary";
import { Basket } from "../../types/types";

interface SidebarProps {
  orderItems: Basket[];
  setIdType: (type: number | undefined) => void;
}

const Sidebar = ({ orderItems, setIdType }: SidebarProps) => {
  const hasItemsInBasket = orderItems.length > 0;

  return (
    <div className="w-64 fixed top-20 left-0 h-[calc(100vh-5rem)] bg-gray-950 p-4 z-10 ">
      {hasItemsInBasket ? (
        // Affichage du mini panier
        <div className="flex flex-col gap-y-4 my-16">
          <h2 className="text-white text-lg font-semibold mb-4">Mini Panier</h2>
          <div className="bg-gray-800 p-2 rounded-md overflow-y-auto max-h-[60vh]">
            {orderItems.map(item => (
              <div key={item.produit_id} className="text-white flex justify-between p-2 border-b border-gray-700">
                <span>Produit ID: {item.produit_id}</span>
                <span>Qté: {item.quantiteCommande}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIdType(undefined)} 
            className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
          >
            Retour aux Filtres
          </button>
        </div>
      ) : (
        // Affichage des filtres 
        <div className="flex flex-col p-4 gap-y-4 my-16">
          <FilterButtons setIdType={setIdType} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
