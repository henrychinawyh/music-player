import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { MutableRefObject, memo, useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Avatar from "./components/Search/Avatar";
import Search from "./components/Search";
import SideMenu from "./components/SideMenu";
import Sider from "antd/lib/layout/Sider";
import { connect } from "react-redux";
import cookie from "../../utils/cookie";
import { getCustomerDetail } from "../../services/login";
import styles from "./index.less";

/*
 * @name 首页
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 10:10:18
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-15 18:00:38
 */

interface MainInterface {
  [keys: string]: any;
}

const Main: React.FC<MainInterface> = memo((props) => {
  const navigate = useNavigate();
  const { dispatch, info } = props || {};

  const id = cookie.getCookie("id");
  useEffect(() => {
    if (id) {
      if (!info) {
        getDetail(id);
      }
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //   获取用户详情
  const getDetail = async (uid: string) => {
    const res = await getCustomerDetail({ uid });
    const { profile } = res || {};
    if (profile) {
      dispatch({
        type: "saveInfo",
        payload: profile,
      });
    }
  };

  return (
    <div  className={styles.main}>
      <Layout className={styles.basicLayout}>
        <Header className={styles.header}>
          <Row align="middle" >
            <Col span={22}>
              {/* 搜索栏 */}
              <Search />
            </Col>

            <Col span={2}>
              {/* 头像 */}
              <Avatar />
            </Col>
          </Row>
        </Header>

        <Layout className={styles.body}>
          <Sider width={400} className={styles.sider}>
            <SideMenu />
          </Sider>
          <Layout className={styles.content}>
            <Content className={styles.musicContent}><Outlet /></Content>
          </Layout>
        </Layout>

        <Footer>1</Footer>
      </Layout>
    </div>
  );
});

export default connect(({ login }) => ({
  info: login?.info,
}))(Main);
