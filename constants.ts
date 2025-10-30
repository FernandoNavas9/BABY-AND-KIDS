import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { 
    name: 'Bebé', 
    subcategories: ['Playera', 'Body', 'Pijama', 'Conjuntos', 'Pantalones', 'Accesorios'] 
  },
  { 
    name: 'Niñas', 
    subcategories: ['Vestidos', 'Blusas', 'Pantalones', 'Faldas', 'Suéter', 'Chamarras', 'Accesorios'] 
  },
  { 
    name: 'Niños', 
    subcategories: ['Camisetas', 'Pantalones', 'Playeras', 'Suéter', 'Chamarras', 'Accesorios'] 
  },
];

export const SIZES: string[] = [
  '0-3 Meses', '3-6 Meses', '6-9 Meses', '9-12 Meses', 
  '12-18 Meses', '18-24 Meses', '2 Años', '3 Años', 
  '4 Años', '5 Años', 'Chica', 'Mediana', 'Grande'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Body Estampado de Nube',
    price: 15.99,
    description: 'Suave body de algodón con un adorable estampado de nubes. Perfecto para el día a día de tu bebé.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Body+Nube+1'],
    category: 'Bebé',
    subcategory: 'Body',
    brand: 'BabyJoy',
    color: 'Blanco',
    size: '3-6 Meses',
    quantity: 15,
  },
  {
    id: 2,
    name: 'Pijama de Dinosaurio',
    price: 22.50,
    description: 'Pijama de dos piezas con divertido estampado de dinosaurios. Hecho de algodón orgánico.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Pijama+Dino+1'],
    category: 'Bebé',
    subcategory: 'Pijama',
    brand: 'MiniPaws',
    color: 'Verde',
    size: '12-18 Meses',
    quantity: 8,
  },
  {
    id: 3,
    name: 'Vestido Floral de Verano',
    price: 29.99,
    description: 'Precioso vestido de verano con estampado floral. Ligero y cómodo para los días de calor.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Vestido+Floral+1', 'https://via.placeholder.com/600x600.png?text=Vestido+Floral+2'],
    category: 'Niñas',
    subcategory: 'Vestidos',
    brand: 'ChicKids',
    color: 'Rosa',
    size: '4 Años',
    quantity: 12,
  },
    {
    id: 4,
    name: 'Camiseta de Superhéroe',
    price: 18.00,
    description: 'Camiseta de algodón con el logo de su superhéroe favorito. Ideal para jugar sin parar.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Camiseta+Super+1'],
    category: 'Niños',
    subcategory: 'Camisetas',
    brand: 'HeroWear',
    color: 'Azul',
    size: '5 Años',
    quantity: 20,
  },
  {
    id: 5,
    name: 'Conjunto de Algodón',
    price: 25.00,
    description: 'Cómodo conjunto de dos piezas de algodón para bebé. Incluye pantalón y buzo.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Conjunto+Bebe+1'],
    category: 'Bebé',
    subcategory: 'Conjuntos',
    brand: 'BabyJoy',
    color: 'Gris',
    size: '6-9 Meses',
    quantity: 0,
  },
  {
    id: 6,
    name: 'Falda de Tul Brillante',
    price: 20.00,
    description: 'Falda de tul con brillos para niñas. Perfecta para ocasiones especiales.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Falda+Tul+1'],
    category: 'Niñas',
    subcategory: 'Faldas',
    brand: 'ChicKids',
    color: 'Dorado',
    size: '3 Años',
    quantity: 7,
  },
  {
    id: 7,
    name: 'Pantalón de Jean',
    price: 24.50,
    description: 'Pantalón de jean resistente y moderno para niños. Ideal para el verano.',
    imageUrls: ['https://via.placeholder.com/600x600.png?text=Bermuda+Jean+1', 'https://via.placeholder.com/600x600.png?text=Bermuda+Jean+2', 'https://via.placeholder.com/600x600.png?text=Bermuda+Jean+3'],
    category: 'Niños',
    subcategory: 'Pantalones',
    brand: 'UrbanKid',
    color: 'Denim',
    size: 'Grande',
    quantity: 18,
  },
];