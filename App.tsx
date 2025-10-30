
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { Product } from './types';
import { API_ENDPOINT, MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const updateProductsOnServer = async (updatedProducts: Product[]) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProducts),
      });
      if (!response.ok) {
        throw new Error(`Failed to update products: ${await response.text()}`);
      }
      return true;
    } catch (error) {
      console.error("Error updating products on server:", error);
      alert('Hubo un error al guardar los cambios. Por favor, inténtelo de nuevo.');
      return false;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
           // If the endpoint doesn't exist or there's a server error, initialize with mock data.
          console.warn('Failed to fetch products, initializing with mock data.');
          setProducts(MOCK_PRODUCTS);
          await updateProductsOnServer(MOCK_PRODUCTS); // Seed the database
          return;
        }

        const data = await response.json();
        
        // keyvalue.xyz can return `false` for an empty key. Check if data is a valid array.
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          // If data is not an array or is empty, it's an uninitialized or corrupt store.
          console.warn('API returned no products or invalid data. Initializing with mock data.');
          setProducts(MOCK_PRODUCTS);
          await updateProductsOnServer(MOCK_PRODUCTS); // Seed the database
        }

      } catch (error) {
        // Catch JSON parsing errors or other network issues.
        console.error("Error fetching products, initializing with mock data:", error);
        setProducts(MOCK_PRODUCTS);
        await updateProductsOnServer(MOCK_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>): Promise<boolean> => {
    const newProductsList = [
      ...products,
      {
        ...newProduct,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      },
    ];
    const success = await updateProductsOnServer(newProductsList);
    if (success) {
      setProducts(newProductsList);
    }
    return success;
  };
  
  const handleUpdateProduct = async (updatedProduct: Product): Promise<boolean> => {
    const newProductsList = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    const success = await updateProductsOnServer(newProductsList);
    if (success) {
      setProducts(newProductsList);
    }
    return success;
  };

  const handleDeleteProduct = async (productId: number) => {
    const newProductsList = products.filter(p => p.id !== productId);
    const success = await updateProductsOnServer(newProductsList);
    if (success) {
      setProducts(newProductsList);
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
