import { request } from "./request";

export function getHomeMultidata(){
  return request({
    url: "/home/multidata"
  })
}
export function getHomeGoods(type, page){
  return request({
    // http://152.136.185.210:7878/api/hy66/home/data?type=pop&page=2
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}