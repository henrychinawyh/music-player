/*
 * @name 导航头
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 16:18:28
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-11 17:30:55
 */

import { LeftOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";

interface NavHeaderInterface {
  title: string | ReactNode;
  size?: "small" | "middle" | "large";
}

const NavHeader: React.FC<NavHeaderInterface> = (props) => {
  const { title, size = "middle" } = props || {};

  const navigate = useNavigate()

  return (
    <div className={classNames(styles.navHeader, styles[`${size}`])} onClick={()=>{
      navigate('/')
    }}>
      <LeftOutlined />

      <span> {title}</span>
    </div>
  );
};

export default NavHeader;
