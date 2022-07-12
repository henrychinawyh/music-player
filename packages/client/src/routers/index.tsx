import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import routes from "./config";

// import { Spin } from "antd";
// import { Suspense } from "react";


// 路由组件
const RouterWrapper = () => {
  // const GetRoutes = () => useRoutes(generateRouter(routes));
  const GetRoutes = () => useRoutes((routes));

  // const generateRouter = (routers: any) => {
  //   return routers.map((item: any) => {
  //     if (item.children) {
  //       item.children = generateRouter(item.children);
  //     }

  //     item.element = (
  //       <Suspense fallback={<Spin />}>
  //         <item.element />
  //       </Suspense>
  //     );

  //     return item;
  //   });
  // };

  return <Router>{GetRoutes && <GetRoutes />}</Router>;
};

export default RouterWrapper;
