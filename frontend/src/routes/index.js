
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Homepage from "../components/HomePage/Homepage";
import TrendSlide from "../components/TrendSlide/TrendSlide";
import SignIn from '../pages/auth/Sign_in';
import SignUp from '../pages/auth/Sign_up';
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
    }
]