import './App.css';
import {BrowserRouter,Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Admin from './Layout/Admin.jsx';
import "./assets/style/tailwind.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
    <BrowserRouter>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              return (
                // <Route path="/" element={<Layout/>}>
                //     <Route  path={route.path} element={<Page/>} />
                // </Route>
                <Route path="/" element={<Admin/>}>
                   <Route  path={route.path} element={<Page/>} />
                </Route>
              )
            })}
          </Routes>
        </BrowserRouter>
  );
}

export default App;
