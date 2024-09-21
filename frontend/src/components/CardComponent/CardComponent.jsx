import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import {StarFilled} from '@ant-design/icons'
import iphone15 from '../../assets/image/iphone15.jpg'
import { StyleNameProduct, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style';

const CardComponent = () => {
return (
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={iphone15} />}>
        <StyleNameProduct>Iphone</StyleNameProduct>
        
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>4.69 </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell> | Da ban 1000</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>10000VND</span>
                <WrapperDiscountText>
                    5 %
                </WrapperDiscountText>
            </WrapperPriceText>
  </Card>
    );
};

export default CardComponent;