/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:09:04
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-08 18:11:13
 */

import { Button, Form, FormInstance, Input, Space } from "antd";

import defaultAvatar from "../../../../assets/images/default_avatar.png";
import { sendVerifyCode } from "../../../../services/login";
import styles from "./index.less";
import { tel } from "../../../../utils/regexp";

interface PassWordProps {
  form: FormInstance<any>;
}
const PassWord: React.FC<PassWordProps> = ({ form }) => {

  // 发送验证码
  const sendCode =async ()=>{
    const phone = await form.validateFields(['phone'])
    const code = await sendVerifyCode(phone)

    console.log(code,'_+_+_+_')
  }

  return (
    <div className={styles.password}>
      <img src={defaultAvatar} alt="" className={styles.avatar} />
      <Form form={form}>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              pattern: tel,
              message: "请输入正确的手机号格式",
            },
          ]}
        >
          <Space className={styles.telWrapper}>
            <Input />
            <Button type="primary" ghost onClick={sendCode}>
              发送验证码
            </Button>
          </Space>
        </Form.Item>
        <Form.Item name="captcha" label="验证码">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default PassWord;
