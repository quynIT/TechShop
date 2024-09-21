import React from 'react';
import '../TrendSlide/trend.css'
import slide1 from '../../assets/image/slide1.jpg';
import slide2 from '../../assets/image/slide2.jpg';
import slide3 from '../../assets/image/slide3.jpg';
import slide4 from '../../assets/image/slide4.jpg';
import slide5 from '../../assets/image/slide5.jpg';
const TrendSlide = () => {
    return (<div className="flex w-full h-full items-center justify-center mt-6">
        <div className="flex w-full h-96 rounded-15"> {/* Thay đổi chiều cao nếu cần */}
          <div
            className="slide relative flex-auto bg-cover bg-center transition-all duration-500 ease-in-out flex-grow"
            style={{
              backgroundImage: `url(${slide1})`,borderRadius: '15px 0  0 15px'}}
          />
          <div
            className="slide relative flex-auto bg-cover bg-center transition-all duration-500 ease-in-out flex-grow"
            style={{
              backgroundImage: `url(${slide2})`
            }}
          />
          <div
            className="slide relative flex-auto bg-cover bg-center transition-all duration-500 ease-in-out flex-grow"
            style={{backgroundImage: `url(${slide3})`}}
          />
          <div
            className="slide relative flex-auto bg-cover bg-center transition-all duration-500 ease-in-out flex-grow"
            style={{backgroundImage: `url(${slide4})`}}
          />
          <div
            className="slide relative flex-auto bg-cover bg-center transition-all duration-500 ease-in-out flex-grow"
            style={{
              backgroundImage: `url(${slide5})`,borderRadius: '0 15px 15px 0'
            }}
          />
        </div>
      </div>
      
    );
};

export default TrendSlide;