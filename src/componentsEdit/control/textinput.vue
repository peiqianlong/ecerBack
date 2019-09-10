<template>
  <div class="input" v-if="dataInfo !== null">
    <div class="tit">{{val.label}}</div>
    <el-input v-model="val.default" placeholder="请输入内容" @keyup.native="change"></el-input>
  </div>
</template>
<script>
import { debug } from "util";
export default {
  name: "textinput",
  props: ["dataInfo", "data", "settings", "id"],
  data() {
    return {
      val: this.dataInfo
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
        this.val.default = settings[this.val.id];
      } else {
        if (this.settings == "settings") {
          this.val.default =
            settings.sections[this.data.id][this.settings][this.val.id];
        } else if (this.settings == "blocks") {
          this.val.default =
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.val.id
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
        settings[this.val.id] = this.val.default;
        this.$store.dispatch("savepagesettings", settings);
        this.$emit("watchopenajsx");
      } else {
        if (this.settings == "settings") {
          settings.sections[this.data.id][this.settings][
            this.val.id
          ] = this.val.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.data.id);
        } else if (this.settings == "blocks") {
          settings.sections[this.id.id][this.settings][this.data.id].settings[
            this.val.id
          ] = this.val.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.id.id);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.input {
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
}
.tit {
  margin-bottom: 10px;
  text-align: center;
}
</style>

