<template>
  <div class="fiexedsetting" v-if="dataInfo !== null">
    <header>
      <i @click="$emit('close')" class="el-icon-arrow-left"></i>
      <h2 class="tit">{{dataInfo.name}}</h2>
    </header>
    <section>
      <div v-if="dataInfo.settings">
        <template v-for="(item , index) in dataInfo.settings">
          <range
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'range')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></range>
          <fontpicker
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'font_picker')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></fontpicker>
          <setcolor
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'color')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></setcolor>
          <selectitem
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'select')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></selectitem>
          <selectitem
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'radio')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></selectitem>
          <checkbox
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'checkbox')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></checkbox>
          <textinput
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'text')"
            :data=" dataInfo"
            :dataInfo="item"
            settings="settings"
          ></textinput>
          <mainmenu
            @openajsx="openajsx"
            :key="index"
            v-if="selettemp(item.type , 'link_list')"
            :data="dataInfo"
            settings="settings"
            :dataInfo="item"
          ></mainmenu>
        </template>
      </div>
      <div v-if="dataInfo.blocks">
        <template v-if="dataInfo.max_blocks">
          <div class="globalitem" v-for="(itemindex , index) in dataInfo.blocks" :key="index">
            <div class="name">{{itemindex.name}}</div>
            <template v-for="(item , index) in itemindex.settings">
              <range
                :key="index"
                v-if="selettemp(item.type , 'range')"
                :data="itemindex"
                :dataInfo="item"
                settings="blocks"
                :id="dataInfo"
              ></range>
              <fontpicker
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'font_picker')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></fontpicker>
              <setcolor
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'color')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></setcolor>
              <selectitem
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'select')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></selectitem>
              <selectitem
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'radio')"
                :data="itemindex"
                settings="blocks"
                :id="dataInfo"
                :dataInfo="item"
              ></selectitem>
              <checkbox
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'checkbox')"
                settings="blocks"
                :data="itemindex"
                :dataInfo="item"
                :id="dataInfo"
              ></checkbox>
              <textinput
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'text')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></textinput>
              <imglist
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'image_picker')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></imglist>
              <mainmenu
                @openajsx="openajsx"
                :key="index"
                v-if="selettemp(item.type , 'link_list')"
                :data="itemindex"
                settings="blocks"
                :dataInfo="item"
                :id="dataInfo"
              ></mainmenu>
            </template>
          </div>
        </template>
        <div
          @click="AddBlocks(dataInfo.max_blocks , dataInfo.blocks.length)"
          class="remove"
        >Add blocks</div>
      </div>

      <div @click="removemode" v-if="remove" class="remove">Remove Section</div>
    </section>
  </div>
