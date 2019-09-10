<template>
  <div :class="itemColorFun">
    <el-button @click="$emit('Fun')" class="savebtnAll">{{tit}}</el-button>
  </div>
</template>
<script>
export default {
  name: "savebtn",
  props: ["tit"],
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "savebtnAll_white";
        case "1":
          return "savebtnAll_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less">
div {
  .savebtnAll {
    width: 100px;
    height: 40px;
    padding: 0;
    background: #3ca860;
    opacity: 1;
    border-radius: 4px;
    border-color: rgba(70, 185, 108, 1);
    span {
      font-weight: 400;
      line-height: 14px;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
      font-size: 14px;
    }
  }
  .el-button:focus {
    border-color: #3ca860;
    background-color: #3ca860;
  }
  .savebtnAll:hover {
    border-color: #208943;
    background-color: #208943;
  }
}
.savebtnAll_black /deep/ .el-button {
  background: rgba(26, 194, 87, 1);
  opacity: 1;
  border-radius: 4px;
  border: none;
}

@media screen and (max-width: 1440px) {
}
</style>


