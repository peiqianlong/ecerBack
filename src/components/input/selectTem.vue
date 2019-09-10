<template>
  <div class="select producrselect" :class="itemColorFun">
    <span class="titspan">{{tit}}</span>
    <el-select
      v-model="data.id"
      placeholder="请选择"
      :popper-class="`pop${storeItemList.itemColor.id}`"
    >
      <el-option :style="{'padding-left':item.term_level == 2 ? '30px':'15px'}" v-for="item in data.sel" :key="item.id" :label="item.term_name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "selectTem",
  props: ["tit", "data"],
  data() {
    return {
      text: this.data,
      storeItemList: this.$store.getters
    };
  },
  methods: {
    change() {
      this.$emit("update:data", this.data);
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "select_white";
        case "1":
          return "select_black";
        default:
          return;
      }
    }
  },
  watch: {
    data(v, v2) {
      this.text = v;
    }
  }
};
</script>
<style lang="less" scoped>
.select {
  text-align: left;
  span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 7px;
  }
  /deep/ .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.039);
    background: rgba(0, 0, 0, 0.02);
  }
  /deep/ .el-select {
    width: 100%;
    .el-input.is-focus .el-input__inner {
      background: transparent;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
}
.select_black {
  .titspan {
    color: rgba(255, 255, 255, 0.65);
  }
  /deep/ .el-select .el-input__inner {
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.65);
  }
  /deep/ .el-select .el-input__inner:focus {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
}
</style>