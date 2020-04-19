import AdminLogin from './components/admin/Login';
import Home from './components/Home'
import AdminHome from './components/admin/AdminHome';
import { authorizationStorage } from "./App";


export const routesNames = {
    home: '/home',
    adminLogin: '/admin',
    adminHome: '/admin/home'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.adminLogin, component: AdminLogin},
    {
        path: routesNames.adminHome, component: AdminHome,
        beforeEnter: ((to, from, next) => {
            if (to.path === routesNames.adminHome && !authorizationStorage.isEmpty()) {
                next();
            } else {
                next(false);
            }
        })
    }
];



