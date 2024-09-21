import './App.css';
import {BrowserRouter,Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Layout from '../src/components/Layout/Layout.jsx';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              return (
                <Route path="/" element={<Layout/>}>
                    <Route  path={route.path} element={<Page/>} />
                </Route>
              )
            })}
          </Routes>
        </BrowserRouter>
  );
}

export default App;
