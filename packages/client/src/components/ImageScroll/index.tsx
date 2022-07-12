/*
 * @name 图片滚动器
 * @Author: 留白-王宇航
 * @Date: 2022-07-11 12:36:24
 * @Last Modified by: 留白-王宇航
 * @Last Modified time: 2022-07-11 13:14:07
 */

import classNames from "classnames";
import styles from "./index.less";
import { useEffect } from "react";

interface ImageScrollInterface {
  className?: string;
  imgClassName?: string;
  direction?: "horizontal" | "vertical";
  imgSrc?: string[];
  id?: string;
}

const ImageScroll: React.FC<ImageScrollInterface> = (props) => {
  const {
    className,
    imgSrc,
    direction = "horizontal",
    id = `imageScroll_init_id`,
    imgClassName,
  } = props || {};

  useEffect(()=>{
    let scrollWrapper = document.querySelector(`#${id}`)
    let timer = null;

    


  },[id])

  return (
    <div className={className}>
      <div
        className={classNames(
          styles.imageScroll,
          direction === "vertical" ? styles.vertical : {}
        )}
        id={id}
      >
        {imgSrc?.length &&
          imgSrc?.map((src, index) => {
            return (
              <img
                className={classNames(styles.imgInitClassName, imgClassName)}
                key={index}
                src={src}
                alt=""
              />
            );
          })}
      </div>
    </div>
  );
};

export default ImageScroll;
