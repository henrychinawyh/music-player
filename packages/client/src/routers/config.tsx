import LoginPage from '../pages/Login'

const routes = [
  {
    path: "/",
    // redirect:'/login'
    element: <LoginPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
];

export default routes;
