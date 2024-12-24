import Homepage from "../pages/user/Homepage.jsx";
import Dashboard from "../pages/admin/Dashboard";
import Settings from "../pages/admin/Setting";
import SignIn from "../pages/auth/Sign_in";
import SignUp from "../pages/auth/Sign_up";
import Tables from "../pages/admin/Table";
import ProductDetail from "../pages/user/ProductDetail.jsx";
import ShoppingCart from "../pages/user/ShoppingCart.jsx";
import PurchaseHistory from "../pages/user/purchaseHistory.jsx";
import OrderSuccess from "../pages/user/OrderSuccess.jsx";
import AccountPage from "../pages/user/AccountPage.jsx";
import CancelledProductsPage from "../pages/user/CancelledProductsPage.jsx";
import CancelOrderInterface from "../components/ButtonComponent/CancelOrderInterface.jsx";
import CustomerUpdate from "../pages/admin/Customers/CustomerUpdate.jsx";
import CustomerList from "../pages/admin/Customers/CustomerList.jsx";
import ProductList from "../pages/admin/Products/ProductList.jsx";
import ProductCreate from "../pages/admin/Products/ProductCreate.jsx";
import ProductUpdate from "../pages/admin/Products/ProductUpdate.jsx";
import ProfilePage from "../components/Profile/ProfilePage.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";

export const routes = [
  {
    path: "/",
    page: Homepage,
  },
  {
    path: "/sign-in",
    page: SignIn,
  },
  {
    path: "/sign-up",
    page: SignUp,
  },
  {
    path: "/detail",
    page: ProductDetail,
  },
  {
    path: "/cart",
    page: ShoppingCart,
  },
  {
    path: "/history",
    page: PurchaseHistory,
  },
  {
    path: "/order-success",
    page: OrderSuccess,
  },
  {
    path: "/account-page",
    page: AccountPage,
  },
  {
    path: "/cancel-product",
    page: CancelledProductsPage,
  },
  {
    path: "/cancel-order",
    page: CancelOrderInterface,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isPrivate: true
  },
  {
    path: "/admin/tables",
    page: Tables,
  },
];

export const adminRoutes = [
  // {
  //     path: '',
  //     page: Homepage
  // },
  // {
  //     path: 'sign-in',
  //     page: SignIn
  // },
  // {
  //     path: 'sign-up',
  //     page: SignUp
  // },

  {
    path: "admin",
    page: Dashboard,
  },
  {
    path: "settings",
    page: Settings,
  },
  {
    path: "tables",
    page: Tables,
  },
  {
    path: "CustomerUpdate",
    page: CustomerUpdate,
  },
  {
    path: "CustomerList",
    page: CustomerList,
  },
  {
    path: "ProductList",
    page: ProductList,
  },
  {
    path: "ProductCreate",
    page: ProductCreate,
  },
  {
    path: "ProductUpdate/:id",
    page: ProductUpdate,
  },
];