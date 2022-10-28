/*
 * @Author: wangyuhang
 * @Date: 2022-10-28 15:41:45
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-10-28 17:31:33
 */
import { Avatar, Button, Popover, Space } from "antd";
import {
  BarsOutlined,
  DownloadOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

import { List } from "antd";
import VirtualList from "rc-virtual-list";
import classNames from "classnames";
import { connect } from "react-redux";
import styles from "./index.less";
import { timeFilter } from "../../../utils/utils";

interface IProps {
  [keys: string]: any;
}
const ContainerHeight = 300;
const PlayList: React.FC<IProps> = (props) => {
  const { playList, dispatch } = props || {};
  const page = useRef(1);
  const pageSize = 10;
  const [data, setData] = useState<any[]>([]);
  const [enterId, setEnterId] = useState<number | null>(null);

  useEffect(() => {
    if (!data?.length) {
      setData((playList as any[])?.slice(0, page.current * pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playList]);

  const onScroll = () => {};

  // 鼠标滑进列表项
  const mouseEnterList = (id: number) => {
    setEnterId(id);
  };

  // 鼠标离开列表项
  const mouseLeaveList = () => {
    setEnterId(null);
  };

  return (
    <Popover
      trigger="click"
      content={
        <div className={styles.playlist}>
          <List>
            <VirtualList
              data={data}
              height={ContainerHeight}
              itemKey="email"
              onScroll={onScroll}
            >
              {(item: any) => (
                <List.Item
                  className={classNames([
                    styles.list,
                    enterId === item?.id ? styles.alignCenter : {},
                  ])}
                  onMouseEnter={() => mouseEnterList(item?.id)}
                  onMouseLeave={mouseLeaveList}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" src={item?.al?.picUrl} />}
                    title={item?.name}
                    description={item?.ar
                      ?.map((item: any) => item?.name)
                      ?.join(",")}
                  />

                  {enterId === item?.id ? (
                    <Space>
                      <PlayCircleOutlined
                        style={{
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          dispatch({
                            type: "updatePlayList",
                            payload: [item],
                          });
                        }}
                      />
                      {/* <HeartFilled /> */}
                      <HeartOutlined
                        style={{
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                      <DownloadOutlined
                        style={{
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    </Space>
                  ) : (
                    <span className={styles.timeSize}>
                      {timeFilter(item?.dt)}
                    </span>
                  )}
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>
      }
    >
      <BarsOutlined
        style={{
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      />
    </Popover>
  );
};

export default connect(({ song }) => ({
  playList: song?.playList,
}))(PlayList);
