/*
 * @Author: 王宇航
 * @Date: 2022-08-15 16:58:52
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-15 17:00:54
 */

import { Button, Drawer, Form, Space } from "antd";

import type { DetailCommentProps } from "../interface";
import TextArea from "antd/lib/input/TextArea";
import styles from "../index.less";
import { useForm } from "antd/lib/form/Form";

// 单个评论
const CommentItem = () => {
  return <div className={styles.commentItem}></div>;
};

const DetailComment: React.FC<DetailCommentProps> = (props) => {
  const { destroyOnClose, visible, placement, title, customNode, ...rest } =
    props;

  const [form] = useForm();

  return (
    <div className={styles.detailComment}>
      <Drawer
        {...rest}
        destroyOnClose={destroyOnClose}
        title={title}
        placement={placement}
        visible={visible}
      >
        {customNode || (
          <div className={styles.comment}>
            <Form form={form}>
              <div className={styles.content}></div>
              <div className={styles.footer}>
                <Space>
                  <Form.Item name="comment" label="">
                    <TextArea />
                  </Form.Item>
                  <Button type="primary">发表</Button>
                </Space>
              </div>
            </Form>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DetailComment;
