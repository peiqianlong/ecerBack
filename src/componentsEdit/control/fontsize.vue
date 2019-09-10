<template>
  <div>
    <div class="block">
      <span class="demonstration">{{dataInfo.label}}</span>
      <el-slider
        v-model="value.default"
        :max="value.max"
        :min="value.min"
        :step="value.step"
        @change="changesize"
      ></el-slider>
    </div>
  </div>
</template>
<script>
export default {
  name: "fontsize",
  props: ["dataInfo", "data", "settings", "id"],
  data() {
    return {
      value: this.dataInfo
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
        this.value.default = parseInt(settings[this.value.id]);
      } else {
        if (this.settings == "settings") {
          this.value.default = parseInt(
            settings.sections[this.data.id][this.settings][this.value.id]
          );
        } else if (this.settings == "blocks") {
          this.value.default = parseInt(
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.value.id
            ]
          );
        }
      }
    },
    changesize() {
      let settings = this.$store.getters.pagesettings;
      let arr = this.$store.getters.startedit;
      let obj = this.deepClone(settings);
      arr.push({ data: obj, name: this.data.id });
      this.$store.dispatch("savestartdata", arr);
      let num = this.$store.getters.Num;
      this.$store.dispatch("Num", ++num);

      if (this.data == "") {
        settings[this.value.id] = this.value.default;
        this.$store.dispatch("savepagesettings", settings);

        this.$emit("watchopenajsx");
      } else {
        if (this.settings == "settings") {
          settings.sections[this.data.id][this.settings][
            this.value.id
          ] = this.value.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.data.id);
        } else if (this.settings == "blocks") {
          settings.sections[this.id.id][this.settings][this.data.id].settings[
            this.value.id
          ] = this.value.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.id.id);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.demonstration {
  display: block;
  text-indent: 15px;
  font-size: 14px;
  line-height: 20px;
  // text-align: left;
}
.el-slider {
  width: 90%;
  margin: 0 auto;
}
/deep/ .el-slider {
  .el-slider__bar {
    background-color: rgb(60, 168, 96);
  }
  .el-slider__button {
    border: 2px solid rgb(60, 168, 96);
  }
}
</style>

