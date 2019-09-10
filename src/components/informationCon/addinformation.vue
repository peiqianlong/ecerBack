<template>
  <div class="addmain">
    <div :class="itemColorFun" class="addproduct">
      <div class="edit_product">
        <div class="tit">资讯信息</div>
        <div class="input" style="width:240px;margin-bottom:12px;">
          <span>资讯分类</span>
          <el-select
            v-model="value_sel"
            placeholder="请选择"
            class="selectInput"
            :popper-class="`pop${storeItemList.itemColor.id}`"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.term_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="info_inputall">
          <div style="margin-bottom:12px;width:776px;">
            <inputinfo :data.sync="value_tit" tit="标题"></inputinfo>
          </div>
          <div style="margin-bottom:12px;width:776px;">
            <inputinfo :data.sync="value_ftit" tit="副标题"></inputinfo>
          </div>
          <div style="margin-bottom:12px;width:776px;">
            <inputinfo :data.sync="value_href" tit="链接"></inputinfo>
          </div>
        </div>
        <div class="input info_textareaInput">
          <span>摘要</span>
          <el-input
            type="textarea"
            class="textareaInput"
            :rows="10"
            placeholder="请输入内容"
            v-model="value_describe"
          ></el-input>
        </div>
      </div>

      <div
        class="edit_product addimg_product addinformation"
        :class="$store.getters.itemColor.id === '0' ? 'edit_white' : 'edit_black'"
      >
        <div class="tit">资讯内容</div>
        <editor
          style="height:80%;overflow:hidden;box-sizing:border-box;"
          api-key="1lzod4sidk60oiu5ljguaw3vel0o9s119nymdttn0f8lkegi"
          :init="editorinit"
          v-model="content"
        ></editor>
      </div>
      <div class="submit">
        <div style="margin-right: 12px;" @click.stop="savedata">
          <savebtn tit="确 定"></savebtn>
        </div>
        <div @click="clear">
          <cancelbtn tit="取 消"></cancelbtn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  AddNews,
  SaveAddNews,
  SaveAddModifyNews,
  AddModifyNews
} from "../../apis/api";
import Editor from "../../../static/tinymce/tinymce-vue/lib/cjs";
import { tinymcedata } from "../../units/timy";

