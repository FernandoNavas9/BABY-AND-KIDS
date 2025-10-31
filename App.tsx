import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { Product } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products from API:", error);
      alert('Hubo un error al cargar los productos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

 const handleAddProduct = async (newProduct: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add product');
      await fetchProducts(); // Refetch to get the latest list with new ID
      return true;
    } catch (error) {
        console.error("Error adding product via API:", error);
        alert('Hubo un error al agregar el producto.');
        return false;
    }
  };
  
  const handleUpdateProduct = async (updatedProduct: Product): Promise<boolean> => {
     try {
       const response = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error('Failed to update product');
      await fetchProducts(); // Refetch for consistency
      return true;
    } catch (error) {
        console.error("Error updating product via API:", error);
        alert('Hubo un error al actualizar el producto.');
        return false;
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
       const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId }),
      });
      if (!response.ok) throw new Error('Failed to delete product');
      await fetchProducts(); // Refetch to update list
    } catch (error) {
        console.error("Error deleting product via API:", error);
        alert('Hubo un error al eliminar el producto.');
    }
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="font-sans">
        <Header onMenuClick={toggleSidebar} />
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={products} 
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isLoading={isLoading}
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            } 
          />
        </Routes>
    </div>
  );
};

export default App;
