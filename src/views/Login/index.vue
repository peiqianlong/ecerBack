<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <!-- <div class="form-wrap-bg"></div> -->
      <div class="form-content">
        <div class="form-item">
          <p style="font-size:18px">宜选科技后台登录管理</p>
        </div>
        <!-- <div class="form-item"> -->
        <el-input placeholder="请输入账号" prefix-icon="el-icon-search" v-model="admin"></el-input>
        <el-input
          placeholder="请输入密码"
          type="password"
          prefix-icon="el-icon-search"
          v-model="password"
        ></el-input>
        <!-- </div> -->
        <div class="form-item">
          <el-button style="background:#e94719;color:#FFF;height:44px" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "../../apis/api";
export default {
  name: "login",
  data() {
    return {
      admin: "",
      password: ""
    };
  },
  methods: {
    login() {
      // 本地登录
      let timestamp = Date.parse(new Date());
      if (this.admin != "" && this.password != "") {
        let prams = {
          username: this.admin,
          password: this.password
        };
        Login(prams).then(res => {
          console.log(res.data.status);
          if (res.data.status == 0) {
            var storage = window.localStorage;
            storage.token = true;
            storage.time = timestamp;
            //模拟用户登陆角色
            storage.userinfo = JSON.stringify({
              code: 0,
              msg: "登录成功",
              ruls: ["/index", "/home"],
              coloe: "0"
              // type: res.data.data.site_type
            });
            this.$store.dispatch("userinfo", {
              code: 0,
              msg: "登录成功",
              ruls: ["/index", "/home"],
              coloe: "0"
              // type: res.data.data.site_type
            });
            this.$store.dispatch("itemColor", "0");
            window.location.href = "http://www.site.maoyt.com/user.html#/";
            // this.$router.push({
            //   path: "http://www.site.maoyt.com/user.html#/"
            // });
          } else {
            this.$message({
              type: "warning",
              message: "账号或密码不正确！",
              customClass: "msgposition",
              center: true
            });
          }
        });
        // if (this.admin == "ecer" && this.password == "ecer") {
        //   var storage = window.localStorage;
        //   storage.token = true;
        //   storage.time = timestamp;
        //   //模拟用户登陆角色
        //   storage.userinfo = JSON.stringify({
        //     code: 0,
        //     msg: "登录成功",
        //     token: "akdjsfljadojflkdjlk03003r032joejlaseijf9340r9qo3p4jio",
        //     ruls: ["/index", "/home"],
        //     coloe: "0",
        //     type: "ecer"
        //   });
        //   this.$store.dispatch("userinfo", {
        //     code: 0,
        //     msg: "登录成功",
        //     token: "akdjsfljadojflkdjlk03003r032joejlaseijf9340r9qo3p4jio",
        //     ruls: ["/index", "/home"],
        //     coloe: "0",
        //     type: "ecer"
        //   });
        //   this.$store.dispatch("itemColor", "0");
        //   this.$router.push({
        //     path: "/"
        //   });
        // } else if (this.admin == "blog" && this.password == "blog") {
        //   var storage = window.localStorage;
        //   storage.token = true;
        //   storage.time = timestamp;
        //   //模拟用户登陆角色
        //   storage.userinfo = JSON.stringify({
        //     code: 0,
        //     msg: "登录成功",
        //     token: "akdjsfljadojflkdjlk03003r032joejlaseijf9340r9qo3p4jio",
        //     ruls: [],
        //     coloe: "0",
        //     type: "blog"
        //   });
        //   this.$store.dispatch("userinfo", {
        //     code: 0,
        //     msg: "登录成功",
        //     token: "akdjsfljadojflkdjlk03003r032joejlaseijf9340r9qo3p4jio",
        //     ruls: [],
        //     coloe: "0",
        //     type: "blog"
        //   });
        //   this.$store.dispatch("itemColor", "0");
        //   this.$router.push({
        //     path: "/"
        //   });
        // } else {
        //   this.$message({
        //     type: "warning",
        //     message: "账号或密码不正确！",
        //     customClass: "msgposition",
        //     center: true
        //   });
        // }
      } else {
        this.$message({
          type: "warning",
          message: "账号或密码未输入！",
          customClass: "msgposition",
          center: true
        });
      }
    }
  }
};
</script>

<style scoped lang='less'>
.login-wrap {
  width: 100%;
  height: 100%;
  min-width: 400px;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://static.punchvip.cn/jiazhi/ed75a61b-f348-49e3-8327-4f047309eefc");
}
.form-wrap {
  width: 500px;
  height: 600px;
  min-width: 400px;
  min-height: 600px;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 12px;
  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 0.01),
    -1px 1px 4px 4px rgba(0, 0, 0, 0.01);
  overflow: hidden;
  position: relative;
}

.form-wrap-bg {
  width: 100%;
  height: 200px;
  background: url("https://static.punchvip.cn/jiazhi/e3c2b72d-d2e8-4628-adf2-6fec793d2c43");
}
.form-content {
  box-sizing: border-box;
  width: 288px;
  height: 376px;
  padding: 20px 0 60px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.form-item {
  width: 288px;
}
.el-input {
  margin: 10px 0;
}
.el-button {
  width: 100%;
}
/deep/.el-input__inner {
  padding-left: 30px;
}
</style>