<template>
  <div class="ecerdialog__wrapperall" :class="itemColorFun">
    <el-dialog title="添加资讯分类" style="display:block;" width="47.92%" fullscreen>
      <div slot="footer" class="dialog-footer">
        <div class="tit">
          <span>分类名称</span>
          <el-input v-model="value_name"></el-input>
        </div>
        <div class="tit tit2">
          <span>分类描述</span>
          <el-input
            type="textarea"
            :rows="5"
            style="height:180px;"
            placeholder="请输入内容"
            v-model="textarea"
          ></el-input>
        </div>
        <div class="submit">
          <div style="margin-right: 12px;" @click.stop="oksub">
            <savebtn tit="确 定"></savebtn>
          </div>
          <div @click.stop="clear">
            <cancelbtn tit="取 消"></cancelbtn>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  AddNewsTerm,
  SaveAddNewsTerm,
  SaveAddModifyNewsTerm,
  AddModifyNewsTerm
} from "../../apis/api";
export default {
  name: "addclassification",
  props: {
    dataInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      value_name: "",
      textarea: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //获取下拉  信息
    getInfo() {
      if (this.dataInfo !== null) {
        AddModifyNewsTerm(this.dataInfo.id).then(res => {
          this.value_name = res.data.data.news_term_info.term_name;
          this.textarea = res.data.data.news_term_info.term_describe;
        });
      }
    },
    clear() {
      this.$emit("sub", "");
    },
    oksub() {
      let prams = {
        term_name: this.value_name,
        term_describe: this.textarea
      };
      if (prams.term_name.length > 10) {
        this.$message({
          message: "分类名称字数在10字以内",
          type: "info",
          customClass: "msgposition",
          center: true
        });
        return;
      }

      if (this.dataInfo === null) {
        SaveAddNewsTerm(prams).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
          center: true
          });
          this.$emit("sub", this.form);
        });
      } else {
        SaveAddModifyNewsTerm(prams, this.dataInfo.id).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
          center: true
          });
          this.$emit("sub", this.form);
        });
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "dialog__wrapperall_white";
        case "1":
          return "adddialog__wrapperall_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less">
.ecerdialog__wrapperall {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  .el-dialog__title {
    font-weight: 900;
  }
  .el-dialog__wrapper {
    position: absolute;
    width: 920px;
    height: 509px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
    .el-dialog {
      padding: 34px;
    }
    .el-dialog__header {
      padding-top: 0px;
      padding-bottom: 32px;
    }
    .el-dialog__headerbtn {
      display: none;
    }
    .el-dialog__footer {
      padding: 0;
      .dialog-footer {
        padding: 0px;
        .tit {
          margin-bottom: 29px;
          display: flex;
          flex-direction: column;
          justify-content: start;
          span {
            display: block;
            margin-bottom: 12px;
            text-align: left;
            font-weight: 900;
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
          }
          /deep/ .el-input {
            width: 480px;
            margin-left: 0;
            .el-input__inner {
              background: rgba(0, 0, 0, 0.02);
              border: 1px solid rgba(0, 0, 0, 0.039);
            }
            .el-input__inner:focus {
              border: 1px solid rgba(0, 0, 0, 0.12);
              background: transparent;
            }
          }
        }
        .tit2 {
          margin-bottom: 30px;
          width: 100%;
        }
        .el-textarea {
          .el-textarea__inner {
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.039);
            height: 100%;
          }
          .el-textarea__inner:focus {
            border: 1px solid rgba(0, 0, 0, 0.12);
            background: transparent;
          }
        }

        .submit {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}

//黑色主题的
.adddialog__wrapperall_black {
  background: rgba(0, 0, 0, 0.75);
  /deep/.el-textarea__inner {
    color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.04);
  }
  /deep/.el-button--default {
    border: 1px solid rgba(255, 255, 255, 0.45);
    span {
      color: rgba(255, 255, 255, 0.65);
    }
  }
}
.adddialog__wrapperall_black .el-dialog__wrapper .el-dialog {
  background: rgba(34, 38, 67, 1);
  border-radius: 8px;
  .el-input__inner {
    color: rgba(255, 255, 255, 0.65);
  }
  .el-dialog__header {
    span {
      color: rgba(255, 255, 255, 1);
    }
  }
  .dialog-footer {
    .tit {
      color: rgba(255, 255, 255, 0.65);
      span {
        color: rgba(255, 255, 255, 0.65);
      }
    }
    .el-input {
      .el-input__inner {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid transparent;
      }
      .el-input__inner:focus {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }
    }
    .el-select {
      .el-input {
        .el-input__inner {
          background: rgba(255, 255, 255, 0.04);
          border: none;
        }
      }
    }
    .el-textarea {
      .el-textarea__inner {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid transparent;
      }
      .el-textarea__inner:focus {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.06);
      }
    }
    .submit {
      .el-button--default {
        border: 1px solid rgba(255, 255, 255, 0.45);
        span {
          color: rgba(255, 255, 255, 0.65);
        }
      }
    }
  }
}
</style>

