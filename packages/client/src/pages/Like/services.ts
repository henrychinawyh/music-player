import request from "../../utils/request";

/**
 *
 * @param uid 用户id
 * @returns 喜欢页详情信息
 */
export async function getLikeDetail(params: { uid: string }) {
  return request.get("/likelist", {
    params,
  });
}
