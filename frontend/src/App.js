import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, adminRoutes } from "./routes";
import Admin from "./Layout/Admin.jsx";
import Layout from "./Layout/Layout.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from "./utils.js";
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService.js'
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/slides/userSlide.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
  }, [])

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}

    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    //Kiểm tra thời gian token hết hạn < thời gian của mình
    // /1000 để chuyển thành đơn vị ms
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Route dành cho admin */}
        <Route path="/admin" element={<Admin />}>
          {adminRoutes.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
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
  );
}

export default App;
