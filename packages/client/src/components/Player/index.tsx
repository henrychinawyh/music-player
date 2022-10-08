/*
 * @Author: wangyuhang
 * @Date: 2022-10-08 10:29:12
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-10-08 10:54:57
 */

import {
  BarsOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { Slider, Space } from "antd";

import { connect } from "react-redux";
import moment from "moment";
import styles from "./index.less";

const Player: React.FC<any> = (props) => {
  const { playList } = props || {};
  console.log(playList, "playList");
  const [isPlay, setIsPlay] = useState(false);
  const [url, setURL] = useState("");
  const [value, setValue] = useState(0);
  const [max, setMax] = useState(300);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("05:00");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (playList?.[0]?.url) {
      setURL(playList?.[0]?.url);
      setIsPlay(true);
    } else {
      setURL("");
      setIsPlay(false);
    }
  }, [playList]);

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
        <SoundOutlined
          style={{
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        />
        <BarsOutlined
          style={{
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        />
      </Space>

      <audio
        ref={audioRef}
        // src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`}
        src={url}
        id="audio"
        autoPlay={Boolean(url)}
      ></audio>
    </div>
  );
};

export default connect(({ song }) => ({
  playList: song?.playList,
}))(Player);
