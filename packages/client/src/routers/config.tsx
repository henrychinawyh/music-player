// import { lazy } from "react";

import Login from "../pages/Login";
import Main from "../pages/Main";
import MainPage from "../pages/MainPage";
import MusicMainPage from '../pages/MusicMainPage'
import Like from '../pages/Like'

// const routes = [
//   {
//     path: "/",
//     // redirect:'/login'
//     element: lazy(() => import("../pages/Main")),
//     children: [
//       {
//         path: "main", // 我的音乐主页
//         element: lazy(() => import("../pages/MusicMainPage")),
//       },
//       {
//         path: "mainPage",
//         element: lazy(() => import("../pages/MainPage")),
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: lazy(() => import("../pages/Login")),
//   },
// ];

const routes = [
  {
    path: "/",
    // redirect:'/login'
    element: <Main />,
    children: [
      {
        path: "main", // 我的音乐主页
        element: <MusicMainPage />,
      },
      {
        path: "mainPage",
        element: <MainPage />,
      },
      {
        path: "like",
        element: <Like />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
