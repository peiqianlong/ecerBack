<template>
  <div class="headertop" :class="itemColorFun">
    <div class="logo" @click="hrefuser" v-if="headerStyle ==='gl'">
      <img class="logoimg" src="../assets/img/logo.png" alt />
    </div>

    <div class="hello">
      <div class="navigation" @click="Fold('foldtype')">
        <span class="tit">{{$t("夏天")}}</span>
      </div>
      <!-- <div class="rightmenu" @click="showmuenu" v-if="headerStyle ==='ml'">
        <i class="iconfont icon-caidan"></i>
      </div>-->
      <transition name="slide-fade">
        <div id="menu" class="signout">
          <!-- 颜色切换 -->
          <div class="btn_select" style="align-item:center;">
            <el-select
              v-model="value"
              :placeholder="value"
              style="margin-right:8px;"
              @change="itemColorSelect"
              v-loading.fullscreen.lock="fullscreenLoading"
              :popper-class="`pop${storeItemList.itemColor.id}`"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 语言切换 -->
            <el-button
              type="primary"
              plain
              @click="tag"
              :style="{'background-color': storeItemList.itemColor.headerbackgroundlingdang}"
            >{{langs}}</el-button>
          </div>

          <!-- 红点提示 -->
          <div class="tips">
            <el-badge class="item">
              <i class="iconfont icon-manage_icon_message4"></i>
              <span></span>
            </el-badge>
          </div>

          <div class="username" @mouseenter="enter" @mouseleave="leave">
            <div class="user">{{userInfo.username}}</div>
            <img src="../assets/img/person_default_big(1).png" alt />
          </div>
          <transition name="fade">
            <div class="rightPro" v-if="rightshow" @mouseenter="enter2" @mouseleave="leave2">
              <div class="info">
                <div class="info_left">
                  <i class="iconfont icon-manage_icon_mail"></i>
                  <!-- <p>邮箱</p> -->
                </div>
                <div class="info_right">{{userInfo.email}}</div>
              </div>
              <div class="info">
                <div class="info_left">
                  <i class="iconfont icon-manage_icon_phone"></i>
                  <!-- <p>联系方式</p> -->
                </div>
                <div class="info_right">15709242457</div>
              </div>
              <div class="info">
                <div class="info_left">
                  <i class="iconfont icon-manage_icon_user"></i>
                  <!-- <p>用户类型</p> -->
                </div>
                <div class="info_right">超级管理员</div>
              </div>
              <div class="btnout">
                <el-button class="btn1" plain>修改</el-button>
                <el-button class="btn2" type="primary" @click="outLogin">退出</el-button>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
import { Logininfo, LoginOut } from "../apis/api";
export default {
  name: "BackHeader",
  props: {
    headerStyle: {
      type: String,
      value: ""
    }
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      fullscreenLoading: false,
      rightshow: false,
      timeOut: false,
      icon: true,
      langs: window.localStorage.language === "en" ? "简体中文" : "English",
      options: [
        {
          value: "0",
          label: "象牙白"
        },
        {
          value: "1",
          label: "炫酷黑"
        }
      ],
      value: this.$store.getters.itemColor.id,
      getresize: "",
      //  屏幕变小的header
      headerResize: false,
      userInfo: "admin"
    };
  },
  created() {
    this.getingo();
  },
  methods: {
    getingo() {
      Logininfo().then(res => {
        if (res.data.status == 0) {
          this.userInfo = res.data.data;
        }
      });
    },
    Fold(val) {
      if (val === "foldtype") {
        this.icon = !this.icon;
      }
      this.$emit("flod", val);
    },
    outLogin() {
      LoginOut().then(res => {
        if (res.data.status == 0) {
          localStorage.clear();
          window.location.reload();
          this.$router.push("/login");
        }
      });
      // localStorage.clear();
      // window.location.reload();
      // this.$router.push("/login");
    },
    // 语言切换
    tag() {
      let storage = window.localStorage;
      if (this.$i18n.locale === "en") {
        this.langs = "English";
        this.$i18n.locale = "cn";
        storage.language = "cn";
      } else {
        this.$i18n.locale = "en";
        this.langs = "简体中文";
        storage.language = "en";
      }
    },
    enter() {
      if (this.$store.getters.width != "gl") return;
      this.rightshow = true;
    },
    enter2() {
      this.rightshow = true;
      this.timeOut = true;
    },
    leave() {
      setTimeout(() => {
        if (!this.timeOut) {
          this.rightshow = false;
        }
      }, 300);
    },
    leave2() {
      setTimeout(() => {
        this.rightshow = false;
        this.timeOut = false;
      }, 300);
    },
    // 菜单切换
    itemColorSelect() {
      this.fullscreenLoading = true;
      this.$store.dispatch("itemColor", this.value);

      // 存储颜色
      let user = JSON.parse(window.localStorage.userinfo);
      user.coloe = this.value;
      // debugger
      window.localStorage.userinfo = JSON.stringify(user);
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1000);
    },
    //ml  菜单显示
    showmuenu() {
      this.headerResize = !this.headerResize;
      // debugger
    },
    //跳转用户引导
    hrefuser() {
      // debugger
      window.location.href = `http://${location.host}/user.html`;
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "header_white";
        case "1":
          return "header_black";
        default:
          return;
      }
    }
  },
  watch: {
    headerStyle(newdata, olddata) {}
  }
};
</script>

