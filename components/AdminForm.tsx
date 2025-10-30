
import React, { useState, useEffect } from 'react';
import { Product, MainCategory } from '../types';
import { CATEGORIES, SIZES } from '../constants';

interface AdminFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


const AdminForm: React.FC<AdminFormProps> = ({ onAddProduct, onUpdateProduct, editingProduct, onCancelEdit }) => {
  const [product, setProduct] = useState({
      name: '',
      price: '',
      description: '',
      brand: '',
      color: '',
      size: SIZES[0],
      quantity: '',
      category: CATEGORIES[0].name as MainCategory,
      subcategory: CATEGORIES[0].subcategories[0],
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  useEffect(() => {
    if (editingProduct) {
      setProduct({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        description: editingProduct.description,
        brand: editingProduct.brand,
        color: editingProduct.color,
        size: editingProduct.size,
        quantity: editingProduct.quantity.toString(),
        category: editingProduct.category,
        subcategory: editingProduct.subcategory,
      });
      setImageUrls(editingProduct.imageUrls);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setProduct({
        name: '', price: '', description: '', brand: '', color: '',
        size: SIZES[0], quantity: '', category: CATEGORIES[0].name,
        subcategory: CATEGORIES[0].subcategories[0],
    });
    setImageUrls([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as MainCategory;
    const cat = CATEGORIES.find(c => c.name === newCategory);
    setProduct(prev => ({
        ...prev,
        category: newCategory,
        subcategory: cat && cat.subcategories.length > 0 ? cat.subcategories[0] : ''
    }));
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Promises = files.map(fileToBase64);
      try {
        const base64Urls = await Promise.all(base64Promises);
        setImageUrls(prev => [...prev, ...base64Urls]);
      } catch (error) {
        console.error("Error converting files to base64", error);
        alert("Hubo un error al cargar las imágenes.");
      }
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
        alert('Por favor, sube al menos una imagen.');
        return;
    }
    const productData = {
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
      imageUrls,
    };

    if (editingProduct) {
        onUpdateProduct({ ...productData, id: editingProduct.id });
        alert('¡Producto actualizado con éxito!');
        onCancelEdit();
    } else {
        onAddProduct(productData);
        alert('¡Producto agregado con éxito!');
    }
    resetForm();
  };

  const subcategoriesForSelectedCategory = CATEGORIES.find(c => c.name === product.category)?.subcategories || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-blue mb-6">{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
              <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
          </div>
          <div className="space-y-2">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
              <input type="text" id="brand" name="brand" value={product.brand} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
          </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" name="description" value={product.description} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
      </div>

      <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Imágenes del Producto</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-pink hover:text-brand-pink-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-pink"><span>Sube tus archivos</span><input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} multiple accept="image/*" /></label><p className="pl-1">o arrástralos aquí</p></div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
            </div>
          </div>
          {imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                        <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-md"/>
                        <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs leading-none">&times;</button>
                    </div>
                ))}
            </div>
          )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
              <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
          </div>
          <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad en Stock</label>
              <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleInputChange} step="1" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
          </div>
          <div className="space-y-2">
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
              <input type="text" id="color" name="color" value={product.color} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" required />
          </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select id="category" name="category" value={product.category} onChange={handleCategoryChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink">
            {CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategoría</label>
          <select id="subcategory" name="subcategory" value={product.subcategory} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink" disabled={subcategoriesForSelectedCategory.length === 0}>
            {subcategoriesForSelectedCategory.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
        </div>
         <div className="space-y-2 md:col-span-2">
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">Talla</label>
          <select id="size" name="size" value={product.size} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-pink focus:border-brand-pink">
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button type="submit" className="flex-grow bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {editingProduct && (
          <button type="button" onClick={() => { onCancelEdit(); resetForm(); }} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-md transition-colors">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminForm;
