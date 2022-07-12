/*
 * @name 头像
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 14:11:06
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-11 17:19:15
 */

import { Avatar as AntdAvatar, Dropdown, Menu } from "antd";
import {
  ExportOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import cookie from "../../../../utils/cookie";
import { logoutBox } from "../../../../services/login";
import styles from "./index.less";
import { useCallback } from "react";

interface AvatarInterface {
  info: any;
}

const Avatar: React.FC<AvatarInterface> = (props) => {
  const { info } = props || {};

  const navigate = useNavigate();

  // 退出登录
  const logout = async () => {
    const res = await logoutBox();
    if (res?.code === 200) {
      cookie.setCookie("id", null);
      cookie.setCookie("token", null);
      navigate("/login");
    }
  };

  const menu = useCallback(() => (
    <Menu
      items={[
        {
          key: "mainPage",
          label: (
            <span
              onClick={() => {
                navigate("mainPage", { replace: true });
              }}
            >
              我的主页
            </span>
          ),
          icon: <UserOutlined />,
        },
        {
          key: "setting",
          label: (
            <span
              onClick={() => {
                navigate("setting", { replace: true });
              }}
            >
              个人设置
            </span>
          ),
          icon: <SettingOutlined />,
        },
        {
          key: "quit",
          label: <span onClick={logout}>退出</span>,
          icon: <ExportOutlined />,
        },
      ]}
    ></Menu>
  ),[]);

  return (
    <Dropdown overlay={menu()}>
      <div className={styles.avatar}>
        <AntdAvatar
          size={50}
          icon={<img src={`${info?.avatarUrl}`} alt="" /> || <UserOutlined />}
        />
        <span className={styles.nickName}>{info?.nickname}</span>
      </div>
    </Dropdown>
  );
};

export default connect(({ login }) => ({ info: login?.info }))(Avatar);
