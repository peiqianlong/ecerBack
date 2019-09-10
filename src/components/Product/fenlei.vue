<template>
  <div class="ecerpordectfenlei" :class="itemColorFun">
    <el-dialog title="添加分类" style="display:block;" width="47.92%" fullscreen>
      <div slot="footer" class="dialog-footer">
        <div class="tit">
          <span>分类名称</span>
          <el-input v-model="name_value"></el-input>
        </div>
        <div class="tit" v-if="show !== 1">
          <span>上级分类</span>
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
        <div class="tit tit2">
          <span>详细信息</span>
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
        <div class="submit">
          <div style="margin-right: 12px;" @click.stop="oksub">
            <savebtn tit="确 定"></savebtn>
          </div>
          <div @click.stop="clear">
            <cancelbtn tit="取 消"></cancelbtn>
          </div>
          <!-- <el-button type="primary">确 定</el-button>
          <el-button >取 消</el-button>-->
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  AddProductListproDuctterm,
  SaveAddProductListproDuctterm,
  SaveIdAddProductListproDuctterm,
  IdAddProductListproDuctterm
} from "../../apis/api";
export default {
  name: "fenlei",
  props: ["dataInfo"],
  components: {
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      options: [],
      name_value: "",
      value_sel: "",
      textarea: "",
      storeItemList: this.$store.getters,
      show: ""
    };
  },
  mounted() {
    this.InfoData();
  },
  methods: {
    InfoData() {
      if (this.dataInfo === null) {
        AddProductListproDuctterm().then(res => {
          this.options = res.data.data.term_parent_list;
        });
      } else {
        IdAddProductListproDuctterm(this.dataInfo.id).then(res => {
          this.name_value = res.data.data.product_term_info.term_name;
          this.options = res.data.data.term_parent_list;
          this.value_sel = res.data.data.product_term_info.check_term_parent_id;
          this.show = res.data.data.product_term_info.term_level;
          this.textarea = res.data.data.product_term_info.term_describe;
        });
      }
    },
    clear() {
      this.$emit("sub", 0);
    },
    oksub() {
      let params = {
        term_name: this.name_value,
        term_describe: this.textarea,
        term_parent_id: this.value_sel
      };
      if (params.term_name.length > 10) {
        this.$message({
          message: "名称10个字以内",
          type: "info",
          customClass: "msgposition",
            center: true
        });
        return;
      }
      if (this.dataInfo === null) {
        SaveAddProductListproDuctterm(params).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      } else {
        SaveIdAddProductListproDuctterm(params, this.dataInfo.id).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
        });
      }
      this.$emit("sub");
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
.ecerpordectfenlei {
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
    width: 920px;
    height: 524px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    overflow: hidden;
    .el-dialog {
      padding: 34px;
    }
    .el-dialog__header {
      padding-top: 0px;
      padding-bottom: 32px;
    }
    .el-dialog__footer {
      padding: 0;
    }
    .el-dialog__headerbtn {
      display: none;
    }
    .dialog-footer {
      padding: 13px 0px 0;
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
        .el-input {
          width: 480px;
          margin-left: 0;
          .el-input__inner {
            background: rgba(0, 0, 0, 0.02);
          }
          .el-input__inner:focus {
            // border: 1px solid #3ca860;
            background: transparent;
          }
        }
        .el-select {
          .el-input__inner {
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.12);
            padding-left: 15px;
          }
          .el-input__inner:focus {
            background: transparent;
            // border: 1px solid #3ca860;
          }
        }
        .el-textarea__inner {
          height: 180px;
          background: rgba(0, 0, 0, 0.02);
        }
        .el-textarea__inner:focus {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: transparent;
        }
      }
      .tit2 {
        margin-bottom: 30px;
        width: 100%;
      }
      .submit {
        display: flex;
        justify-content: center;
      }
    }
  }
}

//黑的弹框
.adddialog__wrapperall_black {
  background: rgba(0, 0, 0, 0.75);
}
.adddialog__wrapperall_black .el-dialog__wrapper .el-dialog {
  background: rgba(34, 38, 67, 1);
  border-radius: 8px;
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
      .el-input {
        .el-input__inner:focus {
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
      }
    }
    .el-input {
      .el-input__inner {
        background: rgba(255, 255, 255, 0.04);
        border: none;
        color: rgba(255, 255, 255, 0.65);
      }
    }
    .el-select {
      .el-input {
        .el-input__inner {
          background: rgba(255, 255, 255, 0.04);
          border: none;
        }
      }
      .is-focus .el-input__inner {
        background: transparent;
        // border: 1px solid #3ca860;
      }
    }
    .el-textarea {
      .el-textarea__inner {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid transparent;
        color: rgba(255, 255, 255, 0.65);
      }
      .el-textarea__inner:focus {
        // border: 1px solid #3ca860;
        background: transparent;
      }
    }
    .submit {
      //
    }
  }
}

@media screen and (max-width: 1440px) {
  // .submit {
  //   .el-button {
  //     width: 80px !important;
  //     height: 35px !important;
  //     padding: 0 !important;
  //     span {
  //       font-size: 14px !important;
  //     }
  //   }
  // }
}
</style>

