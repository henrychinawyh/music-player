/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:09:04
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-05 17:47:10
 */

import { Form, Input, Space } from "antd";

import styles from "./index.less";

const PassWord = () => {
  return (
    <div className={styles.password}>
<img
          src=""
          alt=""
          className={styles.avatar}
        />
        <Form.Item label="用户名">
          <Input />
        </Form.Item>
        <Form.Item label="密码">
          <Input />
        </Form.Item>
    </div>
  );
};

export default PassWord;
