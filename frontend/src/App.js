import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes, adminRoutes } from "./routes";
import Admin from "./Layout/Admin.jsx";
import Layout from "./Layout/Layout.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect } from "react";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function App() {
  // useEffect(() => {
  //   fetchApi()
  // }, [])
  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)
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
