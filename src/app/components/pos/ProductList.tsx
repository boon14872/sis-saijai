import React from 'react';

// Assuming you are using React Native
// import { Image } from 'react-native';

const products = [
  { id: 1, name: 'Bacon Burger', price: 8.63, image: '/burger.png' },
  { id: 2, name: 'Cheese Burger', price: 8.05, image: '/cheese-burger.png' },
  { id: 3, name: 'Chicken Curry Sandwich', price: 3.45, image: '/chicken-sandwich.png' },
  { id: 4, name: 'Margherita Pizza', price: 8.05, image: '/pizza.png' },
  { id: 5, name: 'Ice Tea', price: 2.53, image: '/ice-tea.png' },
];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {
  addToOrder: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ addToOrder }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="border p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
          onClick={() => addToOrder(product)}
        >
          <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-md" />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
