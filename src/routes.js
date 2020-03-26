import AdminLogin from './components/admin/Login';
import Home from './components/Home'
import AdminHome from './components/admin/AdminHome';


export const routesNames = {
    home: '/home',
    adminLogin: '/admin',
    adminHome: '/admin/home'
};

export const routes = [
    { path: '/', component: Home },
    { path: routesNames.adminLogin, component: AdminLogin },
    { path: routesNames.adminHome, component: AdminHome }
];



