/*
 * @name 搜索框
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 14:08:28
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-08-04 17:53:40
 */

import { Col, Row } from "antd";

import Search from "antd/lib/input/Search";
import styles from './index.less'

const MySearch = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={12} >
        <div className={styles.search}>
        <Search size="large" enterButton="搜索" placeholder="音乐/视频/电台/用户" />
        </div>
      </Col>
    </Row>
  );
};

export default MySearch;
