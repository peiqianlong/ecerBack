<template>
  <div id="app" v-cloak :class="itemColorFun">
    <transition name="appAnmation">
      <appview v-if="app.appshow"></appview>
      <editview v-else></editview>
    </transition>
  </div>
</template>
<script>
import { debug } from "util";
import { resolve } from "path";
export default {
  name: "app",
  components: {
    appview: resolve => require(["./components/AppView.vue"], resolve),
    editview: resolve => require(["./componentsEdit/index.vue"], resolve)
  },
  created() {
    this.store();
  },
  mounted() {
    this.onresize();
  },
  data() {
    return {
      screenWidth: "",
      timer: false,
      app: this.$store.getters
    };
  },

  methods: {
    store() {
      this.$store.dispatch(
        "userinfo",
        JSON.parse(window.localStorage.getItem("userinfo"))
      );
    },
    //获取窗口宽度
    onresize() {
      this.$store.dispatch("width", document.body.clientWidth);
      console.log(document.body.clientWidth);
      window.onresize = () => {
        return (() => {
          if (!this.timer) {
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.timer = true;
            setTimeout(() => {
              // 打印screenWidth变化的值
              this.screenWidth = document.body.clientWidth;
              this.timer = false;
              this.$store.dispatch("width", this.screenWidth);
            }, 500);
          }
        })();
      };
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "white";
        case "1":
          return "black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less">
// @import "https://at.alicdn.com/t/font_1207594_dlq3xwvc3k6.css";
@import "https://at.alicdn.com/t/font_1207594_ac82di2f36h.css";
@import "./common/elementUI/element.less";
@import "./common/elementUI/amintion.less";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  height: 100%;
}
</style>
