import React, { useState } from 'react';
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import iphone1 from '../../assets/image/iphone1.jpg';
import iphone2 from '../../assets/image/iphone2.jpg';
import iphone3 from '../../assets/image/iphone3.jpg';
import iphone15 from '../../assets/image/iphone15.jpg';
const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [selectedStorage, setSelectedStorage] = useState('128GB');

  const product = {
    name: 'iPhone 13 Pro Max',
    price: 28990000,
    oldPrice: 33990000,
    rating: 4.9,
    reviews: 1234,
    colors: ['Đen', 'Trắng', 'Xanh'],
    storage: ['128GB', '256GB', '512GB'],
    images: [iphone2, iphone3, iphone15],
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phần hình ảnh sản phẩm */}
        <div>
          <div className="mb-4">
            <img src={iphone1} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index + 1}`} className="w-20 h-20 rounded-md cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
            <span className="text-sm text-blue-600">{product.reviews} đánh giá</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-red-600">{product.price.toLocaleString()}₫</span>
            <span className="ml-2 text-lg text-gray-500 line-through">{product.oldPrice.toLocaleString()}₫</span>
          </div>

          {/* Chọn màu sắc */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Màu sắc:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded-md ${selectedColor === color ? 'border-blue-500 text-blue-500' : 'border-gray-300'}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn bộ nhớ */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Bộ nhớ:</h3>
            <div className="flex space-x-2">
              {product.storage.map((storage) => (
                <button
                  key={storage}
                  className={`px-4 py-2 border rounded-md ${selectedStorage === storage ? 'border-blue-500 text-blue-500' : 'border-gray-300'}`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Nút mua hàng */}
          <button className="w-full bg-red-600 text-white py-3 rounded-md font-semibold mb-4 hover:bg-red-700 transition duration-300">
            MUA NGAY
          </button>

          {/* Thông tin thêm */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2 text-green-500" />
              <span>Giao hàng miễn phí toàn quốc</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              <span>Bảo hành chính hãng 12 tháng</span>
            </div>
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-orange-500" />
              <span>Trả góp 0% lãi suất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;