import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, Truck } from 'lucide-react';
import iphone1 from '../../assets/image/iphone1.jpg';
import iphone2 from '../../assets/image/iphone2.jpg';
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'iPhone 13 Pro Max', price: 28990000, quantity: 1, image: iphone1 },
    { id: 2, name: 'AirPods Pro', price: 4990000, quantity: 1, image: iphone2 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Miễn phí vận chuyển
  const total = subtotal + shipping;

  return (
    <div className="max-w-8xl mx-auto p-12 bg-white shadow-xl rounded-2xl">
      <h1 className="text-5xl font-bold mb-12">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b py-8">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-xl mr-8" />
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <p className="text-red-600 font-bold text-3xl mt-3">{item.price.toLocaleString()}₫</p>
                <div className="flex items-center mt-6">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="mx-6 text-2xl">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                <Trash2 size={36} />
              </button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-8">Tổng giỏ hàng</h2>
            <div className="flex justify-between mb-6 text-xl">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-6 text-xl">
              <span>Phí vận chuyển:</span>
              <span className="text-green-600 font-semibold">Miễn phí</span>
            </div>
            <div className="flex justify-between font-semibold text-2xl border-t pt-6 mt-6">
              <span>Tổng cộng:</span>
              <span className="text-red-600">{total.toLocaleString()}₫</span>
            </div>
            <button className="w-full bg-red-600 text-white py-5 rounded-xl font-semibold text-2xl mt-8 hover:bg-red-700 transition duration-300">
              Tiến hành đặt hàng
            </button>
            <div className="mt-8 text-lg text-gray-600">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 mr-4" />
                <span>Giao hàng miễn phí toàn quốc</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 mr-4" />
                <span>Thanh toán an toàn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;