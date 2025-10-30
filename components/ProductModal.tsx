
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (product && product.imageUrls.length > 0) {
      setSelectedImage(product.imageUrls[0]);
    }
  }, [product]);

  if (!product) return null;
  
  const isSoldOut = product.quantity === 0;

  const handleZoom = () => {
    if (selectedImage) {
      setIsZoomed(true);
    }
  }

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-scale" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="md:w-1/2 w-full p-4 flex flex-col gap-4">
            <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden cursor-pointer" onClick={handleZoom}>
                <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 justify-center">
                {product.imageUrls.map((url, index) => (
                    <div 
                        key={index} 
                        className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === url ? 'border-brand-pink' : 'border-transparent'}`}
                        onClick={() => setSelectedImage(url)}
                    >
                        <img src={url} alt={`${product.name} thumbnail ${index+1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
        <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-3xl font-bold text-brand-blue">{product.name}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 -mt-2 -mr-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-500 font-semibold mb-3">{product.brand}</p>
            <p className="text-2xl font-extrabold text-brand-pink mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center gap-2"><span className="font-bold text-gray-700 w-20">Color:</span><span>{product.color}</span></div>
                <div className="flex items-center gap-2"><span className="font-bold text-gray-700 w-20">Talla:</span><span>{product.size}</span></div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-700 w-17">Disponibilidad:  </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isSoldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {isSoldOut ? 'Agotado' : `${product.quantity} en stock`}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 text-sm mb-6">
                <span className="bg-brand-blue-light text-brand-blue px-3 py-1 rounded-full font-medium">{product.category}</span>
                <span className="bg-brand-pink-light text-brand-pink px-3 py-1 rounded-full font-medium">{product.subcategory}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[60] flex justify-center items-center" onClick={() => setIsZoomed(false)}>
            <img src={selectedImage} alt="Zoomed view" className="max-w-[90vw] max-h-[90vh] object-contain"/>
            <button onClick={() => setIsZoomed(false)} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
        </div>
    )}
    </>
  );
};

export default ProductModal;