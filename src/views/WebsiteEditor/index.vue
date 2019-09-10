<template>
  <div :class="itemColorFun">
    <div class="WebsiteEditor">
      <div class="tit">当前模板</div>
      <div class="edit_template">
        <div class="template_img">
          <img src="../../assets/img/temp.png" alt />
        </div>
        <div class="info_template">
          <h3>我的小店</h3>
          <span>模板105</span>
          <div class="info_btn">
            <preview tit="预览"></preview>
            <div style="margin-left:-6px">
              <saveedit @Fun="GoEdit" tit="开始编辑"></saveedit>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="WebsiteEditor WebsiteEditors" style="margin-bottom:20px;padding-bottom:18px;">
      <div class="tit">模板库</div>
      <div class="select">
        <el-select
          v-model="value"
          placeholder="请选择"
          :popper-class="`pop${storeItemList.itemColor.id}`"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="value2"
          placeholder="请选择"
          :popper-class="`pop${storeItemList.itemColor.id}`"
        >
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <div class="tep_list container-fluid">
        <div class="row" style="margin:0;">
          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in 10" :key="item">
            <div class="list">
              <div class="boxshow">
                <img src="../../assets/img/temp.png" alt />
                <div class="shondow">
                  <preview tit="预览"></preview>
                  <saveedit @Fun="GoEdit" tit="开始编辑"></saveedit>
                </div>
              </div>
              <div class="Explain">
                <span>活力明亮极简风多用途模板</span>
                <span class="free">free</span>
                <!-- <span class="money">￥6.9</span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {} from "../../apis/api";
export default {
  name: "index",
  components: {
    saveedit: resolve => require(["@/components/input/savebtn"], resolve),
    preview: resolve => require(["@/components/input/preview"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      options: [],
      value: "",
      options2: [],
      value2: ""
    };
  },
  mounted() {
    this.getIngo();
  },
  methods: {
    //获取数据
    getIngo() {},
    GoEdit() {
      this.$store.dispatch("appshow", false);
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "WebsiteEditor_white";
        case "1":
          return "WebsiteEditor_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// @import "../../less/WebsiteEditor/index.less";
.WebsiteEditor {
  display: flex;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  opacity: 1;
  border-radius: 4px;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding: 34px;
  padding-right: 0;
  margin-bottom: 16px;
  .tit {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: rgba(0, 0, 0, 1);
    opacity: 1;
    margin-bottom: 20px;
  }
  .edit_template {
    width: 100%;
    height: 200px;
    display: flex;
    .template_img {
      width: 320px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .info_template {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      h3 {
        font-size: 20px;
        height: 27px;
        font-weight: 400;
        line-height: 27px;
        color: rgba(0, 0, 0, 0.85);
        margin: 97px 0 4px 0;
        text-align: left;
      }
      span {
        display: block;
        width: 100%;
        text-align: left;
        font-size: 14px;
        font-family: Segoe UI;
        font-weight: 400;
        height: 16px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 16px;
      }
      .info_btn {
        display: flex;
      }
    }
  }
  .tep_list {
    width: 100%;
    padding: 0;
    .col-lg-3,
    .col-md-4,
    .col-sm-6,
    .col-xs-12 {
      padding: 0;
      padding-right: 16px;
    }
    .list {
      border: 1px solid rgba(0, 0, 0, 0.0784313725490196);
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
      opacity: 1;
      border-radius: 8px;
      padding: 12px 12px 16px 12px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .boxshow {
        position: relative;
        overflow: hidden;

        .shondow {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          width: 100%;
          height: 100%;
          left: 0;
          top: -100%;
          transition: all 200ms linear;
          border-radius: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .cancelbtnAll {
            margin-left: 16px;
            margin-bottom: 20px;
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 2px;
        }
      }
      .boxshow:hover {
        .shondow {
          top: 0;
        }
      }
      .Explain {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1) {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          width: 200px;
          min-width: 80px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: left;
        }
        .free {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.65);
        }
        .money {
          font-size: 14px;
          font-weight: 600;
          color: rgba(70, 185, 108, 1);
        }
      }
    }
  }
}
.WebsiteEditors /deep/ .el-select {
  width: 240px;
  min-width: 200px;
  margin-bottom: 16px;
  border-radius: 4px;
  .el-input__inner {
    height: 40px;
    box-sizing: border-box;
    border: 1px solid transparent;
    background: rgba(0, 0, 0, 0.04);
    color: rgba(0, 0, 0, 0.85);
  }
  .el-input__inner::placeholder {
    color: rgba(0, 0, 0, 0.85);
  }
  .el-input {
    .el-input__suffix {
      .el-input__icon {
        color: #46b96c;
        height: 40px;
      }
    }
  }
}
//黑色主题
.WebsiteEditor_black {
  .WebsiteEditor {
    background: rgba(34, 38, 67, 1);
    box-shadow: none;
    .tit {
      color: rgba(255, 255, 255, 1);
    }
  }
  .edit_template {
    .info_template {
      h3 {
        color: rgba(255, 255, 255, 0.85);
      }
      span {
        color: rgba(255, 255, 255, 0.45);
      }
    }
  }
  .WebsiteEditors {
    .tep_list {
      .list {
        background: rgba(255, 255, 255, 0.04);
        .Explain {
          span:first-child,
          .free {
            color: rgba(255, 255, 255, 0.65);
          }
        }
      }
    }
  }
  /deep/ .el-select {
    .el-input__inner {
      background: rgba(255, 255, 255, 0.04);
      color: rgba(255, 255, 255, 0.85);
    }
    .el-input__inner::placeholder {
      color: rgba(255, 255, 255, 0.85);
    }
    .el-input__icon {
      color: #1ac257;
    }
  }
  .tep_list {
    .list {
      box-shadow: none;
    }
  }
}
</style>
