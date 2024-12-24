import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

  return (
    <Loading isPending={isPending}>
      <BrowserRouter>
        <Routes>
          {/* Route dành cho admin */}
          <Route path="/admin" element={<Admin />}>
            {adminRoutes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate || user.role === "admin";
              if (!ischeckAuth) return null; // Bỏ qua routes không hợp
              return (
                <Route
                  key={route.path}
                  path={ischeckAuth && route.path} // Loại bỏ tiền tố /admin
                  element={<Page />}
                />
              );
            })}
          </Route>
          {/* Route dành cho staff */}
          <Route path="/staff" element={<Layout />}>
            {staffRoutes.map((route) => {
              const Page = route.page;
              const ischeckAuth = !route.isPrivate || user.role === "staff";
              if (!ischeckAuth) return null; // Bỏ qua routes không hợp
              return (
                <Route
                  key={route.path}
                  path={ischeckAuth && route.path} // Loại bỏ tiền tố /staff
                  element={<Page />}
                />
              );
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
