/*
 * @name 我的主页
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 16:02:17
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-11 18:31:41
 */

import { Button, Col, Form, Input, Row, message } from "antd";

import NavHeader from "../../components/NavHeader";
import { SEX } from "../../utils/enum";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { gutter } from "../../utils/const";
import styles from "./index.less";
import { updateInfo } from "./services";
import { useEffect } from "react";

interface MainPageInterface {
  info: any;
}

const MainPage: React.FC<MainPageInterface> = (props) => {
  const { info } = props || {};

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nickname: info?.nickname,
      birthday: dayjs(info?.birthday).format("YYYY-MM-DD"),
      gender: SEX[info?.gender || 0],
      signature: info?.signature,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  // 更改用户信息
  const update = async () => {
    const values = form.getFieldsValue();

    const res = await updateInfo({
      ...values,
      birthday: `${dayjs(values?.birthday).valueOf()}`,
      gender: SEX[values?.gender],
    });

    const { code } = res || {};

    if (code === 200) {
      message.success("修改成功");
    }
  };

  return (
    <div className={styles.mainPage}>
      <NavHeader title="我的主页" />
      <Form form={form}>
        <Row>
          <Col offset={2} span={20}>
            <Row gutter={20} align="middle">
              <Col span={8}>
                <Form.Item label="昵称" name="nickname">
                  <Input placeholder="请输入昵称" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="生日" name="birthday">
                  <Input placeholder="请输入生日" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="性别" name="gender">
                  <Input placeholder="请输入性别" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="用户签名" name="signature">
                  <Input placeholder="请输入用户签名" />
                </Form.Item>
              </Col>

              <Col span={8} offset={8}>
                <Button
                  style={{ display: "block", width: "100%" }}
                  type="primary"
                  onClick={update}
                >
                  保存修改
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect(({ login }) => ({
  info: login?.info,
}))(MainPage);
