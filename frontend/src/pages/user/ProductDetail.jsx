import React, { useState } from 'react';
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import iphone1 from '../../assets/image/iphone1.jpg';
import iphone2 from '../../assets/image/iphone2.jpg';
import iphone3 from '../../assets/image/iphone3.jpg';
import iphone15 from '../../assets/image/iphone15.jpg';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('Đen');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [mainImage, setMainImage] = useState(iphone1);

  const product = {
    name: 'iPhone 13 Pro Max',
    price: 28990000,
    oldPrice: 33990000,
    rating: 4.9,
    reviews: 1234,
    colors: ['Đen', 'Trắng', 'Xanh'],
    storage: ['128GB', '256GB', '512GB'],
    images: [iphone1, iphone2, iphone3, iphone15],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 m-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Phần hình ảnh sản phẩm */}
        <div className="space-y-6">
          <div className="aspect-w-4 aspect-h-3 bg-white rounded-xl overflow-hidden shadow-lg">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover object-center" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} ${index + 1}`} 
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-500 transition duration-300"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Phần thông tin sản phẩm */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
              ))}
              <span className="ml-2 text-lg font-medium text-gray-600">{product.rating}</span>
            </div>
            <span className="text-lg text-blue-600 hover:underline cursor-pointer">{product.reviews} đánh giá</span>
          </div>

          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold text-red-600">{product.price.toLocaleString()}₫</span>
            <span className="text-2xl text-gray-500 line-through">{product.oldPrice.toLocaleString()}₫</span>
          </div>

          {/* Chọn màu sắc */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Màu sắc:</h3>
            <div className="flex space-x-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-6 py-3 border-2 rounded-lg text-lg font-medium transition duration-300 
                    ${selectedColor === color 
                      ? 'border-blue-500 text-blue-500 bg-blue-50' 
                      : 'border-gray-300 text-gray-600 hover:border-blue-300'}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn bộ nhớ */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Bộ nhớ:</h3>
            <div className="flex space-x-4">
              {product.storage.map((storage) => (
                <button
                  key={storage}
                  className={`px-6 py-3 border-2 rounded-lg text-lg font-medium transition duration-300 
                    ${selectedStorage === storage 
                      ? 'border-blue-500 text-blue-500 bg-blue-50' 
                      : 'border-gray-300 text-gray-600 hover:border-blue-300'}`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Nút mua hàng */}
          <button className="w-full bg-red-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition duration-300 shadow-md"><Link to="/cart">
             MUA NGAY </Link> </button>

          {/* Thông tin thêm */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="flex items-center">
              <Truck className="w-6 h-6 mr-3 text-green-500" />
              <span className="text-lg">Giao hàng miễn phí toàn quốc</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-500" />
              <span className="text-lg">Bảo hành chính hãng 12 tháng</span>
            </div>
            <div className="flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-orange-500" />
              <span className="text-lg">Trả góp 0% lãi suất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;