import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routes, adminRoutes, staffRoutes } from "./routes";
import Admin from "./Layout/Admin.jsx";
import Layout from "./Layout/Layout.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { isJsonString } from "./utils.js";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./services/UserService.js";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide.js";
import Loading from "./components/Loading/Loading.jsx";
import SignIn from "./pages/auth/Sign_in.jsx";
import SignUp from "./pages/auth/Sign_up.jsx";

function App() {
  const dispatch = useDispatch();
  const [isPending, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};

    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      //Kiểm tra thời gian token hết hạn < thời gian của mình
      // /1000 để chuyển thành đơn vị ms
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };
  const isAuthenticated = localStorage.getItem("access_token");
  return (
    <Loading isPending={isPending}>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {/* Route dành cho admin */}
          <Route
            path="/admin"
            element={
              user.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/unauthorized" />
              )
            } // Chặn user không phải admin
          >
            {adminRoutes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate && user.role === "admin";
              return ischeckAuth ? (
                <Route key={route.path} path={route.path} element={<Page />} />
              ) : null;
            })}
          </Route>
          {/* Route dành cho staff */}
          <Route
            path="/staff"
            element={
              user.role === "staff" ? (
                <Layout />
              ) : (
                <Navigate to="/unauthorized" />
              )
            } // Chặn user không phải staff
          >
            {staffRoutes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate && user.role === "staff"; // Điều kiện chỉ cho phép staff truy cập
              return ischeckAuth ? (
                <Route key={route.path} path={route.path} element={<Page />} />
              ) : null;
            })}
          </Route>
          {/* Route dành cho client */}
          <Route path="/" element={<Layout />}>
            {routes.map((route) => {
              const Page = route.page;
              return (
                <Route key={route.path} path={route.path} element={<Page />} />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </Loading>
  );
}

export default App;
