/*
 * @Author: wangyuhang
 * @Date: 2022-10-08 10:29:12
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-10-28 17:43:16
 */

import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { Slider, Space } from "antd";

import PlayList from "./components/Playlist";
import Volumns from "./components/Volumn";
import { clearInterval } from "timers";
import { connect } from "react-redux";
import { getSongDetail } from "../../services/song";
import moment from "moment";
import styles from "./index.less";
import { timeFilter } from "../../utils/utils";
import to from "await-to-js";

const Player: React.FC<any> = (props) => {
  const { playList, dispatch } = props || {};

  const [isPlay, setIsPlay] = useState(false);
  const [url, setURL] = useState("");
  const [max, setMax] = useState<number>(0);
  const [endTime, setEndTime] = useState("05:00");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPending, startTransition] = useTransition();
  const timer = useRef(null);

  const [value, setValue] = useState(0);
  const [startTime, setStartTime] = useState("00:00");

  // 初始化获取已经缓存的id，并获取对应的缓存歌曲信息
  useEffect(() => {
    catchPlayListByIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取缓存歌曲列表
  const catchPlayListByIds = async () => {
    const catchIds = JSON.parse(localStorage.getItem("cacheIds") || "[]");
    if (catchIds?.length) {
      const [err, data] = await to(getSongDetail({ ids: catchIds.join(",") }));
      const { songs } = data;
      console.log(songs, "songs");
      dispatch({
        type: "updatePlayList",
        payload: songs,
      });
    }
  };

  useEffect(() => {
    console.log(playList, "playList");
    if (playList?.[0]?.url) {
      setURL(playList?.[0]?.url);
      setIsPlay(true);
      setMax(Math.ceil(playList?.[0]?.dt / 1000));
      setEndTime(timeFilter(playList?.[0]?.dt));
      if (timer.current) {
        // clearInterval()
      }
    } else {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      setURL("");
      setIsPlay(false);
    }
  }, [playList]);

  useEffect(() => {
    if (isPlay) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  }, [isPlay]);

  console.log(url, "url");
  return (
    <div className={styles.player}>
      <Space className={styles.playerButtons}>
        <StepBackwardOutlined
          style={{
            fontSize: 28,
            cursor: "pointer",
          }}
        />
        {!isPlay ? (
          <PlayCircleOutlined
            style={{
              fontSize: 36,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsPlay(true);
              audioRef.current?.play();
            }}
          />
        ) : (
          <PauseCircleOutlined
            style={{
              fontSize: 36,
              cursor: "pointer",
            }}
            onClick={() => {
              setIsPlay(false);
              audioRef.current?.pause();
            }}
          />
        )}
        <StepForwardOutlined
          style={{
            fontSize: 28,
            cursor: "pointer",
          }}
        />
      </Space>
      <div className={styles.progress}>
        {startTime}
        <Slider
          min={0}
          max={max}
          onChange={(val) => {
            const time = moment.duration(val, "seconds");
            setStartTime(
              moment({
                h: time.hours(),
                m: time.minutes(),
                s: time.seconds(),
              }).format("mm:ss")
            );
            startTransition(() => {
              setValue(val);
            });
          }}
          value={value}
          className={styles.slider}
        />
        {endTime}
      </div>
      <Space className={styles.otherButtons}>
        <Volumns audioRef={audioRef} />
        <PlayList />
      </Space>

      <audio
        ref={audioRef}
        // src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`}
        src={url}
        id="audio"
        // autoPlay={Boolean(url)}
      ></audio>
    </div>
  );
};

export default connect(({ song }) => ({
  playList: song?.playList,
}))(Player);
