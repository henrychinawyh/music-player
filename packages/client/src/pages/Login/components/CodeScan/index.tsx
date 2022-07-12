/*
 * @Author: 留白-王宇航
 * @Date: 2022-07-05 17:16:11
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-08 17:11:49
 */

import React, { Suspense, useMemo } from "react";

import { Spin } from "antd";
import styles from "./index.less";

interface CodeScanProps {
  scanImg?: string;
  codeMessage?: string;
}
const CodeScan: React.FC<CodeScanProps> = (props) => {
  const { codeMessage = '等待扫码', scanImg } = props || {};


  return (
    <Suspense fallback={<Spin />}>
      <img className={styles.scanCodeImg} src={scanImg} alt="" />
      {codeMessage && (
        <span className={styles.scanCodeMessage}>{codeMessage}</span>
      )}
    </Suspense>
  );
};

export default CodeScan;
