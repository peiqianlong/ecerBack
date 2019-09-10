<template v-if="default">
  <div class="block">
    <el-color-picker show-alpha v-model="color1.default" @change="change"></el-color-picker>
    <span>{{color1.label}}</span>
  </div>
</template>
<script>
export default {
  name: "setcolor",
  props: ["dataInfo", "data", "settings", "id"],
  data() {
    return {
      color1: this.dataInfo
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
        this.color1.default = settings[this.color1.id];
      } else {
        if (this.settings == "settings") {
          this.color1.default =
            settings.sections[this.data.id][this.settings][this.color1.id];
        } else if (this.settings == "blocks") {
          this.color1.default =
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.color1.id
            ];
        }
      }
    },
    change() {
      let settings = this.$store.getters.pagesettings;
      let arr = this.$store.getters.startedit;
      let obj = this.deepClone(settings);
      arr.push({ data: obj, name: this.data.id });
      this.$store.dispatch("savestartdata", arr);
      let num = this.$store.getters.Num;
      this.$store.dispatch("Num", ++num);
      if (this.data == "") {
        settings[this.color1.id] =
          this.color1.default == null ? "" : this.color1.default;
        this.$store.dispatch("savepagesettings", settings);

        this.$emit("watchopenajsx");
      } else {
        if (this.settings == "settings") {
          settings.sections[this.data.id][this.settings][this.color1.id] =
            this.color1.default == null ? "" : this.color1.default;

          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.data.id);
        } else if (this.settings == "blocks") {
          settings.sections[this.id.id][this.settings][this.data.id].settings[
            this.color1.id
          ] = this.color1.default == null ? "" : this.color1.default;

          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.id.id);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.block {
  display: flex;
  align-items: center;
  height: 40px;
  span {
    height: 20px;
    margin-left: 15px;
    font-size: 16px;
  }
}
.block /deep/ .el-color-picker {
  height: 20px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-color-picker__trigger {
    height: 20px;
    padding: 0;
    .el-color-picker__color {
      .el-color-picker__color-inner {
      }
    }
    .el-color-picker__icon {
      display: none;
    }
  }
}
</style>

