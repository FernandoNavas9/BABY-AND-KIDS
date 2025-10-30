
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminForm from '../components/AdminForm';
import { Product } from '../types';

interface AdminPageProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };
  
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="bg-brand-bg min-h-[calc(100vh-81px)] p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6 border-b-2 border-brand-pink-light pb-2">
            <h1 className="text-3xl font-bold text-brand-blue">Panel de Administración</h1>
            <Link to="/" className="text-sm font-medium text-brand-blue hover:text-brand-pink transition-colors px-4 py-2 rounded-md bg-brand-blue-light hover:bg-brand-pink-light">
                Volver a la tienda
            </Link>
        </div>
        
        <AdminForm 
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
        />

        <div className="mt-12">
            <h2 className="text-2xl font-bold text-brand-blue mb-6">Gestionar Productos</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="space-y-4">
                    {products.length > 0 ? products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                            <div className="flex items-center gap-4">
                                <img src={product.imageUrls[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md"/>
                                <div>
                                    <p className="font-semibold text-brand-blue">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.brand} - En Stock: {product.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(product)} className="p-2 text-blue-500 hover:text-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-red-500 hover:text-red-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 py-4">No hay productos para mostrar.</p>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
