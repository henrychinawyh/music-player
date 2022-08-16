/*
 * @Author: 王宇航
 * @Date: 2022-08-15 16:58:52
 * @Last Modified by: 小王同学
 * @Last Modified time: 2022-08-16 17:35:20
 */

import DetailHeader from "./Header";
import type { DetailPageProps } from "./interface";
import Dynamic from "../Dynamic";
import React from "react";
import styles from "./index.less";

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const { headerInfo, songs } = props || {};

  return (
    <div className={styles.detailPage}>
      {headerInfo && <DetailHeader headerInfo={headerInfo} />}

      <div className={styles.songs}>
        <Dynamic loader={() => import("./Main")} songs={songs} />
      </div>
      <Dynamic loader={() => import("./Comment")} />
    </div>
  );
};

export default DetailPage;
