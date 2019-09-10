<template>
  <div class="AsideMenu" v-if="ThemeInfo">
    <template v-for="(item , index) in ThemeInfo">
      <div :key="index" class="ecer_header ecer_section ecer_her" v-if="item.name == '页头'">
        <div class="item" @click="opensetting(item)">
          <i class="icon-page_icon_news iconfont"></i>
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-right right"></i>
        </div>
      </div>
    </template>
    <div class="ecer_header ecer_section">
      <draggable
        v-bind="{draggable:'.item'}"
        v-model="ThemeInfo"
        @change="change"
        @start="start"
        @end="end"
        :move="move"
        animation="300"
        sort="true"
        handle=".icon-manage_icon_move1"
        forceFallback="false"
        filter=".node"
      >
        <template v-for="(item , i) in ThemeInfo">
          <div
            class="item hoveritem"
            :key="i"
            v-if="showhederfooter(item)"
            @click="opensetting(item)"
          >
            <i
              class="iconfont two"
              :class="[item.presets?'':'node',item.presets == null ? 'icon-page_icon_news' : 'icon-manage_icon_move1']"
              style="cursor:move;"
            ></i>
            <i class="icon-page_icon_news iconfont one"></i>
            <span>{{item.name}}</span>
            <i class="el-icon-arrow-right right"></i>
          </div>
        </template>
      </draggable>
    </div>
    <template v-for="(item , index) in ThemeInfo">
      <div :key="index" class="ecer_header ecer_section ecer_footer" v-if="item.name == '页脚'">
        <div class="item" @click="opensetting(item)">
          <i class="icon-page_icon_news iconfont"></i>
          <span>{{item.name}}</span>
          <i class="el-icon-arrow-right right"></i>
        </div>
        <div class="addpage" @click="$emit('addpage')">
          <img src="../../assets/img/page_icon_add@2x.png" alt />
          <div class="tit">Add Section</div>
        </div>
      </div>
    </template>
    <transition name="leftin">
      <settings
        @close="closesettingtemplate"
        v-if="ShowSettingData"
        :dataInfo="SettingData"
        :settings="settings"
        @ModifyPage="(pagehtml) => $emit('ModifyPage',pagehtml)"
        @ModifyMode="ModifyMode"
        @AddBlock="fordata"
      ></settings>
    </transition>
  </div>
</template>
<script>
import { PageEdit } from "../../apis/api";
import draggable from "vuedraggable";
import { debug } from "util";
export default {
  name: "editaside",
  components: {
    settings: resolve => require(["./settings.vue"], resolve),
    draggable
  },
  props: ["pageinfo", "settings"],
  data() {
    return {
      ThemeInfo: [],
      SettingData: "",
      ShowSettingData: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //获取基本信息
    getInfo() {
      PageEdit("/" + this.$store.getters.pagehandle).then(res => {
        this.ThemeInfo = res.data.data.section_schema;
        this.fordata();
      });
    },
    fordata() {
      let prams = this.$store.getters.pagesettings.sections;
      let arr = [];
      let add = {};
      for (const key in prams) {
        if (prams[key].blocks) {
          this.ThemeInfo.forEach(item => {
            if (item.id == key) {
              if (
                prams[key].blocks_order != undefined &&
                prams[key].blocks != undefined
              ) {
                prams[key].blocks_order.forEach(order => {
                  let info = {};
                  for (const key in item.blocks[0]) {
                    info[key] = item.blocks[0][key];
                  }
                  info.id = order;
                  arr.push(info);
                });
              }
              item.blocks = arr;
            }
          });
        }
      }
    },
    //添加blocks
    AddBlock(val) {
      let prams = this.$store.getters.pagesettings.sections;
    },
    opensetting(val) {
      this.SettingData = val;

      this.ShowSettingData = true;
    },
    closesettingtemplate() {
      this.ShowSettingData = false;
    },
    //过滤页头和页脚
    showhederfooter(val) {
      if (val.name === "页头" || val.name === "页脚") {
        return false;
      } else {
        return true;
      }
    },
    // 拖拽
    change: function(evt) {},
    //start ,end ,add,update, sort, remove 得到的都差不多
    start: function(evt) {
      this.$emit("start", evt);
    },
    end: function(evt) {
      // console.log("end" + evt);
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
      this.$emit("end", evt, this.ThemeInfo);
    },
    move: function(evt, originalEvent) {
      // console.log("move" + evt);
      // console.log("move" + originalEvent);
      this.$emit("move", evt, originalEvent, this.ThemeInfo);
    },
    //移除模块
    ModifyMode(id) {
      debugger
      this.ShowSettingData = false;
      let arr = [];
      this.ThemeInfo.forEach(ele => {
        if (ele.id !== id) {
          arr.push(ele);
        }
      });
      this.ThemeInfo = arr;
      this.$emit("ModifyMode", id);
    },
    // 添加模块
    pushThemInfo(val) {
      this.ThemeInfo.push(val);
    }
  },
  watch: {
    pageinfo(val, val2) {
      //监听数据变化更新侧边
      this.getInfo();
    }
  }
};
</script>
<style lang="less" scoped>
.AsideMenu {
  height: 100%;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .ecer_her {
    padding-top: 21px !important;
    .item:last-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .ecer_header {
    .item {
      padding-top: 37px;
      padding-bottom: 30px;
      height: 95px;
      margin-left: 36px;
      margin-right: 34px;
      cursor: pointer;
      span {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        margin-left: 16px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        float: left;
      }
      i {
        float: left;
        line-height: 28px;
        height: 100%;
        font-size: 24px;
        color: #3ca860;
      }
      .right {
        float: right;
        font-weight: 900;
        color: rgba(0, 0, 0, 0.25);
      }
    }
  }
  .ecer_section {
    position: relative;
    .item {
      height: 58px;
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 0px solid rgba(0, 0, 0, 0.1);
    }
    .two {
      display: none;
    }
    .hoveritem:hover {
      .two {
        display: block;
      }
      .one {
        display: none;
      }
    }
    .item:last-child {
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
  .ecer_footer {
    .item:first-child {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    .item {
      border-bottom: 0px solid rgba(0, 0, 0, 0.1);
    }
    .item:last-child {
      border: 0;
    }
    .addpage {
      display: flex;
      align-items: center;
      margin: 0 auto;
      justify-content: flex-start;
      margin-bottom: 0px;
      margin-top: 15px;
      margin-left: 33px;
      width: 90%;
      cursor: pointer;
      img {
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }
      .tit {
        font-size: 16px;
        font-weight: 400;
        color: rgba(60, 168, 96, 1);
        opacity: 1;
      }
    }
  }
}
.leftin-enter-active,
.leftin-leave-active {
  transform: translateX(0%);
}
.leftin-enter,
.leftin-leave-to {
  transform: translateX(-100%);
}
</style>

