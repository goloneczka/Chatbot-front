import AdminLogin from './components/admin/Login';
import Home from './components/home/Home'
import AdminHome from './components/admin/AdminHome';


export const routes = [
    { path: '/', component: Home },
    { path: '/admin', component: AdminLogin },
    { path: '/admin/home', component: AdminHome }
];

export const routesNames = {
    home: '/home',
    adminLogin: '/admin',
    adminHome: '/admin/home'
};

