import type { UpdateInfoInterface } from "./interface";
import request from "../../utils/request";

export async function updateInfo(params: UpdateInfoInterface) {
  return request.get("/user/update", {
    params,
  });
}
