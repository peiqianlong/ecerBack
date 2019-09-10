<template>
  <div class="cancelbtnAll">
    <el-button class="cancelbtn">{{tit}}</el-button>
  </div>
</template>
<script>
export default {
  name: "cancelbtn",
  props: ["tit"]
};
</script>
<style lang="less">
.cancelbtnAll {
  .cancelbtn {
    width: 100px;
    height: 40px;
    padding: 0;
    border: 1px solid rgba(70, 185, 108, 1);
    opacity: 1;
    border-radius: 4px;
    margin-right: 16px;
    background: transparent;
    span {
      font-weight: 400;
      line-height: 14px;
      color: rgba(70, 185, 108, 1);
      opacity: 1;
      font-size: 14px;
    }
  }
  .el-button:hover {
    border-color: #208943;
    span{
      color: #208943;
    }
  }
}

@media screen and (max-width: 1440px) {
  @proportion :(1920/1440);
  // .cancelbtn {
  //   width: 100px !important;
  //   height: 32px !important;
  //   padding: 0 !important;
  //   span {
  //     font-size: 12px !important;
  //   }
  // }
}
</style>
