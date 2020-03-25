import AdminLogin from './components/admin/Login';
import Home from './components/home/Home'
import AdminHome from './components/admin/AdminHome';
import AdminJokesList from './components/admin/jokes/AdminJokesList.vue'

export const routesNames = {
    home: '/home',
    adminLogin: '/admin',
    adminHome: '/admin/home',
    adminJokesList: '/admin/jokes'
};

export const routes = [
    { path: '/', component: Home },
    { path: routesNames.adminLogin, component: AdminLogin },
    { path: routesNames.adminHome, component: AdminHome },
    { path: routesNames.adminJokesList, component: AdminJokesList}
];



