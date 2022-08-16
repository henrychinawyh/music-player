/*
 * @Author: 王宇航
 * @Date: 2022-08-15 16:58:52
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-08-16 11:06:56
 */

import DetailHeader from "./Header";
import type { DetailPageProps } from "./interface";

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const { headerInfo } = props || {};
  return <div>{headerInfo && <DetailHeader headerInfo={headerInfo} />}</div>;
};

export default DetailPage;
