import { Product } from '../types/types';

interface ProductCardProps {
    product: Product; 
}

function ProductCard({ product }: ProductCardProps) {
    const API_URL = import.meta.env.VITE_BACKEND_URL
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 m-2">
        <h2 className="font-dancing text-3xl font-semibold mb-2">{product.nomproduit}</h2>
        <img
            src={API_URL + product.photoProduit}
            alt={product.nomproduit}
            className="w-full h-58 object-cover mb-2"
        />
        <p className="font-dancing text-2xl text-gray-700">{product.descriptionProduit}</p>
    </div>
    );
}
  
  export default ProductCard;