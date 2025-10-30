import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

interface HomePageProps {
  products: Product[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isLoading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ products, isSidebarOpen, setIsSidebarOpen, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'Todos') {
        return products;
    }
    const isMainCategory = CATEGORIES.some(c => c.name === selectedCategory);
    if (isMainCategory) {
        return products.filter(p => p.category === selectedCategory);
    }
    return products.filter(p => p.subcategory === selectedCategory);
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="flex">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 p-4 sm:p-8 bg-brand-bg min-h-[calc(100vh-81px)]">
        <h1 className="text-3xl font-bold text-brand-blue mb-6 border-b-2 border-brand-pink-light pb-2">{selectedCategory}</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
                <svg className="animate-spin h-10 w-10 text-brand-pink mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-4 text-lg text-gray-600">Cargando productos...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-gray-500 text-lg">No se encontraron productos en esta categoría.</p>
          </div>
        )}
      </main>
      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
