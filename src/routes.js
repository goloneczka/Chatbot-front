import AdminLogin from './components/admin/Login';
import Home from './components/Home'
import AdminHome from './components/admin/AdminHome';
import AdminJokesList from './components/admin/jokes/AdminJokesList.vue'
import AdminForecasts from './components/admin/forecasts/AdminForecasts.vue'
import AdminForecastsCityList from './components/admin/forecasts/AdminForecastsCityList.vue'

export const routesNames = {
    home: '/home',
    adminLogin: '/login-admin',
    adminHome: '/admin/home',
    adminJokesList: '/admin/jokes',
    AdminForecasts: '/admin/forecasts',
    AdminForecastsCityList: '/admin/forecasts/country/:countryId'
};

export const routes = [
    {path: '/', component: Home},
    {path: routesNames.adminLogin, component: AdminLogin},
    {path: routesNames.adminHome, component: AdminHome},
    { name:'admin-jokes', path: routesNames.adminJokesList, component: AdminJokesList},
    {name:'admin-forecasts', path: routesNames.AdminForecasts, component: AdminForecasts},
    {name:'admin-forecasts-city-list', path: routesNames.AdminForecastsCityList, component: AdminForecastsCityList}
];



