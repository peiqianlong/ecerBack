<template>
  <div class="inputall2" :class="itemColorFun">
    <span>{{tit}}</span>
    <el-input placeholder="请输入" v-model="text" @change="change"></el-input>
  </div>
</template>
<script>
export default {
  name: "inputedit",
  props: ["tit", "data"],
  data() {
    return {
      text: this.data
    };
  },
  methods: {
    change() {
      this.$emit("update:data", this.text);
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "inputall_white";
        case "1":
          return "inputall_black";
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
<style lang="less">
.inputall2 {
  text-align: left;
  span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 7px;
  }
  .editInput {
    width: 49.5%;
    min-width: 200px;
  }
  .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.039);
    background: rgba(0, 0, 0, 0.02);
  }
}
.inputall_black {
  span {
    color: rgba(255, 255, 255, 0.65);
  }
}
.inputall_black /deep/ .el-input {
  .el-input__inner {
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.65);
  }
  .el-input__inner:focus {
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: transparent;
  }
}
</style>


