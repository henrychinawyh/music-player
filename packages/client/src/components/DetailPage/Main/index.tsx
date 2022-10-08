/*
 * @Author: 王宇航
 * @Date: 2022-08-15 16:58:52
 * @Last Modified by: 小王同学
 * @Last Modified time: 2022-08-16 18:47:44
 */

import { memo, useEffect, useState } from "react";

import type { DetailMainProps } from "../interface";
import { HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { connect } from "react-redux";
import styles from "../index.less";
import { timeFilter } from "../../../utils/utils";

const DetailMain: React.FC<DetailMainProps> = memo((props) => {
  const { songs, dispatch } = props;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(songs);
  }, [songs]);

  const columns = [
    {
      title: "",
      key: "like",
      dataIndex: "like",
      width: 40,
      render: (t: any, r: any, i: number) => (
        <HeartFilled
          style={{ cursor: "pointer", fontSize: 16 }}
          color="#ff0000"
        />
      ),
    },
    {
      title: "歌曲",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "歌手",
      key: "ar",
      dataIndex: "ar",
      render: (t: any[]) => {
        if (t?.length) {
          return t.map((item) => (
            <Link to="" key={item.id}>
              {item.name}
            </Link>
          ));
        }

        return "未知歌手";
      },
    },
    {
      title: "专辑",
      key: "al",
      dataIndex: "al",
      render: (item: any) => {
        if (item) {
          return <Link to="">{item.name}</Link>;
        }

        return "未知专辑";
      },
    },
    {
      title: "歌曲时长",
      key: "dt",
      dataIndex: "dt",
      render: (t: any) => timeFilter(t),
    },
    {
      title: "操作",
      key: "opt",
      dataIndex: "opt",
      render: (t: any, r: any) => (
        <span
          onClick={() => {
            dispatch({
              type: "updatePlayList",
              payload: r.id,
            });
          }}
        >
          播放
        </span>
      ),
    },
  ];

  console.log(dataSource, "++++");
  return (
    <div className={styles.songsList}>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={dataSource}
        onRow={(r) => ({
          onDoubleClick: (e) => {
            e.preventDefault();
            console.log(r);
          },
        })}
      />
    </div>
  );
});

export default connect()(DetailMain);
