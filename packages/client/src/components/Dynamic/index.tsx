/*
 * @Author: 小王同学
 * @Date: 2022-08-16 16:53:54
 * @Last Modified by: 小王同学
 * @Last Modified time: 2022-08-16 17:02:58
 */

import React, { Suspense } from "react";

import type { DynamicProps } from "./interface";
import { Spin } from "antd";

// 代码分割，动态加载组件
const Dynamic: React.FC<DynamicProps> = (props) => {
  const { loader, ...rest } = props;
  const AsyncComponent = React.lazy(loader);

  return (
    <Suspense fallback={<Spin />}>
      <AsyncComponent {...rest} />
    </Suspense>
  );
};

export default Dynamic;
