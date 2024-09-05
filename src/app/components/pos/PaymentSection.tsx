import React from 'react';

interface PaymentSectionProps {
  // Specify a more specific type for the 'order' prop
  order: OrderItem[];
}

interface OrderItem {
  // Define the properties of an order item
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const PaymentSection: React.FC<PaymentSectionProps> = () => {
  const handlePayment = () => {
    alert('Payment processed');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="grid grid-cols-3 gap-2">
        {/* Example numeric keypad */}
        <button className="bg-blue-500 text-white py-2 rounded">1</button>
        <button className="bg-blue-500 text-white py-2 rounded">2</button>
        <button className="bg-blue-500 text-white py-2 rounded">3</button>
        {/* Add more buttons */}
      </div>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white py-2 w-full mt-4 rounded"
      >
        Process Payment
      </button>
    </div>
  );
};

export default PaymentSection;
