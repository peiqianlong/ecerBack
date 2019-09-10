<template>
  <div class="checkbox" v-if="dataInfo">
    <el-switch
      @change="change"
      v-model="val.default"
      active-color="#13ce66"
      inactive-color="rgba(163, 158, 158, 1)"
    ></el-switch>
    <div class="tit">{{val.label}}</div>
  </div>
</template>
<script>
export default {
  name: "checkbox",
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
      debugger
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
.checkbox {
  padding: 0 15px;
  display: flex;
  margin-bottom: 15px;
  .tit {
    margin-left: 15px;
    font-size: 16px;
  }
}
</style>


