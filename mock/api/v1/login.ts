import { MockMethod } from "vite-plugin-mock"
export default [
  {
    url: "/api/v1/login/code",
    method: "get",
    response: () => {
      return {
        code: 0,
        message: "验证码成功",
        data: "http://dummyimage.com/100x40/dcdfe6/000000.png&text=V3Admin"
      }
    }
  },
  {
    url: "/api/v1/users/login",
    method: "post",
    timeout: 2000,
    response: {
      code: 0,
      data: {
        token: "admin-token"
      }
    }
  },
  {
    url: "/api/text",
    method: "post",
    rawResponse: async (req, res) => {
      let reqbody = ""
      await new Promise((resolve) => {
        req.on("data", (chunk) => {
          reqbody += chunk
        })
        req.on("end", () => resolve(undefined))
      })
      res.setHeader("Content-Type", "text/plain")
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    }
  }
] as MockMethod[]
