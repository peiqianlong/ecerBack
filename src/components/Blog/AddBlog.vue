<template>
  <div class="addmain" :class="itemColorFun">
    <div class="addmain_left">
      <div class="bgtemp">
        <div class="tit">博文编辑</div>
        <div style="margin-bottom:12px;width:100%px">
          <inputEdit tit="博文标题" :data.sync="Blog_name"></inputEdit>
        </div>
        <div style="margin-bottom:12px;width:240px">
          <selectEdit tit="博文分类" :data.sync="term_list"></selectEdit>
        </div>
        <div style="margin-bottom:12px;width:100%px">
          <div style class="titspan">博文内容</div>
          <div :class="$store.getters.itemColor.id === '0' ? 'edit_white' : 'edit_black'">
            <editor
              style="overflow:hidden;box-sizing:border-box;height:100%;"
              api-key="1lzod4sidk60oiu5ljguaw3vel0o9s119nymdttn0f8lkegi"
              :init="editorinit"
              v-model="content"
              @onContextMenu="onContextMenu"
            ></editor>
          </div>
        </div>
        <div class="addmain_right" style="margin-bottom:0px;width:100%px">
          <div style class="titspan">博文标签</div>
          <div class="inputtag">
            <input
              placeholder="回车保存标签"
              @keydown="SaveLable"
              class="taginput"
              type="text"
              v-model="lable_name_tag"
            />
          </div>
          <div class="tags">
            <el-tag
              @close="handleClose(tag)"
              v-for="tag in dynamicTags"
              :key="tag.name"
              closable
              :type="tag.type"
            >{{tag}}</el-tag>
          </div>
        </div>
      </div>
      <div class="btnsave">
        <savebtn tit="发布" @Fun="SaveInfo('release')"></savebtn>
        <div style="margin-left:12px;">
          <savebtn tit="保存为草稿" @Fun="SaveInfo('draft')"></savebtn>
        </div>
        <div style="margin-left:12px;">
          <cancelbtn tit="取消" @Fun="$emit('cancel')"></cancelbtn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  GetAddBlogList,
  SaveAddBlogList,
  SaveIdAddBlogList,
  GetIDAddBlogList
} from "../../apis/api";
import draggable from "vuedraggable";
import Editor from "../../../static/tinymce/tinymce-vue/lib/cjs";
import { tinymcedata } from "../../units/timy";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
export default {
  name: "AddBlog",
  props: ["addInfo"],
  components: {
    editor: Editor,
    draggable: draggable,
    inputEdit: resolve => require(["../input/input2.vue"], resolve),
    cancelbtn: resolve => require(["../input/cancelbtn.vue"], resolve),
    savebtn: resolve => require(["../input/savebtn.vue"], resolve),
    selectEdit: resolve => require(["../input/selectTem.vue"], resolve)
  },
  data() {
    return {
      term_list: {
        id: "",
        sel: []
      },
      dynamicTags: [],
      Blog_name: "",
      content: "",
      check_product_img_list: [],
      lable_name_tag: "",
      // trem_value: "1",
      inputVisible: false,
      inputValue: "",
      imglist: [],
      value: "",

      editorinit: tinymcedata,
      //删除添加图片
      removeAddImg(index) {
        this.check_product_img_list.splice(index, 1);
      }
    };
  },
  mounted() {
    this.taglist();
  },
  methods: {
    onContextMenu(element,val,val2,val3) {
    },
    //获取下拉框
    taglist() {
      if (this.addInfo !== null) {
        GetIDAddBlogList(this.addInfo).then(res => {
          if (res.data.status === 0) {
            this.Blog_name = res.data.data.post_info.post_title;
            this.term_list.id = res.data.data.post_info.check_term_id;
            this.term_list.sel = res.data.data.term_list;
            this.content = res.data.data.post_info.post_content_html;
            if (res.data.data.post_info.check_label_list) {
              res.data.data.post_info.check_label_list.forEach(item => {
                this.dynamicTags.push(item.label_name);
              });
            }
          } else {
            this.$message({
              type: res.data.type,
              message: res.data.msg,
              customClass: "msgposition",
              center: true
            });
          }
        });
      } else {
        GetAddBlogList().then(res => {
          if (res.status === 200) {
            this.term_list.sel = res.data.data.term_list;
            this.term_list.id = res.data.data.term_list[0].id;
          }
        });
      }
    },
    fileSuccess(response, file, fileList) {
      this.check_product_img_list.push(response.data);
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //保存数据
    SaveInfo(val) {
      let arr = [];
      this.check_product_img_list.forEach(item => {
        arr.push(item.media_url);
      });
      let prams = {
        post_title: this.Blog_name,
        post_content: this.content,
        term_id: this.term_list.id,
        label_list: this.dynamicTags,
        post_status: val
      };
      if (prams.post_title == "") {
        this.$message({
          type: "error",
          message: "请填写表标题",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.post_content == "") {
        this.$message({
          type: "error",
          message: "请输入内容",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.post_title.length > 40) {
        this.$message({
          type: "error",
          message: "标题在40字以内",
          customClass: "msgposition",
          center: true
        });
        return;
      }

      if (this.addInfo !== null) {
        SaveIdAddBlogList(this.addInfo, prams).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
        this.$emit("cancel");
      } else {
        SaveAddBlogList(prams).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
        this.$emit("cancel");
      }
    },
    //发布release //draft
    fabu() {
      // this.$message({
      //   type: "error",
      //   message: "暂未开通",
      //   customClass: "msgposition",
      //   center: true
      // });
    },
    //保存标签
    SaveLable() {
      let e = event.keyCode;
      if (e === 13) {
        if (this.lable_name_tag !== "") {
          this.dynamicTags.push(this.lable_name_tag);
          this.lable_name_tag = "";
        } else {
          this.$message({
            type: "error",
            message: "不允许为空",
            customClass: "msgposition",
            center: true
          });
        }
      }
    },
    // 生成标签
    LabelList() {
      if (this.addInfo === null) {
        return [];
      } else {
        let arr = [];
        this.addInfo.check_label_list.forEach(element => {
          arr.push(element.label_name);
          return arr;
        });
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "add_white";
        case "1":
          return "add_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @import '../../../static/tinycss/timycontent.css';
.addmain {
  width: 100%;
  height: 100%;
  display: flex;
  .bgtemp {
    padding: 34px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 16px;
    .tit {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      margin-bottom: 20px;
    }
  }
  .addmain_left {
    flex: 1;
    margin-right: 16px;
    .titspan {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 7px;
      text-align: left;
    }
    .uploadImg {
      width: 100%;
      .itemList {
        width: 144px;
        height: 144px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        overflow: hidden;
        float: left;
        margin: 4px;
        .imgclose {
          position: absolute;
          right: -20px;
          top: -20px;
          display: block;
          border: 20px solid #3ca860;
          transform: rotate(45deg);
          display: none;
          cursor: pointer;
          i {
            position: absolute;
            left: -7px;
            top: 1px;
            color: #fff;
          }
        }
        .closeaddimg:hover {
          .imgclose {
            display: block;
          }
        }
      }
      .upload {
        background: rgba(0, 0, 0, 0.02);
        border: 2px dashed rgba(0, 0, 0, 0.0784313725490196);
        position: relative;
        /deep/ .el-upload {
          width: 100%;
          height: 100%;
        }
      }
      .upload:before {
        content: "";
        display: block;
        width: 2px;
        height: 60px;
        background: rgba(0, 0, 0, 0.45098039215686275);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .upload::after {
        content: "";
        display: block;
        width: 60px;
        height: 2px;
        background: rgba(0, 0, 0, 0.45098039215686275);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .itemList:first-child {
        width: 300px;
        height: 300px;
        margin: 0;
        margin-right: 4px;
        margin-top: 4px;
      }
    }
    .btnsave {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 19px;
    }
  }
  .addmain_right {
    .inputtag {
      width: 100%;
      overflow: hidden;
      .taginput {
        width: 804px;
        height: 40px;
        background: rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.0392156862745098);
        opacity: 1;
        border-radius: 4px;
        outline: none;
        text-indent: 12px;
        margin-bottom: 8px;
        float: left;
      }
      .taginput::placeholder {
        font-size: 13px;
      }
    }

    .tags {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      span {
        margin-right: 8px;
        padding: 0px 8px;
        height: 28px;
        line-height: 28px;
        border: 1px solid rgba(0, 0, 0, 0.25098039215686274);
        border-radius: 4px;
        background: transparent;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      /deep/ .el-tag .el-tag__close {
        color: rgba(0, 0, 0, 0.65);
      }
      /deep/ .el-tag .el-tag__close:hover {
        background: transparent;
      }
    }
    .taginput:focus {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.03921569);
    }
  }
}
.add_black {
  .addmain_left,
  .addmain_right {
    .bgtemp {
      background: rgba(34, 38, 67, 1);
      .tit {
        color: rgba(255, 255, 255, 1);
      }
      .taginput {
        background: rgba(255, 255, 255, 0.04);
        color: rgba(255, 255, 255, 0.65);
      }
      .tags {
        span {
          border: 1px solid rgba(255, 255, 255, 0.25098039215686274);
          color: rgba(255, 255, 255, 0.65);
        }
        /deep/ .el-tag .el-icon-close::before {
          color: rgba(255, 255, 255, 0.65);
        }
      }
      .upload {
        border: 2px dashed rgba(255, 255, 255, 0.0784313725490196);
        background: rgba(255, 255, 255, 0.04);
      }
      .upload:before {
        background: rgba(255, 255, 255, 0.45098039215686275);
      }
      .upload::after {
        background: rgba(255, 255, 255, 0.45098039215686275);
      }
    }
    .titspan {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
</style>


