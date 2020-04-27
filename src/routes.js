import AdminLogin from './components/admin/Login';
import Home from './components/Home'
import AdminHome from './components/admin/AdminHome';
import AdminJokesList from './components/admin/jokes/AdminJokesList.vue'

export const routesNames = {
    home: '/home',
    adminLogin: '/login-admin',
    adminHome: '/admin/home',
    adminJokesList: '/admin/jokes'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.adminLogin, component: AdminLogin},
    {path: routesNames.adminHome, component: AdminHome},
    { name:'admin-jokes', path: routesNames.adminJokesList, component: AdminJokesList}
];



