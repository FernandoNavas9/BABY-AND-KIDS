
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const isSoldOut = product.quantity === 0;

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col relative ${isSoldOut ? 'opacity-70' : ''}`}>
      {isSoldOut && (
         <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            Agotado
         </div>
      )}
      <div className="h-56 w-full overflow-hidden">
        <img src={product.imageUrls[0]} alt={product.name} className={`w-full h-full object-cover ${isSoldOut ? 'filter grayscale' : ''}`} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-brand-blue truncate">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="text-xl font-bold text-brand-pink mt-2">${product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-400 mt-1">En Stock: {product.quantity}</p>
        <div className="mt-auto pt-4">
          <button
            onClick={() => onViewProduct(product)}
            className="w-full bg-brand-pink text-white py-2 rounded-md font-semibold hover:bg-brand-pink-dark transition-colors"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