</template>
<script>
import { SecPreView } from "../../apis/api";
import { setTimeout } from "timers";
import { debug } from "util";
export default {
  name: "settings",
  // props: ["dataInfo", "settings", "addsection"],
  props: {
    dataInfo: {
      type: Object,
      default: null
    },
    settings: {
      type: Object,
      default: {}
    },
    addsection: {
      type: String,
      default: ""
    }
  },
  components: {
    range: resolve => require(["../control/fontsize.vue"], resolve),
    fontpicker: resolve => require(["../control/fontfamily.vue"], resolve),
    setcolor: resolve => require(["../control/setcolor.vue"], resolve),
    selectitem: resolve => require(["../control/select.vue"], resolve),
    checkbox: resolve => require(["../control/checkbox.vue"], resolve),
    textinput: resolve => require(["../control/textinput.vue"], resolve),
    imglist: resolve => require(["../control/imglist.vue"], resolve),
    mainmenu: resolve => require(["../control/mainmenu.vue"], resolve)
  },
  data() {
    return { flag: true };
  },
  methods: {
    selettemp(val, val2) {
      if (val === val2) {
        return true;
      } else {
        return false;
      }
    },
    //添加模块
    AddBlocks(max, length) {
      if (max > length) {
        let prams = this.$store.getters.pagesettings;
        let header = this.dataInfo.id;
        let time = length;
        let ordername = header + "_" + time;
        prams.sections[header].blocks_order.push(ordername);
        let blocksdata = "";
        for (const key in prams.sections[header].blocks) {
          blocksdata = prams.sections[header].blocks[key];
          break;
        }
        prams.sections[header].blocks[ordername] = blocksdata;
        this.$store.dispatch("savepagesettings", prams);
        this.$emit("AddBlock", header);
      } else {
        this.$message({
          type: "info",
          message: "不能在添加了",
          customClass: "msgposition",
            center: true
        });
      }
    },
    //移除模块
    removemode() {
      let prams = this.$store.getters.pagesettings;
      let arr = this.$store.getters.startedit;
      let obj = this.deepClone(prams);
      arr.push({ data: obj, name: this.dataInfo.id });
      this.$store.dispatch("savestartdata", arr);
      let num = this.$store.getters.Num;
      this.$store.dispatch("Num", ++num);
      //记录
      let index = [];
      let sections = {};
      let arr1 = prams.content_for_index;
      let arr2 = prams.sections;
      arr1.forEach(element => {
        if (element != this.dataInfo.id) {
          index.push(element);
        }
      });
      for (const key in arr2) {
        if (key != this.dataInfo.id) {
          sections[key] = arr2[key];
        }
      }
      prams.content_for_index = index;
      prams.sections = sections;
      this.$store.dispatch("savepagesettings", prams);
      //记录移除后
      let pramsend = this.$store.getters.pagesettings;
      let arrend = this.$store.getters.backedit;
      let objend = this.deepClone(pramsend);
      arrend.push({ data: objend, name: this.dataInfo.id });
      this.$store.dispatch("savebackend", arrend);
      this.$emit("ModifyMode", this.dataInfo.id);

      // SecPreView(this.dataInfo.id, prams).then(res => {
      //   debugger;
      //   if (res.data.status == 0) {
      //     this.$message({
      //       type: "success",
      //       message: "移除成功"
      //     });
      //     this.$emit("ModifyPage", res.data);settings
      //   }
      //   // this.$emit("ModifyMode");
      // });
    },
    openajsx(name) {
      let prams = this.$store.getters.pagesettings;
      let arr2 = this.$store.getters.backedit;
      let obj2 = this.deepClone(prams);
      arr2.push({ data: obj2, name: name });
      this.$store.dispatch("savebackend", arr2);
      SecPreView(name, prams).then(res => {
        this.$emit("ModifyPage", res.data);
      });
    },
    //对象深拷贝
    deepClone(data) {
      var type = typeof data;
      var obj;
      if (type === "array") {
        obj = [];
      } else if (type === "object") {
        obj = {};
      } else {
        return data;
      }
      if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
          obj.push(this.deepClone(data[i]));
        }
      } else if (type === "object") {
        for (var key in data) {
          obj[key] = this.deepClone(data[key]);
        }
      }
      return obj;
    }
  },
  computed: {
    remove() {
      if (this.dataInfo.presets == undefined || this.addsection == "hide") {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    // dataInfo: {
    //   handler(val, oldVal) {
    //     if (this.flag === true) {
    //       this.flag = false;
    //       setTimeout(() => {
    //         let prams = this.$store.getters.pagesettings;
    //         SecPreView(val.id, prams).then(res => {
    //           this.$emit("ModifyPage", res.data);
    //         });
    //         this.flag = true;
    //       }, 1000);
    //     }
    //   },
    //   deep: true
    // }
  }
};
</script>
<style lang="less" scoped>
.fiexedsetting {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100%;
  background: #f9f9f9;
  z-index: 20;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  header {
    height: 64px;
    width: 100%;
    box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
      0 1px 3px 0 rgba(63, 63, 68, 0.15);
    display: flex;
    i {
      font-size: 26px;
      font-weight: 900;
      line-height: 64px;
      width: 45px;
      cursor: pointer;
    }
    .tit {
      font-size: 20px;
      flex: 1;
      text-align: center;
      text-indent: -23px;
      height: 64px;
      line-height: 64px;
      margin: 0;
    }
  }
  section {
    overflow-y: auto;
    flex: 1;
    padding: 15px;
    box-sizing: border-box;
    .globalitem {
      width: 100%;
      margin-top: 20px;
      .name {
        text-align: left;
        font-size: 18px;
      }
    }
    .remove {
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: #fff;
      border-radius: 4px;
      margin-top: 15px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>

