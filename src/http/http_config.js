import axios from "axios";
import { Message } from "element-ui";
import { Loading } from "element-ui";

const baseUrl = "http://10.246.106.75:8000"
// 创建axios默认请求
let cacheUser = window.localStorage.getItem("cacheUser");
let cacheToken;
if (cacheUser) {
  let user = JSON.parse(cacheUser);
  cacheToken = user.token;
}
console.log("http config : cacheToken ->" + cacheToken);
const createApiInstance = (url, method, configs) => {
  let default_config = {
    baseURL: baseUrl,
    url: url,
    method: method || "get",
    timeout: 5000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  };

  let _config = Object.assign({}, default_config, configs);
  _config.data ? JSON.stringify(_config.data) : null;
  let loadingInstance = Loading.service({});

  return new Promise((resolve, reject) => {
    axios(_config)
      .then(res => {
        loadingInstance.close();
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.response);
        loadingInstance.close();
        let errorCode = err.response.data.errors[0].code;
        if (errorCode === "console.session_expired") {
          Message.error({
            showClose: true,
            message: "登录过期",
            type: "error"
          });
          this.$router.push({
            name: "login"
          });
        } else if (errorCode === "console.unauthorized") {
          Message.error({
            showClose: true,
            message: "暂无当前操作权限",
            type: "error"
          });
          return;
        }
        reject(err.response.data.errors[0]);
      });
  });
};

export default createApiInstance;
