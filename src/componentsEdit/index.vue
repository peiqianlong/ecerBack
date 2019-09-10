<template>
  <div class="ecer_home">
    <header>
      <div class="ecer_logo">
        <img class="ecer_logoimg" src="../assets/img/logo.png" alt />
        <img @click="showglobal" class="ecer_meg" src="../assets/img/manage_icon_color@2x.png" alt />
      </div>
      <!-- 全局主题 -->
      <transition name="updown">
        <div v-if="global" class="ecer_globalediting">
          <div
            class="ecer_globalitem"
            v-for="(item , index) in ThemeInfo.global_schema"
            :key="index"
          >
            <div class="ecer_name">{{item.name}}</div>
            <template v-for="(item , index) in item.settings">
              <setcolor
                @watchopenajsx="watchopenajsx"
                data
                settings
                v-if="selettemp(item.type , 'color')"
                :key="index"
                :dataInfo="item"
              ></setcolor>
              <headername
                data
                settings
                v-if="selettemp(item.type , 'header')"
                :key="index"
                :dataInfo="item"
              ></headername>
              <fontfamily
                @watchopenajsx="watchopenajsx"
                data
                settings
                v-if="selettemp(item.type , 'font_picker')"
                :key="index"
                :dataInfo="item"
              ></fontfamily>
              <fontsize
                @watchopenajsx="watchopenajsx"
                data
                settings
                v-if="selettemp(item.type , 'range')"
                :key="index"
                :dataInfo="item"
              ></fontsize>
            </template>
          </div>
        </div>
      </transition>
      <!-- header|部分 -->
      <div class="ecer_main_header">
        <div class="ecer_header_left" @click.stop="OpenList">
          <span>page</span>
          <span>
            {{namepage}}
            <i v-if="!listitemshow" class="el-icon-arrow-down"></i>
            <i v-else class="el-icon-arrow-up" style="color:#3CA860"></i>
          </span>
          <el-collapse-transition>
            <ul v-if="listitemshow" @click.stop class="ecer_listitem">
              <li
                class="ecer_item"
                v-for="(item,index) in pageinfodata "
                :key="index"
                @click="SelPage(item)"
              >
                <img class="ecer_logopro" src="../assets/editimg/page_icon_products@2x.png" alt />
                <!-- <div contenteditable="true" class="ecer_tit">
                  <div :class="'line'+index">
                    <el-input @blur="blurline" @focus="focusline" v-model="item.title"></el-input>
                    <div class="line"></div>
                  </div>
                </div>-->
                <div class="ecer_tit">
                  <div :class="'line'+index">
                    <div>{{item.title}}</div>
                    <div class="line"></div>
                  </div>
                </div>
                <!-- <i @click.stop="openchildrenlist(index)" class="icon el-icon-more"></i> -->
                <!-- <ul class="ecer_children" v-if="children === index">
                  <li @click="openhref('href')">修改链接</li>
                  <li @click="copy(index)">复制</li>
                  <li>隐藏</li>
                  <li @click="remove(index)">删除</li>
                  <li>子页面</li>
                </ul>-->
              </li>
              <!-- <div class="ecer_addpage">
                <img src="../assets/img/page_icon_add@2x.png" alt />
                <div @click="openhref('addpage')" class="tit">Add Page</div>
              </div>-->
            </ul>
          </el-collapse-transition>
        </div>
        <div class="ecer_header_right">
          <div>
            <!-- <i
              :style="{'cursor':'pointer',}"
              @click="back('start')"
              style="cursor:pointer;"
              class="iconfont icon-edit_icon_back1"
            ></i>
            <i
              @click="back('back')"
              :style="{'cursor':'pointer'}"
              class="iconfont icon-edit_icon_forward1"
            ></i> -->
          </div>
          <div>
            <i
              @click="coloriconsel(1)"
              :style="{'color': coloricon ? '#3CA860' : '','cursor':'pointer'}"
              class="iconfont icon-edit_icon_web1"
            ></i>
            <i
              @click="coloriconsel(2)"
              :style="{'color': !coloricon ? '#3CA860' : '','cursor':'pointer'}"
              class="iconfont icon-edit_icon_phone1"
            ></i>
          </div>
          <div>
            <i
              tit="保存"
              @click.stop="save"
              style="cursor:pointer;"
              class="iconfont icon-edit_icon_save1"
            ></i>
            <!-- <i style="cursor:pointer;" class="iconfont icon-edit_icon_publish1"></i> -->
            <i @click.stop="close" style="cursor:pointer;" class="iconfont icon-edit_icon_jump1"></i>
          </div>
        </div>
      </div>
    </header>
    <div class="ecer_main" v-if="ThemeInfo">
      <aside>
        <editasid
          @start="start"
          @end="end"
          @move="move"
          :pageinfo="pageinfo"
          :settings="ThemeInfo.settings"
          @ModifyPage="ModifyPage"
          @addpage="addtemplate = true"
          @ModifyMode="ModifyMode"
          ref="editasid"
        ></editasid>
      </aside>
      <section>
        <!-- <div  v-html="htmlpage"
        
            :src="'/a/tpl-preview/page-preview?t='+pageinfo"
        :src="'http://www.site.maoyt.com/api/tpl-preview/page-preview?t='+pageinfo"
        >-->
        <div :class="[coloricon?'preview--scaled-web':'preview--scaled-phone']">
          <iframe
            id="ecer_page"
            :class="[coloricon?'ecer_web':'ecer_phone']"
            :src="'http://www.site.maoyt.com/api/tpl-preview/page-preview?t='+$store.getters.pagehandle"
            frameborder="0"
            ref="iframe"
            name="iframe"
          ></iframe>
          <div class="preview__outline"></div>
        </div>
      </section>
    </div>
    <transition name="leftin">
      <div v-if="addtemplate" class="addsettingpage">
        <header>
          <i @click="addtemplate=false" class="el-icon-arrow-left"></i>
          <h2 class="tit">添加模块</h2>
        </header>
        <section>
          <!-- <div>{{ThemeInfo.new_section_schema}}</div> -->
          <template v-for="(item , index) in ThemeInfo.new_section_schema">
            <div class="new_section_list" :key="index">
              <!-- <h3>{{item.id}}</h3> -->
              <div class="new_section_list_item">
                {{item.name}}
                <p @click="NewOpenSection(item)">Add</p>
              </div>
            </div>
          </template>
        </section>
      </div>
    </transition>
    <transition name="leftin">
      <settings
        @close="addtemplateshow = false"
        v-if="addtemplateshow"
        :dataInfo="addtemplateInfo"
        :settings="ThemeInfo.settings"
        addsection="hide"
      ></settings>
    </transition>
  </div>
