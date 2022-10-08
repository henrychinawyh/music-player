import request from "../../utils/request";

// 获取歌曲详情
export async function getSongDetail(params: { ids: string }) {
  return request.get("/song/detail", {
    params,
  });
}

// 获取歌曲链接
export async function getSongURL(params: { id: string }) {
  return request.get("/song/url", {
    params,
  });
}
