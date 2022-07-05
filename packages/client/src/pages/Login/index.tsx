/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:05:21
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-05 17:29:01
 */

import { Button, Col, Row } from "antd";

import CodeScan from "./components/CodeScan";
import PassWord from "./components/PassWord";
import styles from "./index.less";
import { useState } from "react";

const LoginPage = (props: any) => {
  const [loginType, setLoginType] = useState<"password" | "scan">("password"); // 登录方式 密码 | 扫码

  return (
    <div className={styles.login}>
      <Row className={styles.row} align="middle" justify="center">
        <Col span={4}>
          {loginType === "password" ? <PassWord /> : <CodeScan />}

          <Button type="primary" className={styles.loginButton}>登录</Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
