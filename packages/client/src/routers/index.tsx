import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import routes from "./config";

// 路由组件
const RouterWrapper = () => {
  const GetRoutes = () => useRoutes(routes);
  return (
    <Router>
      <GetRoutes />
    </Router>
  );
};

export default RouterWrapper;
