<template>
  <div class="inputall" :class="itemColorFun">
    <span>
      <b class="warning"></b>
      {{tit}}
    </span>
    <el-input :placeholder="place" :value="val" v-model="D"></el-input>
  </div>
</template>
<script>
export default {
  name: "inputedit",
  props: ["tit", "place", "data"],
  data() {
    return {
      D: ""
    };
  },
  mounted() {},
  methods: {},
  computed: {
    val() {
      this.D = this.data;
    },
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
  }
};
</script>
<style lang="less">
.inputall {
  text-align: left;
  span {
    display: block;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 8px;
    font-size: 14px;
    height: 20px;
    color: rgba(0, 0, 0, 0.45);
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
    border: 1px solid transparent;
  }
  .el-input__inner:focus {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
}
.warning {
  position: relative;
  width: 4px;
  height: 4px;
  overflow: hidden;
  display: inline-block;
  background: red;
  border-radius: 50%;
  top: -2px;
}
// .warning::after {
//   content: "*";
//   position: absolute;
//   top: 64%;
//   transform: translateY(-50%);
//   font-size: 20px;
//   color: red;
//   font-weight: 900;
//   left: -15px;
// }
</style>


