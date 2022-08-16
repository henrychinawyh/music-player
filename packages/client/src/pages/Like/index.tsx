/*
 * @Author: mikey.zhaopeng
 * @Date: 2022-08-15 16:48:57
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 11:04:05
 */

import React, { useEffect, useState } from "react";

import { DetailHeaderProps } from "../../components/DetailPage/interface";
import DetailPage from "../../components/DetailPage";
import { LikeProps } from "./interface";
import { connect } from "react-redux";
import { getCookie } from "../../utils/cookie";
import { getLikeDetail } from "./services";
import { getSongDetail } from "../../services/song";
import { message } from "antd";
import styles from "./index.less";
import to from "await-to-js";

const Like: React.FC<LikeProps> = (props) => {
  const { info } = props;

  const [likeIds, setLikeIds] = useState([]);
  const [songs, setSongs] = useState([]);
  const [headerInfo, setHeaderInfo] = useState<DetailHeaderProps>();

  useEffect(() => {
    getListIds();
  }, []);

  useEffect(() => {
    if (likeIds?.length) {
      getLikeSongsDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likeIds]);

  // 查询喜欢列表内容
  const getListIds = async () => {
    const [err, data] = await to(
      getLikeDetail({ uid: getCookie("id") as string })
    );
    if (err) {
      message.error("查询列表数据id失败");
      throw err;
    }
    const { ids } = data;
    setLikeIds(ids);
  };

  // 获取歌曲列表中歌曲的详细信息
  const getLikeSongsDetail = async () => {
    const [err, data] = await to(getSongDetail({ ids: likeIds.join(",") }));
    if (err) {
      message.error("查询列表歌曲信息失败");
      throw err;
    }
    console.log(data, "+++++");

    const { songs: songsList } = data;

    if (songsList?.length) {
      const header = {
        picUrl: songsList[0]?.al?.picUrl,
        titleTagIcon: false,
        titleTagIconText: false,
        titleName: "我喜欢的音乐",
        creator: info?.nickname,
        creatorAvatar: info?.avatarUrl,
        tags: ["我喜欢的"],
        sMessage: "我喜欢的",
      };

      console.log(props, "_+_+_props");

      setHeaderInfo(header);
      setSongs(songsList);
    }
  };

  console.log(headerInfo);

  return (
    <div className={styles.like}>
      <DetailPage songs={songs} headerInfo={headerInfo} />
    </div>
  );
};

export default connect(({ login }) => ({
  info: login?.info,
}))(Like);
