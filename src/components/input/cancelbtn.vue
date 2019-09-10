<template>
  <div class="cancelbtnAll" :class="itemColorFun">
    <el-button @click="$emit('Fun')" class="cancelbtn">{{tit}}</el-button>
  </div>
</template>
<script>
export default {
  name: "cancelbtn",
  props: ["tit"],
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "cancelbtnAll_white";
        case "1":
          return "cancelbtnAll_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less">
.cancelbtnAll {
  .cancelbtn {
    width: 100px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.45098039215686275);
    opacity: 1;
    border-radius: 5px;
    background: transparent;
    span {
      font-size: 16px;
      font-weight: 400;
      line-height: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .el-button:focus {
    border: 1px solid rgba(0, 0, 0, 0.45098039215686275);
    background: transparent;
    span {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .el-button:hover {
    border-color: rgba(0, 0, 0, 0.85);
    background-color: transparent;
    span {
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
.cancelbtnAll_black /deep/ {
  .el-button {
    border: 1px solid rgba(255, 255, 255, 0.45);
    span {
      color: rgba(255, 255, 255, 0.65);
    }
  }
  .el-button:focus,
  .el-button:hover {
    border-color: rgba(255, 255, 255, 0.65);
    background-color: transparent;
    span {
      color: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>
