/* eslint-disable prefer-rest-params */
const dc = document

const cookie = {
  /*
  Cookie
*/
  setCookie(
    sName: any,
    sValue: any,
    oExpires?: number,
    sPath?: any,
    sDomain?: any,
    bSecure?: any,
  ) {
    // 璁剧疆Cookie
    let cookies: string
    let name: string
    let value: string | number | boolean
    let expires: any
    let path: string
    let domain: string
    let secure: string
    if (typeof arguments[0] === "object") {
      name = arguments[0].name
      value = arguments[0].value
      expires = arguments[0].expires
      path = arguments[0].path
      domain = arguments[0].domain
      secure = arguments[0].secure
    } else {
      name = sName
      value = sValue
      expires = oExpires
      path = sPath
      domain = sDomain
      secure = bSecure
    }
    cookies = `${name}=${encodeURIComponent(value)}`
    if (expires) {
      const date = new Date()
      date.setTime(date.getTime() + (oExpires || 0) * 60 * 60 * 1000)
      cookies += `; expires=${date.toUTCString()}`
    }
    if (path) {
      cookies += `; path=${path}`
    }
    if (domain) {
      cookies += `; domain=${domain}`
    }
    if (secure) {
      cookies += `; secure${secure}`
    }
    dc.cookie = cookies
    return value
  },
  getCookie(sName: string) {
    // 鑾峰彇Cookie
    const sRE = `(?:; )?${sName}=([^;]*)`
    const oRE = new RegExp(sRE)
    let result = null
    if (oRE.test(dc.cookie)) {
      result = decodeURIComponent(RegExp.$1)
    }
    return result
  },
}
const { getCookie, setCookie } = cookie
export default cookie
export { getCookie, setCookie }
