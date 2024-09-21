import React from 'react';
import { WrapperProducts, WrapperTypeProduct } from './style';
import TypeProduct from '../TypeProduct/TypeProduct';
import SlideComponent from '../SlideComponent/SlideComponent';
import banner_1 from '../../assets/image/Banner_1.jpg';
import banner2 from '../../assets/image/Banner2.jpg';
import banner3 from '../../assets/image/Banner3.jpg';
import CardComponent from '../CardComponent/CardComponent';
import Header from '../Header/Header';
import TrendSlide from '../TrendSlide/TrendSlide';

const Homepage = () => {
    const arr = ['TV', 'Tu Lanh', 'Lap top','Điện Thoại']
    return (
        <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
        {arr.map((item)=>{
            return(
                <TypeProduct name = {item} key={item}/>
        )
        })}
        <TypeProduct/>
      </WrapperTypeProduct>
      <SlideComponent arrImages= {[banner_1,banner2,banner3]}/>
      <WrapperProducts>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
        </WrapperProducts>
        <TrendSlide/>
      </div>
    );
};

export default Homepage;