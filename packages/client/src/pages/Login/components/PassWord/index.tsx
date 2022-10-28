/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:09:04
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-10-28 15:38:35
 */

import { Button, Form, FormInstance, Input, Space, message } from "antd";
import { useRef, useState, useTransition } from "react";

import defaultAvatar from "../../../../assets/images/default_avatar.png";
import { sendVerifyCode } from "../../../../services/login";
import styles from "./index.less";
import { tel } from "../../../../utils/regexp";

interface PassWordProps {
  form: FormInstance<any>;
}
const PassWord: React.FC<PassWordProps> = ({ form }) => {
  const [second, setSecond] = useState(0);
  const secondRef = useRef(0);
  const [certifyText, setCertifyText] = useState("发送验证码");
  const [isPending, startTransition] = useTransition();
  const timer: any = useRef();

  // 发送验证码
  const sendCode = async () => {
    const values = await form.validateFields(["phone"]);

    if (!values?.phone) {
      return message.error("请填写手机号");
    }

    startTransition(() => {
      secondRef.current = 60;
      setSecond(secondRef.current);
      setCertifyText("重新发送验证码");
    });

    if (timer.current) {
      clearInterval(timer.current);
    } else {
      timer.current = setInterval(() => {
        if (secondRef.current - 1 === 0) {
          clearInterval(timer.current);
          timer.current = null;
        }
        secondRef.current = secondRef.current - 1;
        setSecond(secondRef.current);
      }, 1000);
    }

    const code = await sendVerifyCode(values);

    if (code === 200) {
      return message.success("欢迎回家");
    }
  };

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
            <Button
              type="primary"
              ghost
              onClick={sendCode}
              disabled={secondRef.current > 0}
            >
              {certifyText}
              {second ? `(${second}s)` : null}
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
