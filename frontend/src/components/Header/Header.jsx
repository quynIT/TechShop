import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Col, Popover } from "antd";
import {
  WrapperTextHeaderSmall,
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperContentPopup,
} from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../Loading/Loading";
import { searchProduct } from "../../redux/slides/productSlide";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      {user.role === "admin" && (
        <WrapperContentPopup onClick={() => navigate("/admin/dashboard")}>
          System management
        </WrapperContentPopup>
      )}
      {user.role === "staff" && (
        <WrapperContentPopup onClick={() => navigate("/staff/list")}>
          Management Order
        </WrapperContentPopup>
      )}
      {(user.role === "user" ||
        user.role === "admin" ||
        user.role === "staff") && (
        <WrapperContentPopup onClick={() => navigate("/order-history")}>
          Order history
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Profile
      </WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogout}>Log out</WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "rgb(51 51 51)",
        justifyContent: "center",
      }}
    >
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader to="/">TECH SHOP</WrapperTextHeader>
        </Col>

        <Col span={13}>
          <ButtonInputSearch
            size="large"
            bordered={false}
            textbutton="Search"
            placeholder="Search for products..."
            backgroundColorButton="#ff8906"
            onChange={onSearch}
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isPending={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSide: "30px" }} />
              )}

              <>
                <Popover>
                  <div
                    style={{
                      cursor: "pointer",
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  ></div>
                </Popover>
              </>

              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {userName?.length ? userName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Sign in/ Sign out
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          <div
            className="ml-5"
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer" }}
          >
            <Badge
              count={order.orderItems.reduce(
                (total, item) => total + item.amount,
                0
              )}
              size="small"
            >
              <ShoppingCartOutlined
                style={{ fontSize: "40px", color: "#fff" }}
              />
            </Badge>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
