<template>
  <el-container style="height:100%;" :class="itemColorFun">
    <el-header v-if="hideslid" style="margin:0;padding:0;height:64px">
      <BackHeader @flod="flod" :headerStyle="Mobile"></BackHeader>
    </el-header>
    <el-container
      style="position:relative"
      :style="{'background-color':$store.getters.itemColor.mainBg , 'overflow':$store.getters.width === 'gl' ? 'hidden' :'scroll'}"
    >
      <transition name="fade">
        <el-aside
          :class="['styleone' , $store.getters.width === 'gl' ? '' : 'menufloat' ]"
          :style="{width : asidewidth,'min-width':asidewidth === '12.5%' ? '200px' :'120px'}"
          v-if="hideslid && show"
        >
          <BackAside
            @flod="flod"
            @edit="$emit('edit')"
            ref="sild"
            :isasidewidth="isasidewidth"
            :typeAslid="typeAslid"
          ></BackAside>
        </el-aside>
      </transition>
      <el-main style="display: flex;flex-direction: column;">
        <div
          class="breadcrumb"
          v-if="hideslid"
          :style="{'background-color':$store.getters.itemColor.mainconten}"
        >
          <div v-for="(item , index) in meta" :key="index">{{$t(item.name)}}</div>
        </div>
        <div class="maincontent" :style="{'background-color':$store.getters.itemColor.mainconten}">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import { debug } from "util";
export default {
  name: "app",
  components: {
    BackAside: resolve => require(["./BackAside"], resolve),
    BackHeader: resolve => require(["./BackHeader"], resolve)
  },
  data() {
    return {
      asidewidth: "12.5%",
      isasidewidth: false,
      typeAslid: 0,
      hideslid: true,
      meta: "",
      show: true,
      Mobile: ""
    };
  },
  updated() {
    this.urlpath();
  },
  mounted() {
    this.getBreadcrumb();
  },
  methods: {
    //改变左侧导航栏
    flod(val) {
      if (val === "foldtype") {
        //小于1000的分辨率  左侧栏
        if (this.$store.getters.width === "ml") {
          this.show = !this.show;
        }
        //大于1000的分辨率  左侧栏
        else if (this.$store.getters.width === "gl") {
          // if (this.asidewidth === "12.5%") {
          //   this.asidewidth = "6.3%";
          //   this.isasidewidth = true;
          //   this.show = true;
          // } else {
          //   this.asidewidth = "12.5%";
          //   this.isasidewidth = false;
          //   this.show = true;
          // }
        }
      }
    },
    edit() {},
    // 判断是否登陆隐藏侧边栏
    urlpath() {
      this.meta = this.$router.history.current.matched;
      if (this.$router.currentRoute.name === "login") {
        this.hideslid = false;
      } else {
        this.hideslid = true;
      }
    },
    getBreadcrumb() {
      let pathName = this.$route;
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "app_white";
        case "1":
          return "app_black";
        default:
          return;
      }
    },

    resize() {
      this.Mobile = this.$store.getters.width;
      return this.$store.getters.width;
    }
  },
  watch: {
    resize(newdata, olddata) {
      if (newdata === "gl") {
        this.show = true;

        // 传递参数给其他组件
        this.Mobile = "gl";
      } else if (newdata === "ml") {
        this.asidewidth = "12.5%";
        this.isasidewidth = false;
        this.show = true;
        // 传递参数给其他组件
        this.Mobile = "ml";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  z-index: 10;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  transition: all 0.5s linear 0s;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;
}

// body > .el-container {
//   margin-bottom: 40px;
// }

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 32px;
}
.styleone {
  width: 12.5%;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.32);
  height: 100%;
  z-index: 5;
}
.menufloat {
  position: fixed;
}
.titpath {
  height: 46px;
  background: #fff;
  border-bottom: 1px solid skyblue;
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  font-size: 14px;
  padding-left: 3px;
}
.grid-content {
  // 禁止文字选择
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  span {
    display: inline-block;
    margin: 3px;
    cursor: pointer;
  }
  span:hover {
    color: #2d8cf0;
  }
}
.maincontent {
  flex: 1;
  padding: 0 16px;
  box-sizing: border-box;
}
.breadcrumb {
  width: 100%;
  padding: 8px 3px;
  padding-left: 16px;
  margin: 0;
  border-radius: 0;
  box-sizing: border-box;
  // display: flex;
  // justify-content: start;
  // align-items: center;
  text-align: left;
  background: rgba(0, 0, 0, 0);
  div {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    position: relative;
    margin-left: 11px;
    margin-right: 11px;
    display: inline-block;
  }
  div:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 4px;
    left: -11px;
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: solid;
    border-color: transparent transparent transparent #3ca860;
  }
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

//白色导航
.app_white {
}
// /黑色导航/
.app_black {
  .styleone {
    box-shadow: none;
  }
  .breadcrumb {
    div {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
</style>
