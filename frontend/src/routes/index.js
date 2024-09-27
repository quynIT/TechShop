
import { Table } from "antd";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Homepage from "../components/HomePage/Homepage";
import TrendSlide from "../components/TrendSlide/TrendSlide";
import Admin from "../Layout/Admin";
import Dashboard from "../pages/admin/Dashboard";
import Settings from "../pages/admin/Setting";
import SignIn from '../pages/auth/Sign_in';
import SignUp from '../pages/auth/Sign_up';
import Tables from "../pages/admin/Table";
import ProductDetail from "../pages/user/ProductDetail.jsx";
import ShoppingCart from "../pages/user/ShoppingCart.jsx";
import PurchaseHistory from "../pages/user/purchaseHistory.jsx";
export const routes = [
    {
        path: '/',
        page: Homepage
    },
    {
        path: '/sign-in',
        page: SignIn
    },
    {
        path: '/sign-up',
        page: SignUp
    },
]

export const adminRoutes = [
    // {
    //     path: '/',
    //     page: Homepage
    // },
    // {
    //     path: '/sign-in',
    //     page: SignIn
    // },
    // {
    //     path: '/sign-up',
    //     page: SignUp
    // },
    {
        path: '/admin',
        page: Admin
    },
    {
        path: "/admin/dashboard",
        page: Dashboard
    },
    {
        path: "/admin/settings",
        page: Settings
    },
    {
        path:"/admin/tables",
        page: Tables
    },
    {
        path:"/detail",
        page: ProductDetail
    },
    {
        path:"/cart",
        page: ShoppingCart
    },
    {
        path:"/history",
        page: PurchaseHistory
    }
]