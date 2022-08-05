/*
 * @Author: wangyuhang
 * @Date: 2022-08-05 14:29:50
 * @Last Modified by: wangyuhang
 * @Last Modified time: 2022-08-05 15:27:33
 */

import { message, Upload } from "antd";
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import { memo, useEffect, useState } from "react";
import { UploadAvatarProps } from "../interface";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Limit_Img_Size } from "../../../utils/const";
import { connect } from "react-redux";

const UploadAvatar: React.FC<UploadAvatarProps> = memo((props) => {
  const { info, dispatch } = props;
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (info?.avatarUrl) {
      setImageUrl(info.avatarUrl);
    }
  }, [info]);

  // 上传前检查
  const beforeUpload = (file: RcFile) => {
    const ACCESS_TYPE = ["image/png", "image/jpeg"];
    // 图片格式判断
    if (!ACCESS_TYPE.includes(file.type)) {
      message.error("请上传jpg, jpeg, png格式的图片!");
      return false;
    }

    // 图片大小判断
    if (file.size / 1024 / 1024 > Limit_Img_Size) {
      message.error("请上传不超过5M大小的图片");
      return false;
    }

    message.loading("上传中...", 0);
    return true;
  };

  //   上传按钮
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //   上传时进度的变化
  const handleChange = (uploadInfo: UploadChangeParam<UploadFile>) => {
    console.log(uploadInfo.file)
    const { status, response } = uploadInfo.file || {};
    const { data } = response || {};

    if (status === "done") {
      message.destroy();
      message.success("上传成功");
      const { url, imgId } = data;
      let tempInfo =Object.assign({},info,{avatarImgIdStr: imgId, avatarUrl: url})

      dispatch({
        type: "saveInfo",
        payload: tempInfo,
      });
      setLoading(false);
    } else {
      if (status === "error") {
        message.error("上传失败");
        setLoading(false);
      }
      setLoading(true);
    }
  };

  return (
    <Upload
      accept=".jpg, .jpeg, .png"
      name="imgFile"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/avatar/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
});

export default connect(({ login }) => ({
  info: login?.info,
}))(UploadAvatar);
