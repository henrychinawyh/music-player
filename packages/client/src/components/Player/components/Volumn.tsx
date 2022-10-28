/*
 * @Author: wangyuhang
 * @Date: 2022-10-28 15:47:37
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-10-28 16:09:37
 */

import { Button, Popover, Slider } from "antd";
import { useEffect, useState } from "react";

import { SoundOutlined } from "@ant-design/icons";
import styles from "./index.less";

interface IProps {
  audioRef: any;
}
const Volumns: React.FC<IProps> = (props) => {
  const { audioRef } = props || {};
  const [value, setValue] = useState(0.5);

  useEffect(() => {}, [value]);

  return (
    <Popover
      trigger="click"
      content={
        <div className={styles.volumns}>
          {Math.floor(value * 10 ** 2)}
          <Slider
            tooltipVisible={false}
            vertical
            step={0.001}
            max={1}
            min={0}
            value={value}
            onChange={(val) => {
              if (audioRef) {
                (audioRef?.current as any).volume = val;
                setValue(val);
              }
            }}
          />
        </div>
      }
    >
      <SoundOutlined
        style={{
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      />
    </Popover>
  );
};

export default Volumns;
