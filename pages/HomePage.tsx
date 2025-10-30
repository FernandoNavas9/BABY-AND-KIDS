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
}

const HomePage: React.FC<HomePageProps> = ({ products, isSidebarOpen, setIsSidebarOpen }) => {
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
        {filteredProducts.length > 0 ? (
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
