import AdminLogin from './components/admin/Login';
import Home from './components/home/Home'
import AdminHome from './components/admin/AdminHome';


const routes = [
    { path: '/', component: Home },
    { path: '/Admin', component: AdminLogin },
    { path: '/Admin/home', component: AdminHome }
];
export default routes;
