import request from "../../utils/request";

// 获取歌曲详情
export async function getSongDetail(params: { ids: string }) {
  return request.get("/song/detail", {
    params,
  });
}