<style lang="less" scoped>
.headertop {
  background-color: #ffffff;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  z-index: 100;
}
.hello {
  flex: 1;
  justify-content: space-between;
  display: flex;
  position: relative;
  z-index: 1;
  box-shadow: 0px 1px 0px rgba(60, 168, 96, 1);
  height: 100%;
}
.navigation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  padding: 15px;
  padding-left: 16px;
  white-space: nowrap;
}
i {
  font-size: 28px;
}

span {
  line-height: 20px;
  height: 20px;
}
.username {
  // width: 108px;
  height: 36px;
  margin-right: 16px;
  margin-left: 8px;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  .user {
    margin-right: 10px;
    margin-left: 10px;
    height: 25px;
    font-size: 16px;
    font-weight: 100;
    line-height: 25px;
    color: #222;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: rgba(0, 0, 0, 0);
    border-radius: 50%;
  }
}
.rightPro {
  position: absolute;
  width: 230px;
  background: rgba(255, 255, 255, 1);
  right: 16px;
  border: 1px solid rgba(221, 221, 221, 1);
  top: 62px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 4px;
  z-index: 20;
  padding: 16px;
  box-sizing: border-box;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #fff;
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 16px;
    margin-bottom: 12px;
    height: 18px;
    .info_left {
      display: flex;
      align-items: center;
      align-items: center;
      height: 20px;
      font-size: 14px;
      width: 28px;
      i {
        font-size: 14px;
        margin-right: 14px;
        margin-top: 2px;
        color: rgba(0, 0, 0, 0.65);
      }
      p {
        line-height: 20px;
      }
    }
    .info_right {
      height: 18px;
      font-size: 14px;
      text-align: left;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  /deep/ .btnout {
    margin-top: 16px;
    .el-button {
      background: transparent;
    }
    display: flex;
    .btn1,
    .btn2 {
      border: 1px solid #3ca860;
      box-sizing: border-box;
      flex: 1;
      width: 95px;
      height: 28px;
      align-items: center;
      display: flex;
      padding: 0;
      justify-content: center;
      span {
        font-size: 12px;
      }
    }
    .btn1 {
      color: #3ca860;
    }
    .btn2 {
      flex: 1;
      color: #fff;
      background: #3ca860;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.logo {
  width: 12.5%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  cursor: pointer;
  .logoimg {
    width: 111px;
    height: 33px;
    // background: rgba(255, 255, 255, 1);
    opacity: 1;
    margin-left: 37px;
  }
}
.tit {
  height: 33px;
  line-height: 33px;
  font-size: 24px;
  font-weight: 400;
  line-height: 35px;
  opacity: 1;
  color: rgba(34, 34, 34, 1);
}

.rightmenu {
  line-height: 65px;
  margin-right: 15px;
}

.signout {
  display: flex;
  align-items: center;
  position: relative;

  /deep/.btn_select {
    display: flex;
    align-items: center;
    height: 36px;
    .el-select {
      height: 100%;
      width: 76px;
      .el-input {
        height: 100%;
        .el-input__inner {
          padding-left: 10px;
          padding-right: 25px;
          border: none;
          height: 100%;
          background: rgba(0, 0, 0, 0.04);
          font-size: 14px;
          color: #222;
        }
        .el-input__suffix {
          right: 0;
          height: 100%;
          .el-input__suffix-inner {
            height: 100%;
            .el-input__icon {
              width: 28px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }

    .el-button {
      height: 100%;
      padding: 0;
      margin-right: 8px;
      border: none;
      color: #000;
      span {
        margin: 0 10px;
        font-size: 14px;
        font-weight: 100;
        color: #222;
        font-weight: 400;
      }
    }
  }

  .tips {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    /deep/ .item {
      display: flex;
      height: 100%;
      align-items: center;
      i {
        position: relative;
        font-size: 16px;
        z-index: 5;
        color: #909090;
      }
      span {
        content: "";
        width: 4px;
        height: 4px;
        position: absolute;
        border-radius: 50%;
        background-color: #ff1919;
        right: 1px;
        top: 10px;
        z-index: 2000;
      }
    }
  }
}
//屏幕变小header的样式
// .Mbilesignout {
//   position: absolute;
//   right: 0;
//   top: 68px;
//   background: #3ca860;
//   width: 260px;
//   z-index: 1;
//   display: flex;
//   flex-direction: column;

//   .btn_select {
//     display: flex;
//     padding: 15px 0;
//     justify-content: center;

//     .el-button {
//       margin: 0 !important;
//     }
//   }

//   .tips {
//     .el-badge {
//       width: 48px;
//       height: 44px;
//     }
//   }
// }

//滑动样式
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

//黑色样式
.header_black {
  background-color: #222643;
  border-bottom: none;
  .logo,
  .hello {
    z-index: 999;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2);
  }
  .logo {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
  .hello {
    border-bottom: 0px;
    .tit {
      color: #ffffff;
    }

    .signout /deep/ .btn_select {
      .el-input__inner {
        background: rgba(255, 255, 255, 0.04);
        border: none;
        color: #fff;
      }
      span {
        color: rgba(255, 255, 255, 1);
      }
    }
    .tips {
      background: rgba(255, 255, 255, 0.04);
      i {
        color: #c0c1c9;
      }
    }
    .username {
      background: rgba(255, 255, 255, 0.04);
      .user {
        color: rgba(255, 255, 255, 1);
      }
    }
    .rightPro {
      background: #222643;
      border: none !important;
      i,
      .info_right {
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
}
.signout /deep/ .el-button.is-plain:focus,
.el-button.is-plain:hover {
  background: transparent;
}

@media screen and (max-width: 1440px) {
}
</style>
