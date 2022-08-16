/*
 * @Author: 王宇航
 * @Date: 2022-08-15 16:58:52
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 11:06:12
 */

import { Avatar, Button, Tag } from "antd";
import {
  CommentOutlined,
  DownloadOutlined,
  FolderOpenOutlined,
  PlayCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

import type { DetailHeaderProps } from "../interface";
import { TagOutlined } from "@ant-design/icons";
import { dataFormat } from "../../../utils/utils";
import dayjs from "dayjs";
import styles from "../index.less";

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  const { headerInfo } = props;

  const {
    picUrl,
    titleTagIcon = true,
    titleTagIconText = false,
    titleName,
    creator,
    creatorAvatar,
    createTime,
    tags,
    sMessage,
  } = headerInfo;

  return (
    <div className={styles.header}>
      <div className={styles.coverImg}>
        <img src={picUrl} alt={`封面图片`} />
      </div>

      <div className={styles.headerContent}>
        <p className={styles.title}>
          {titleTagIcon && <TagOutlined style={{ fontSize: 20 }} />}
          {titleTagIconText && (
            <span className={styles.titleIcon}>
              {dataFormat(titleTagIconText)}
            </span>
          )}
          <span className={styles.titleName}>{dataFormat(titleName)}</span>
        </p>
        <p className={styles.createInfo}>
          <Avatar src={creatorAvatar} />
          <span className={styles.creator}>创建人：{dataFormat(creator)}</span>
          {createTime && (
            <span className={styles.createTime}>
              创建时间：{dayjs(createTime)?.format("YYYY-MM-DD")}
            </span>
          )}
        </p>
        <p className={styles.btns}>
          <Button type="primary" icon={<PlayCircleOutlined />}>
            播放
          </Button>
          <Button type="primary" icon={<FolderOpenOutlined />}>
            收藏
          </Button>
          <Button type="primary" icon={<SendOutlined />}>
            转发
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>
          <Button type="primary" icon={<CommentOutlined />}>
            评论
          </Button>
        </p>
        <p className={styles.tags}>
          标签：
          <span>
            {tags?.length &&
              tags.map((item: any) => {
                if (typeof item === "string") {
                  return <Tag color="#1890ff">{item}</Tag>;
                }

                return null;
              })}
          </span>
        </p>
        <p className={styles.sMessage}>
          简介：
          <span>{dataFormat(sMessage)}</span>
        </p>
      </div>
    </div>
  );
};

export default DetailHeader;
