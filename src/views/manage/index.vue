<template>
  <div style="margin: 0 auto">
    <h1 style="width: 600px">工程 demo</h1>
    <form>
      <table style="margin-left: 100px;">
        <tr >
          <td style="width:200px">localOrRemote</td>
          <td>
            <input type="radio" id="one" value="local" v-model="islocal">
            <label for="one">远程</label>
            <br>
            <input type="radio" id="two" value="remote" v-model="islocal">
            <label for="two">本地</label>
          </td>
        </tr>
        <tr>
          <td>versionCode</td>
          <td>
            <select v-model="appVersion">
              <option disabled value="">请选择</option>
              <option value="1.7.38">1.7.38</option>
              <option value="1.7.38">1.7.38</option>
              <option value="1.7.38">1.7.38</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>channelCode</td>
          <td>
            <select v-model="channelCode">
              <option disabled value="">请选择</option>
              <option>360</option>
              <option>B</option>
              <option>C</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>appId</td>
          <td>
            <select v-model="appId">
              <option disabled value="">请选择</option>
              <option value="360">360</option>
              <option>B</option>
              <option>C</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>logDir</td>
          <td>
            <input v-model="logDir" placeholder="生成log目录的时间戳">
          </td>
        </tr>
        <tr>
          <td>
            <button v-on:click="runTask">新增</button>
          </td>
          <td></td>
        </tr>
      </table>
    </form>

  </div>
</template>
<style>
  tr{
    line-height: 35px;
  }
  td{
    text-align: left;
  }
  button{
    line-height: 25px;
    padding: 5px 20px;
  }
</style>
<script>
    import createApiInstance from "../../http/http_config";

    export default {
        components: {},
        data() {
            return {
                islocal: "local",
                isWindows:"linux",
                appVersion:"",
                appName:"",
                time:"",
                channelCode:null,
                appId:"",
                logDir:null,
                data:{

                }
            }
        },
        methods: {
            runTask() {
                //TODO validate
                const testUrl = "/runautotest/?islocal=local&isWindows=linux&appId="+this.appId+"&appVersion="+this.appVersion+"&appName=Ghome&time="+this.logDir+""
                createApiInstance(testUrl, "post").then(res => {
                    alert(res)
                    this.data = res;
                });
            }
        }
    }
</script>