</template>
<script>
import {
  PageEdit,
  PreView,
  SecPreView,
  gloabTep,
  Save,
  editpage
} from "../apis/api";
import { debug } from "util";
// import settingsVue from "";
export default {
  name: "index",
  components: {
    editasid: resolve => require(["./comcomponent/editaside.vue"], resolve),
    settings: resolve => require(["./comcomponent/settings.vue"], resolve),
    setcolor: resolve => require(["./control/setcolor.vue"], resolve),
    headername: resolve => require(["./control/headername.vue"], resolve),
    fontfamily: resolve => require(["./control/fontfamily.vue"], resolve),
    fontsize: resolve => require(["./control/fontsize.vue"], resolve)
  },
  data() {
    return {
      listitemshow: false,
      coloricon: true,
      draw: false,
      children: "",
      global: false,
      ThemeInfo: null,
      SettingData: "",
      ShowSettingData: false,
      pageinfo: "index",
      htmlpage: "",
      addtemplate: false,
      addtemplateshow: false,
      addtemplateInfo: {},
      pageinfodata: [],
      namepage: "",
      stanum: 0,
      endnum: 0
    };
  },
  directives: {
    drag: el => {
      el.onclick = function(e) {
        // el.style.position = "absolute";
        $(el)
          .parent()
          .css({
            top: "0px",
            position: "absolute"
          });
      };
    }
  },
  created() {
    this.getInfo();
    this.pageedit();
  },

  methods: {
    SelPage(val) {
      let arr = this.$store.getters.startedit;
      if (arr.length > 0) {
        this.$message({
          type: "info",
          message: " 请保存",
          customClass: "msgposition",
          center: true
        });
      } else {
        this.pageinfo = val.handle;
        this.$store.dispatch("pagehandle", val.handle);
        this.namepage = val.title;
      }
    },

    //获取基本信息
    pageedit() {
      editpage().then(res => {
        this.pageinfodata = res.data.data.pages;
        this.pageinfo = res.data.data.pages[0].handle;
        this.namepage = res.data.data.pages[0].title;
      });
    },
    getInfo() {
      PageEdit("index").then(res => {
        this.ThemeInfo = res.data.data;
        this.$store.dispatch("ImgServer", res.data.data.img_server);
        this.$store.dispatch("savepagesettings", res.data.data.settings);
      });

      // PreView(page).then(res => {
      //   this.htmlpage = res.data;
      // });
    },
    //修改链接
    openhref(val) {
      if (val == "href") {
        this.$prompt("请输入链接地址", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            this.$message({
              type: "success",
              message: "你的链接地址是: " + value,
              customClass: "msgposition",
              center: true
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
              customClass: "msgposition",
              center: true
            });
          });
      } else if (val == "addpage") {
        this.$prompt("请输入要添加的页面名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            this.$message({
              type: "success",
              message: "你添加的名称是: " + value,
              customClass: "msgposition",
              center: true
            });
            this.pageinfodata.push(value);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入",
              customClass: "msgposition",
              center: true
            });
          });
      }
    },
    //复制页面
    copy() {
      this.$message({
        type: "success",
        message: "复制成功",
        customClass: "msgposition",
        center: true
      });
    },
    //删除
    remove(val) {
      this.pageinfodata.splice(val, 1);
    },
    OpenList() {
      this.listitemshow = !this.listitemshow;
      this.children = "";
    },
    coloriconsel(val) {
      if (val === 1) {
        this.coloricon = true;
      } else {
        this.coloricon = false;
      }
    },
    close() {
      this.$store.dispatch("appshow", true);
    },
    openchildrenlist(el) {
      if (el === this.children) {
        this.children = "";
      } else {
        this.children = el;
      }
    },
    showglobal() {
      this.global = !this.global;
    },
    opensetting(val) {
      this.SettingData = val;
      this.ShowSettingData = true;
    },
    closesettingtemplate() {
      this.ShowSettingData = false;
    },
    selettemp(val, val2) {
      if (val === val2) {
        return true;
      } else {
        return false;
      }
    },
    // 拖动开始
    start() {
      $(".preview--scaled-web").css({
        "max-height": " 200%",
        height: "200%"
      });
      $(".preview__outline").css({
        display: "block"
      });
    },
    move(val, evn, arrinfo) {
      let arr = [];
      arrinfo.forEach(ele => {
        if (ele.id !== "header" && ele.id !== "footer") {
          arr.push(ele.id);
        }
      });
      this.arrdom = arr;
      // let ele = val.draggedContext.element.id;
      // let dom = `#ecsite-section-${ele}`;
    },
    end(val, val2) {
      let arr = [];
      let settings = this.$store.getters.pagesettings;
      //保存原记录
      // let arr3 = this.$store.getters.startedit;
      // let obj = this.deepClone(settings);
      // arr3.push({ data: obj, name: "header"});
      // this.$store.dispatch("savestartdata", arr3);
      // let num = this.$store.getters.Num;
      // this.$store.dispatch("Num", ++num);
      //保存原记录
      val2.forEach(element => {
        if (element.id !== "header" && element.id !== "footer") {
          arr.push(element.id);
        }
      });
      settings.content_for_index = arr;
      this.$store.dispatch("savepagesettings", settings);
      SecPreView("header", this.$store.getters.pagesettings).then(res => {
        this.ModifyPage(res.data);
        // let prams = this.$store.getters.pagesettings;
        // let arr2 = this.$store.getters.backedit;
        // let obj2 = this.deepClone(prams);
        // arr2.push({ data: obj2, name: name });
        // this.$store.dispatch("savebackend", arr2);
      });
      $(".preview--scaled-web").css({
        "max-height": " 100%"
      });
      $(".preview__outline").css({
        display: "none"
      });

      if (val.newIndex == arr.length - 1) {
        let olddom = "#ecsite-section-" + arr[val.newIndex];
        let newdom = "#ecsite-section-" + arr[val.newIndex - 1];

        $("#ecer_page")
          .contents()
          .find(olddom)
          .insertAfter(
            $("#ecer_page")
              .contents()
              .find(newdom)
          );

        // $("#ecer_page")
        //   .contents()
        //   .find(arr[id]);
        // console.log(
        //   $("#ecer_page")
        //     .contents()
        //     .find(`#ecsite-section-${arr[id]}`)
        // );
      } else {
        let olddom = "#ecsite-section-" + arr[val.newIndex];
        let newdom = "#ecsite-section-" + arr[val.newIndex + 1];
        $("#ecer_page")
          .contents()
          .find(olddom)
          .insertBefore(
            $("#ecer_page")
              .contents()
              .find(newdom)
          );
      }
    },
    // 替换页面信息/*  */
    ModifyPage(pagehtml) {
      this.stanum = 0;
      this.endnum = 0;
      if (pagehtml.status == 0) {
        let dom = `#ecsite-section-${pagehtml.data.json.id}`;
        $("#ecer_page")
          .contents()
          .find(dom)
          .html(pagehtml.data.html);
      }
    },
    //替换全局css
    watchopenajsx() {
      let prams = this.$store.getters.pagesettings;
      let arr2 = this.$store.getters.backedit;
      let obj2 = this.deepClone(prams);
      this.stanum = 0;
      this.endnum = 0;
      arr2.push({ data: obj2, name: "" });
      this.$store.dispatch("savebackend", arr2);
      gloabTep("global", prams).then(res => {
        $("#ecer_page")
          .contents()
          .find("style[data-href]")
          .html(res.data.data.style);
      });
    },
    // 添加模块
    NewOpenSection(val) {
      let data = JSON.parse(JSON.stringify(val));
      let settings = this.$store.getters.pagesettings;
      let id = new Date().getTime();
      data.id = id;
      this.addtemplateInfo = data;
      this.addtemplateshow = true;
      settings.sections[id] = {
        type: data.type
      };
      let prams = {};
      data.settings.forEach(ele => {
        prams[ele.id] = ele.default;
      });
      settings.sections[id].settings = prams;
      settings.content_for_index.push(id);
      this.$store.dispatch("savepagesettings", settings);
      this.$refs.editasid.pushThemInfo(data);
      // this.save();
      //直接保存
      let prams2 = this.$store.getters.pagesettings;
      let arr = [];
      this.stanum = 0;
      this.endnum = 0;
      Save(prams2).then(res => {
        if (res.data.status == 0) {
          this.$store.dispatch("savestartdata", arr);
          this.$store.dispatch("savestartdata", arr);
          this.getInfo();
          this.pageedit();
          document.getElementById("ecer_page").contentWindow.location.reload();
        }
      });
    },
    //全局保存数据
    save() {
      let prams = this.$store.getters.pagesettings;
      let arr = [];
      this.stanum = 0;
      this.endnum = 0;
      Save(prams).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "保存成功",
            customClass: "msgposition",
            center: true
          });
          this.$store.dispatch("savestartdata", arr);
          this.$store.dispatch("savestartdata", arr);
          this.getInfo();
          this.pageedit();
          // $("#ecer_page").contentWindow.location.reload(true);
        } else {
          this.$message({
            type: "error",
            message: "保存失败",
            customClass: "msgposition",
            center: true
          });
        }
      });
    },
    //后退前进
    back(val) {
      if (val == "start") {
        ++this.stanum;
        let startdata = this.$store.getters.startedit;
        let num = this.$store.getters.Num;
        debugger;
        if (startdata[num - this.stanum] == "undefined") {
          this.$message({
            type: "info",
            message: "无法在后退了",
            customClass: "msgposition",
            center: true
          });
          return;
        }
        startdata[num - this.stanum].data;
        debugger;
        if (num - this.stanum >= 0) {
          if (startdata[num - this.stanum].name == undefined) {
            gloabTep("global", startdata[num - this.stanum].data).then(res => {
              $("#ecer_page")
                .contents()
                .find("style[data-href]")
                .html(res.data.data.style);
            });
          } else {
            SecPreView(
              startdata[num - this.stanum].name,
              startdata[num - this.stanum].data
            ).then(res => {
              this.ModifyPage(res.data);
            });
          }
        }
      } else if (val == "back") {
        ++this.endnum;
        let enddata = this.$store.getters.backedit;
        let num2 = this.$store.getters.Num;
        enddata[num2 - this.endnum].data;
        debugger;
        if (num2 - this.endnum >= 0) {
          if (
            enddata[num2 - this.endnum].name == undefined ||
            enddata[num2 - this.endnum].name == ""
          ) {
            debugger;
            gloabTep("global", enddata[num2 - this.endnum].data).then(res => {
              $("#ecer_page")
                .contents()
                .find("style[data-href]")
                .html(res.data.data.style);
            });
          } else {
            debugger;
            SecPreView(
              enddata[num2 - this.endnum].name,
              enddata[num2 - this.endnum].data
            ).then(res => {
              this.ModifyPage(res.data);
            });
          }
        } else {
          this.$message({
            type: "info",
            message: "无法在后退了",
            customClass: "msgposition",
            center: true
          });
        }
      }
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
    },
    //聚焦线条
    focusline(val) {
      // $(".line").css("width", "0%");
      $("." + val.currentTarget.offsetParent.offsetParent.firstChild.className)
        .find(".line")
        .css("width", "100%");
    },
    blurline() {
      $(".line").css("width", "0%");
    },
    //移除模块
    ModifyMode(id) {
      let dom = `#ecsite-section-${id}`;
      $("#ecer_page")
        .contents()
        .find(dom)
        .remove();
    }
  }
};
</script>
<style lang="less" scoped>
.ecer_home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header {
    height: 64px;
    width: 100%;
    font-size: 23px;
    display: flex;
    .ecer_logo {
      width: 16.67%;
      min-width: 320px;
      box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      z-index: 10;
      position: relative;
      z-index: 10;
      background: #fff;
      .ecer_logoimg {
        width: 111px;
        height: 33px;
        margin-left: 36px;
        margin-right: 24px;
      }
      .ecer_meg {
        width: 24px;
        height: 24px;
      }
    }
    .ecer_main_header {
      flex: 1;
      box-shadow: 0px 1px 0px rgba(60, 168, 96, 1);
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      .ecer_header_left {
        width: 200px;
        height: 44px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        margin-left: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        position: relative;
        span:nth-child(1) {
          font-size: 16px;
          color: rgba(34, 34, 34, 1);
          opacity: 1;
          display: block;
          width: 40px;
          margin-left: 10px;
        }
        span:nth-child(2) {
          font-size: 16px;
          font-weight: 600;
          color: rgba(34, 34, 34, 1);
          opacity: 1;
          margin-right: 10px;
          i {
            font-weight: 900;
          }
        }
        .ecer_listitem {
          position: absolute;
          left: 0;
          top: 56px;
          width: 200px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          border-radius: 4px;
          list-style: none;
          padding: 0;
          cursor: pointer;
          -moz-user-select: none;
          -khtml-user-select: none;
          user-select: none;
          .ecer_item {
            height: 23px;
            padding: 23px 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;

            .ecer_logopro {
              width: 24px;
              height: 24px;
              margin-left: 24px;
              margin-right: 16px;
            }
            .ecer_tit {
              font-size: 16px;
              font-weight: 400;
              color: rgba(0, 0, 0, 0.65);
              width: 100px;
              height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 30px;
              position: relative;
              /deep/.el-input__inner {
                height: 30px;
                background: transparent;
                border: none;
                border-radius: 0;
              }
            }
            .line {
              position: absolute;
              width: 0%;
              height: 2px;
              border-radius: 2px;
              background: #3ca860;
              bottom: 0;
              left: 0;
              transition: all 300ms linear;
            }
            // .ecer_tit:focus::after {
            //   width: 300px;
            // }
            .icon {
              color: rgba(0, 0, 0, 1);
              font-size: 12px;
              line-height: 23px;
              margin-left: 23px;
              cursor: pointer;
              display: none;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 15px;
            }
            .ecer_children {
              width: 160px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(221, 221, 221, 1);
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
              border-radius: 4px;
              position: absolute;
              right: -161px;
              top: 0;
              margin: 0;
              padding: 0;
              list-style: none;
              transition: all 0.5s linear;
              li {
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                color: rgba(0, 0, 0, 0.65);
                opacity: 1;
                margin: 14px 0;
                text-indent: 23px;
                text-align: left;
              }
            }
          }
          .ecer_item:hover {
            background: rgba(0, 0, 0, 0.05);
            .icon {
              display: block;
            }
          }
          .ecer_addpage {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-top: 15px;
            margin-bottom: 15px;
            img {
              width: 32px;
              height: 32px;
              margin-left: 20px;
              margin-right: 12px;
            }
            .ecer_tit {
              font-size: 16px;
              font-weight: 400;
              color: rgba(60, 168, 96, 1);
              opacity: 1;
            }
          }
        }
      }
      .ecer_header_right {
        display: flex;
        div {
          margin-right: 108px;
          display: flex;
          flex-wrap: nowrap;
          i {
            font-size: 26px;
            margin-right: 24px;
          }
        }
        div:nth-child(1) {
          i {
            color: rgba(51, 51, 51, 0.4);
          }
        }
        div:nth-child(2),
        div:nth-child(3) {
          i {
            color: rgba(51, 51, 51, 0.8);
          }
        }
        div:last-child {
          margin-right: 56px;
        }
        i {
          position: relative;
        }
        .icon-edit_icon_back1:hover::after {
          content: "后退";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_forward1:hover::after {
          content: "前进";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_web1:hover::after {
          content: "PC";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_phone1:hover::after {
          content: "Mobile";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_save1:hover::after {
          content: "保存";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_jump1:hover::after {
          content: "退出";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .icon-edit_icon_publish1:hover::after {
          content: "发布";
          display: block;
          position: absolute;
          font-size: 14px;
          padding: 5px 15px;
          border-radius: 4px;
          top: 28px;
          left: 50%;
          color: rgba(0, 0, 0, 0.65);
          transform: translateX(-50%);
          white-space: nowrap;
          background: #fff;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    .ecer_globalediting {
      overflow: scroll;
      position: fixed;
      width: 320px;
      height: 100%;
      left: 0px;
      top: 65px;
      background: #f9f9f9;
      z-index: 5;
      transition: all 0.3s ease;
      padding-bottom: 30px;
      box-sizing: border-box;
      padding-bottom: 100px;
      .ecer_globalitem {
        width: 100%;
        margin-top: 20px;
        background: #fff;
        .ecer_name {
          text-align: left;
          margin-left: 10px;
          font-size: 18px;
        }
      }
    }
  }
  .ecer_main {
    flex: 1;
    display: flex;
    overflow: hidden;
    aside {
      width: 16.67%;
      min-width: 320px;
      height: 100%;
      box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.32);
      background: rgba(249, 249, 249, 1);
      overflow: hidden;
      overflow-y: auto;
    }
    section {
      flex: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .preview--scaled-web {
        padding: 15px;
        width: 100%;
        height: 100%;
        max-width: 1440px;
        transition: all 150ms cubic-bezier(0.19, 1, 0.22, 1);
      }
      .preview--scaled-phone {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 0 12px rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 375px;
        height: 667px;
        overflow: hidden;
        transition: all 100ms linear;
      }
      .preview__outline {
        border: 6px solid #5c6ac4;
        display: none;
        pointer-events: none;
        border-radius: 3px;
        width: 98%;
        height: 100%;
        display: none;
        position: absolute;
        top: 0;
      }
      #ecer_page {
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 0 12px rgba(0, 0, 0, 0.1);
        max-width: 1440px;
        position: relative;
      }
      .ecer_web {
        width: 100%;
        transition: all 100ms linear;
        width: 100%;
        height: 100%;
      }
      .ecer_phone {
        width: 375px;
        height: 667px;
        overflow: auto;
        transition: all 100ms linear;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) !important;
      }
    }
  }
  .addsettingpage {
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
      box-sizing: border-box;
      .new_section_list {
        h3 {
          text-align: left;
          margin: 20px;
          margin-left: 15px;
          font-size: 16px;
          color: #637381;
          // padding-left: 15px;
        }
        .new_section_list_item {
          box-shadow: 0 0 0 1px rgba(63, 63, 68, 0.05),
            0 1px 3px 0 rgba(63, 63, 68, 0.15);
          text-align: left;
          padding: 10px 0px 10px 15px;
          font-weight: 400;
          color: #212b36;
          cursor: pointer;
          p {
            float: right;
            width: 55px;
            height: 33px;
            margin: auto;
            margin-right: 15px;
            line-height: 33px;
            text-align: center;
            margin-top: -5.5px;
            background: linear-gradient(to bottom, #6371c7, #5563c1);
            border-color: #3f4eae;
            color: white;
            font-weight: 400;
            font-size: 14px;
            user-select: none;
            border-radius: 4px;
            opacity: 0;
            transition: all 0.3s linear;
          }
        }
        .new_section_list_item:hover {
          box-shadow: inset -4px 0 0 0 #5c6ac4, 0 0 0 1px rgba(63, 63, 68, 0.05),
            0 1px 3px 0 rgba(63, 63, 68, 0.15);
          p {
            opacity: 1;
          }
        }
      }
    }
  }
}

.updown-enter-active,
.updown-leave-active {
  transform: translateY(0%);
}
.updown-enter,
.updown-leave-to {
  transform: translateY(-100%);
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


