/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:05:21
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-08-04 17:33:09
 */

import { Button, Col, Form, Row, Space } from "antd";
import {
  checkVerifyCode,
  getScanCodeImage,
  getScanCodeKey,
  loginStatus,
  pollerScanCode,
  verifyCodeLogin,
} from "../../services/login";
import { useEffect, useState } from "react";

import CodeScan from "./components/CodeScan";
import ImageScroll from "../../components/ImageScroll";
import PassWord from "./components/PassWord";
import bg1 from "../../assets/images/bg1.png";
import bg2 from "../../assets/images/bg2.png";
import bg3 from "../../assets/images/bg3.png";
import bg4 from "../../assets/images/bg4.png";
import classnames from "classnames";
import { connect } from "react-redux";
import cookie, { getCookie } from "../../utils/cookie";
import { gutter } from "../../utils/const";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";

const LoginPage = (props: any) => {
  const { dispatch } = props || {};
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState<"password" | "scan">("password"); // 登录方式 密码 | 扫码
  const [scanImg, setScanImg] = useState<string>(); // 二维码图片
  const [scanCode, setScanCode] = useState<number>(); // 二维码状态码值
  const [key, setKey] = useState<string>(); // 获取二维码图片的唯一key
  const [codeMessage, setCodeMessage] = useState<string>(); // code信息

  useEffect(() => {
    // 首次渲染获取code-image
    getCodeImg();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 轮询二维码检测扫码状态接口
    let timer: NodeJS.Timeout | null = null;
    if (scanImg && loginType === "scan") {
      const poller = async () => {
        timer && clearTimeout(timer);
        if (key && getCookie('id')) {
          const res = await pollerScanCode({ key, timeStamp: Date.now() });
          const { code, message } = res || {};
          setScanCode(code);
          setCodeMessage(message);
          switch (code) {
            case 800:
              // 过期：需要重新调用获取scanCode的接口
              timer = setTimeout(getCodeImg, 4000);
              break;
            case 801:
              // 等待扫码
              timer = setTimeout(poller, 4000);
              break;
            case 802:
              // 已扫码，待确认
              timer = setTimeout(poller, 4000);
              break;
            case 803:
              // 扫码成功，返回对应的cookie，此时需要获取登陆状态，存入相关cookie信息
              const loginStatusRes = await loginStatus();
              const { data } = loginStatusRes || {};
              saveInfo(data);
              break;
            default:
              break;
          }
        }
      };

      // 每当scanCode改变并且有值时，首先等待2s执行poller，poller执行后等待两秒在执行自己，直到扫码登录成功或者是扫码登录失败，才销毁定时器
      setTimeout(poller, 4000);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [scanImg, loginType]);

  // 获取二维码的图片
  const getCodeImg = async () => {
    const codeKeyRes = await getScanCodeKey();
    const { data } = codeKeyRes || {};
    if (data?.unikey) {
      setKey(data.unikey);
      // 请求拿到这个唯一Key请求二维码
      const codeImg = await getScanCodeImage({
        key: data?.unikey,
        qrimg: `${Date.now()}`,
      });
      const { data: imgData } = codeImg || {};
      if (imgData?.qrimg) {
        setScanImg(imgData.qrimg);
      }
    }
  };

  // 点击登录
  const loginClick = async () => {
    if (loginType === "password") {
      const data = await form.validateFields();

      const verifyRes = await checkVerifyCode(data); // 验证验证码的正确性
      if (verifyRes?.data) {
        // 验证成功，此时执行登录
        const loginRes = await verifyCodeLogin(data); // 验证码登录
        saveInfo(loginRes);
      } else {
        return false;
      }
    }
  };

  // 存储相关账户和用户信息
  const saveInfo = async (data: any) => {
    const { account, profile, token } = data || {};
    const { id } = account || {}; // 账号信息

    cookie.setCookie("id", id, 2147483647, "/", "wyh.com", true);
    if (token) {
      cookie.setCookie("token", token, 2147483647, "/", "wyh.com", true);
    }

    dispatch({
      type: "saveInfo",
      payload: profile,
    });

    // 存储完数据后跳转到首页去
    navigate("/");
  };

  return (
    <div className={styles.login}>
      <Row className={styles.row} align="middle" justify="center">
        <Col span={10}>
          <ImageScroll direction="vertical" imgSrc={[bg1, bg2, bg3, bg4]} />
        </Col>

        <Col span={5}></Col>
        <Col span={4}>
          {/* 登录相关内容展示 */}
          {loginType === "password" ? (
            <PassWord form={form} />
          ) : (
            <CodeScan scanImg={scanImg} codeMessage={codeMessage} />
          )}

          {/* 登录按钮配置 */}
          <Space className={styles.login} direction="vertical" size={10}>
            <Button
              disabled={loginType === "scan" && scanCode !== 803}
              type="primary"
              className={styles.loginButton}
              onClick={loginClick}
            >
              登录
            </Button>
            <Row align="middle" justify="space-between" gutter={gutter}>
              <Col
                span={12}
                className={classnames(styles.loginType, styles.other)}
                onClick={() => {
                  if (loginType === "password") {
                    setLoginType("scan");
                  } else {
                    setLoginType("password");
                  }
                }}
              >
                {loginType === "password" ? "二维码登录" : "手机号登录"}
              </Col>
              <Col
                span={12}
                className={classnames(styles.otherLoginType, styles.other)}
              >
                其他登陆方式
              </Col>
            </Row>
          </Space>
        </Col>

        <Col span={5}></Col>
      </Row>
    </div>
  );
};

export default connect()(LoginPage);
