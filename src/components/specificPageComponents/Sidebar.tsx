import FilterButtons from "./FilterButtons";
import { Basket } from "../../types/types";
import { useProductDetails } from "../../hooks/useProductDetails";
import { useShowFilters } from "../../hooks/useShowFilters";

interface SidebarProps {
  orderItems: Basket[];
  setIdType: (type: number | undefined) => void;
}

const Sidebar = ({ orderItems, setIdType }: SidebarProps) => {
  const { showFilters, setShowFilters } = useShowFilters(orderItems);
  const { getProductDisplay } = useProductDetails(orderItems);

  return (
    <div className="w-64 fixed top-20 left-0 h-[calc(100vh-5rem)] bg-gray-950 p-4 z-10">
      {showFilters ? (
        <div className="flex flex-col p-4 gap-y-4 my-20">
          <FilterButtons setIdType={setIdType} />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 my-20">
          <h2 className="text-white text-lg font-semibold mb-4">Votre commande</h2>
          <div className="bg-gray-800 p-2 rounded-md overflow-y-auto max-h-[60vh]">
            {orderItems.map(item => (
              <div
                key={item.produit_id}
                className="text-white flex justify-between p-2 border-b border-gray-700"
              >
                <span className="truncate flex-1">
                  {getProductDisplay(item.produit_id)}
                </span>
                <span className="ml-2">Qté: {item.quantiteCommande}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
          >
            Retour liste produits
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
