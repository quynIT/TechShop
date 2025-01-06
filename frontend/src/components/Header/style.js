import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
export const WrapperHeader = styled(Row)`
  background-color: rgb(51 51 51);
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
  width: 1270px;
  padding: 12px;
`;

export const WrapperTextHeader = styled(Link)`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  &:hover {
    font-size: 20px;
    color: #87df2c;
  }
`;

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 20px;
  gap: 10px;
  max-width: 200px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 20px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

// export const WrapperContentPopup1 = styled.p`
//     cursor: pointer;
//     &:hover{
//         background: red;
//         color: #fff;
//     }
// `
