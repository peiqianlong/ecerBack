<template>
  <div
    class="hello"
    :class="itemColorFun"
    :style="{'background-color':storeItemList.itemColor.mainAside}"
  >
    <div :style="{'position':'relative','flex':'1','width': '100%'}">
      <transition name="bounce">
        <div v-if="mainmenu" style="height:100%;margin-bottom:60px;">
          <el-menu
            class="el-menu-vertical-demo"
            :default-active="paththls"
            :background-color="storeItemList.itemColor.mainAside"
            :text-color="storeItemList.itemColor.mainSidetit"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router
          >
            <template v-for="(item , index) in list">
              <el-menu-item
                :index="item.path"
                :key="index"
                v-if="!item.children"
                class="sigintit"
                iconNum="index"
              >
                <i :class="`iconfont ${ item.path === $route.path ? item.icon2 : item.icon}`"></i>
                <span slot="title" class="spantit">{{ $t(item.name)}}</span>
              </el-menu-item>
              <template v-else>
                <el-submenu :index="item.path" iconNum="index" :key="index">
                  <template slot="title">
                    <i
                      v-if="itemColorFun === 'aside_white'"
                      :class="` iconfont ${ pathrouter(item.path , $route.path) ? item.icon2 : item.icon}`"
                    ></i>
                    <i
                      v-else
                      :class="` iconfont ${ pathrouter(item.path , $route.path) ? item.icon2 : item.icon}`"
                      :style="{'color' : pathrouter(item.path , $route.path) ? '#42C471' : ''}"
                    ></i>
                    <span class="spantit" v-if="!isasidewidth">{{ $t(item.name)}}</span>
                  </template>
                  <el-menu-item-group
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                    class="childrenTitle"
                  >
                    <el-menu-item :index="`${item.path}/${item2.path}`">{{$t(item2.name)}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </template>
            </template>
          </el-menu>

          <div class="stting" :style="{'background':storeItemList.itemColor.mainsetting}">
            <div>
              <i class="iconfont icon-manage_icon_set" :style="{'margin': 'auto'}"></i>
              <span v-if="!isasidewidth">{{$t('设置')}}</span>
            </div>
          </div>
        </div>
      </transition>

      <!-- 点击之后的菜单 -->
      <transition name="left">
        <div v-if="!mainmenu" style="height:100%;">
          <menuone @closemenu="closemenu"></menuone>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { list, siglist } from "../units/asideLise";
export default {
  name: "BackAside",
  props: {
    isasidewidth: {
      type: Boolean,
      value: false
    },
    typeAslid: {
      type: Number,
      value: 0
    }
  },
  components: {
    menuone: resolve => require(["./menuAside/fontsize"], resolve)
  },
  data() {
    return {
      mainmenu: true,
      width: "200px",
      list: "",
      iconimg: this.$route.path,
      storeItemList: this.$store.getters
    };
  },
  created() {
    this.menulist();
  },
  methods: {
    //ele  点击菜单展示详情
    handleOpen(key, keyPath) {
      this.iconimg = key;
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    flushCom() {
      this.$router.go(0);
    },
    str(val) {
      return val.toString();
    },
    // header菜单展示
    objlist() {
      if (this.typeAslid === 0) {
        return this.menulist;
      }
    },
    closemenu() {
      this.mainmenu = !this.mainmenu;
    },
    menulist() {
      this.list = this.$store.getters.routers;
    },
    pathrouter(val1, val2) {
      return val2.includes(val1);
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "aside_white";
        case "1":
          return "aside_black";
        default:
          return;
      }
    },
    paththls() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  height: 6px;
  color: white;
  line-height: 6px;
  cursor: pointer;
}
.hello {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  padding-top: 20px;
}
/*  */
.bounce-enter-active {
  animation: bounce-in 0.5s linear;
  position: absolute;
}
.bounce-leave-active {
  animation: bounce-in 0.5s linear reverse;
  position: absolute;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.left-enter-active {
  animation: bounce-in 0.5s linear;
  position: absolute;
}
.left-leave-active {
  animation: bounce-in 0.5s linear reverse;
  position: absolute;
}
@keyframes left-in {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

i {
  font-size: 20px;
  color: rgba(255, 255, 255, 1);
}
.el-menu-vertical-demo {
  margin: auto;
  border: none;
  .el-menu-item {
    display: flex !important;
    padding: 0 !important;
    padding-left: 30px !important;
  }
  .is-active {
    color: #3ca860 !important;
  }

  .is-opened,
  .el-submenu {
    .el-menu-item-group {
      .el-menu-item {
        display: flex !important;
        justify-content: start !important;
        min-width: 15px !important;
        // padding-left: 5% !important;
        padding-right: 0;
        text-indent: 30px;
      }
      .is-active {
        background: url(../assets/img/aaa@2x.png) no-repeat center !important;
        background-size: 100% 100% !important;
      }
    }
  }
}

.spantit {
  padding: 0 10px;
  display: inline-block;
  text-align: left;
  font-size: 14px;
}
.stting {
  width: 100%;
  position: absolute;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  bottom: 0;
  div {
    margin: 0 30px;
    display: flex;
    width: 100px;
    height: 100%;
    font-weight: 400;
    span {
      font-size: 14px;
      text-align: left;
      width: 100px;
      line-height: 56px;
      padding-left: 10px;
    }
  }
}
//去掉间距二级
/deep/ .el-menu-item-group__title {
  display: none;
}

//白色主题
.aside_white {
  .iconfont {
    color: #3ca860;
  }

  .spantit {
    color: #222;
  }

  .is-active {
    .spantit {
      color: #3ca860;
    }
  }
  /deep/ .el-submenu__title:focus,
  /deep/ .el-submenu__title:hover,
  /deep/ .el-menu-item:focus,
  /deep/ .el-menu-item:hover {
    background: rgba(0, 0, 0, 0.03) !important;
  }
}
//黑色主题
.aside_black {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  .stting {
    span {
      color: #ffffff;
    }
  }
  /deep/.el-menu-item-group {
    .el-menu-item {
      color: rgba(255, 255, 255, 1);
    }
    .is-active {
      color: rgba(255, 255, 255, 1) !important;
    }
  }
  /deep/ .el-menu-vertical-demo .is-active {
    span {
      color: rgba(255, 255, 255, 0.85) !important;
    }
  }

  .el-menu-vertical-demo .is-opened .el-menu-item-group .is-active,
  .el-menu-vertical-demo .el-submenu .el-menu-item-group .is-active {
    background: url(../assets/img/aaa2@2x.png) no-repeat center !important;
    background-size: 100% 100% !important;
  }
  /deep/ .el-submenu__title:focus,
  /deep/ .el-submenu__title:hover,
  /deep/ .el-menu-item:focus,
  /deep/ .el-menu-item:hover {
    background: rgba(255, 255, 255, 0.03) !important;
  }
}
</style>