export default {
  name: "add",
  props: {
    dataInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    inputinfo: resolve => require(["../../components/input/input2"], resolve),
    selectTem: resolve =>
      require(["../../components/input/selectTem"], resolve),
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve),
    editor: Editor
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      options: [],
      value_sel: "",
      value_tit: "",
      value_ftit: "",
      value_href: "",
      content: "",
      value_describe: "",
      editorinit: tinymcedata
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //获取下啦
    getInfo() {
      if (this.dataInfo !== null) {
        AddModifyNews(this.dataInfo.id).then(res => {
          debugger;
          this.value_sel = res.data.data.news_info.check_term_id;
          this.options = res.data.data.term_list;
          this.value_tit = res.data.data.news_info.news_title;
          this.value_ftit = res.data.data.news_info.news_subtitle;
          this.value_describe = res.data.data.news_info.news_describe;
          this.value_href = res.data.data.news_info.news_url;
          this.content = res.data.data.news_info.news_content_html;
        });
      } else {
        AddNews().then(res => {
          this.options = res.data.data.term_list;
        });
      }
    },
    //取消
    savedata() {
      debugger;
      let prams = {
        news_title: this.value_tit,
        news_subtitle: this.value_ftit,
        news_url: this.value_href,
        news_describe: this.value_describe,
        news_content: this.content,
        term_id: this.value_sel
      };
      if (prams.news_title == "") {
        this.$message({
          message: "标题不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_subtitle == "") {
        this.$message({
          message: "副标题不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_url == "") {
        this.$message({
          message: "链接不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_describe == "") {
        this.$message({
          message: "摘要不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_content == "") {
        this.$message({
          message: "内容不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.term_id == "") {
        this.$message({
          message: "分类不可以为空",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_title.length > 40) {
        this.$message({
          message: "标题字数在40以内",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      } else if (prams.news_subtitle.length > 40) {
        this.$message({
          message: "副标题字数在40以内",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      }
      if (this.dataInfo === null) {
        SaveAddNews(prams).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      } else {
        SaveAddModifyNews(prams, this.dataInfo.id).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      }
      this.$emit("clear");
    },
    clear() {
      this.$emit("clear");
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
// @import "../../less/product/ProuducrAdd/add.less";
.addproduct {
  .edit_product {
    background: #ffffff;
    width: 100%;
    padding: 32px 32px 40px 32px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 4px;
    margin-bottom: 16px;
    .tit {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      color: rgba(0, 0, 0, 1);
      text-align: left;
      margin-bottom: 20px;
    }

    .input {
      margin-top: 21px;
      text-align: left;

      span {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.45);
      }

      .editInput {
        width: 49.5%;
        min-width: 200px;
      }
    }
  }

  .addimg_product {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 4px;
    padding: 32px;
  }

  .info_product {
    .info {
      display: flex;

      .cituselect {
        width: 500px;
        margin-right: 60px;

        .cityone {
          width: 240px;
        }

        .citytwo {
          width: 240px;
          margin-left: 10px;
        }
      }

      .prace {
        display: flex;

        .prace_num {
          width: 230px;
        }

        .jian {
          margin: 0 15px;
          line-height: 40px;
          color: rgba(0, 0, 0, 0.85);
        }

        .check {
          line-height: 40px;
          margin-left: 28px;

          .el-checkbox__label {
            font-size: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.85);
          }
        }
      }

      .inputnum {
        width: 500px;
      }
    }
  }

  .tag_product {
    display: flex;
    flex-direction: column;

    .taginput {
      width: 800px;
      height: 44px;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.0392156862745098);
      opacity: 1;
      border-radius: 4px;
      text-indent: 12px;
    }

    .tags {
      display: flex;
      margin-top: 16px;

      .el-tag {
        border: 1px solid rgba(0, 0, 0, 0.25);
        background-color: transparent;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.65);
        border-radius: 4px;
      }
    }
  }
  .submit {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 19px;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

input[type="file"] {
  display: none;
}

.editor {
  width: 100%;
  height: 100%;

  .editortranslate {
    height: 20%;
    display: flex;

    div,
    textarea {
      width: 50%;
    }

    div {
      border-right: 1px solid #ccc;
    }
  }
}

// add黑色主题
.addmain /deep/ .add_black {
  .edit_product {
    background: rgba(34, 38, 67, 1);

    .tit {
      color: rgba(255, 255, 255, 1);
    }

    .input {
      span {
        color: rgba(255, 255, 255, 0.65);
      }

      .editInput {
        .el-input__inner {
          border: 1px solid rgba(255, 255, 255, 0.05);
          background-color: transparent;
        }
        .el-input__inner:focus {
          // border: 1px solid #3ca860;
          background-color: transparent;
        }
      }

      .el-select {
        .el-input__inner {
          border: 1px solid transparent;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.65);
          padding-left: 15px;
        }
        .is-focus {
          .el-input__inner {
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: transparent;
          }
        }
      }
      .textareaInput {
        .el-textarea__inner {
          border: 1px solid transparent;
          background-color: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.65);
        }
        .el-textarea__inner:focus {
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: transparent;
        }
      }
    }

    .info_textareaInput {
      .textareaInput {
        width: 49.5%;
        min-width: 200px;
      }
    }

    .info_inputall {
      width: 49.5%;
      min-width: 200px;
    }

    .upimg {
      .el-upload {
        background-color: rgba(255, 255, 255, 0.04);
        border: 1px dashed rgba(255, 255, 255, 0.078);
      }
    }
  }

  .info_product {
    .info {
      .el-input__inner {
        background-color: rgba(255, 255, 255, 0.04);
      }

      .el-input__inner::placeholder {
        color: rgba(255, 255, 255, 0.45);
      }

      .input {
        .prace {
          .check {
            .el-checkbox__input {
              .el-checkbox__original {
                border: none;
              }

              background-color: rgba(255, 255, 255, 0.04);
            }
          }
        }
      }
    }
  }

  .addinformation {
    .textareaInput {
      .el-textarea__inner {
        border: none;
        background: rgba(255, 255, 255, 0.04);
      }
    }
  }

  .tag_product {
    .el-input__inner {
      background: rgba(255, 255, 255, 0.04);
      border: none;
    }

    .el-input__inner::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }

    .tags {
      .el-tag {
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
}

//add组件内部css
/deep/ .addproduct {
  .selectInput {
    width: 240px;
    .el-input__inner {
      background-color: rgba(0, 0, 0, 0.02);
    }
    .el-input__inner:focus {
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }

  .textareaInput {
    .el-textarea__inner {
      background: rgba(0, 0, 0, 0.02);
    }
    .el-textarea__inner:focus {
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }

  .upimg {
    display: flex;
    justify-content: start;
  }

  .info_product {
    .el-input__inner {
      border: 1px solid rgba(0, 0, 0, 0.039);
      background: rgba(0, 0, 0, 0.02);
    }
  }

  .tags {
    .el-tag {
      .el-tag__close {
        color: rgba(191, 191, 191, 1);
      }

      .el-icon-close:hover {
        background-color: #3ca860;
        color: #fff;
      }
    }
  }
}
</style>


