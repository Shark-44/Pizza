import { Product } from '../types/types';

interface ProductCardProps {
    product: Product; 
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="product-card">
            <h2>{product.nomproduit}</h2>
            <img src={product.photoProduit} alt={product.nomproduit} />
            <p>{product.descriptionProduit}</p>
        </div>
    );
}
  
  export default ProductCard;