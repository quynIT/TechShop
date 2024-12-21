import React from 'react';
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
import { Col, Popover } from 'antd';
import {WrapperTextHeaderSmall , WrapperHeader, WrapperHeaderAccout, WrapperTextHeader } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
  
const Header = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const handleNavigateLogin = () => {
      navigate('/sign-in')
    }
    console.log('user', user)
    return (
        <div style={{  height: '100%', width: '100%', display: 'flex',background: 'rgb(51 51 51)', justifyContent: 'center' }}>
        <WrapperHeader >
          <Col span={5}>
            <WrapperTextHeader to='/'>FPT SHOP</WrapperTextHeader>
          </Col>
         
            <Col span={13}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="Tìm kiếm sản phẩm..."
              backgroundColorButton="rgb(67 135 219)"
            />
            </Col>
          <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
              <WrapperHeaderAccout>
                  <UserOutlined />
                  <>
                    <Popover >
                      <div style={{ cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} ></div>
                    </Popover>
                  </>

                  {user?.name?(
                    <div style={{ cursor: 'pointer' }}>{user.name}</div>
                  ) : (
                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                      <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                      <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                      </div>
                    </div>
                  )}
              </WrapperHeaderAccout>
           
              <div>
                  <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </div>
            
          </Col>
        </WrapperHeader>
      </div>
    );
};

export default Header;