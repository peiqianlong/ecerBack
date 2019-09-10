<template>
  <div v-if="dataInfo !== null">
    <div class="tit">{{options.label}}</div>
    <el-select v-model="options.default" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: "selectitem",
  props: ["dataInfo", "data", "settings", "id"],
  data() {
    return {
      options: this.dataInfo
    };
  },
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
        this.options.default = settings[this.options.id];
      } else {
        if (this.settings == "settings") {
          this.options.default =
            settings.sections[this.data.id][this.settings][this.options.id];
        } else if (this.settings == "blocks") {
          this.options.default =
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.options.id
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
        settings[this.options.id] = this.options.default;
        this.$store.dispatch("savepagesettings", settings);

        this.$emit("watchopenajsx");
      } else {
        if (this.settings == "settings") {
          settings.sections[this.data.id][this.settings][
            this.options.id
          ] = this.options.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.data.id);
        } else if (this.settings == "blocks") {
          settings.sections[this.id.id][this.settings][this.data.id].settings[
            this.options.id
          ] = this.options.default;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.id.id);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.tit {
  margin: 10px 0;
  text-align: center;
}
/deep/ .el-select {
  width: 100%;
  padding: 0 15px;
}
</style>

