/*
 * @name: 侧边菜单栏
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 18:00:16
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-11 18:26:10
 */

import {
  CustomerServiceOutlined,
  HeartOutlined,
  HistoryOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import styles from './index.less'
import { useMemo } from "react";

const SideMenu = () => {
  const items = useMemo(
    () => [
      {
        label: "我喜欢",
        key: "like",
        icon: <HeartOutlined />,
      },
      {
        label: "历史播放",
        key: "history",
        icon: <HistoryOutlined />,
      },
      {
        label: "电台",
        key: "radioStation",
        icon: <CustomerServiceOutlined />,
      },
      {
        label: "音乐馆",
        key: "musicClub",
        icon: <HomeOutlined />,
      },
    ],
    []
  );

  return <Menu className={styles.sideMenu} items={items} mode="vertical" />;
};

export default SideMenu;
