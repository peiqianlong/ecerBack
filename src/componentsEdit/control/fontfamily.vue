<template>
  <div class="view">
    <div class="tit">{{dataInfo.label}}</div>
    <div class="te-setting-preview">
      <p
        style="font-family: 'Arial Narrow', 'Franklin Gothic Medium', Arial, sans-serif;"
      >{{ namefont}}</p>
    </div>
    <div class="sel">
      <el-select
        class="selectfont"
        v-model="val"
        filterable
        placeholder="搜索字体"
        :filter-method="SearchFont"
        @change="selectfont"
      >
        <el-option
          v-for="item in options"
          :key="item.default_variant_handle"
          :label="item.name"
          :value="item.default_variant_handle"
        ></el-option>
      </el-select>
      <el-select
        class="selectfont selfontshu"
        v-model="val2"
        filterable
        placeholder="切换属性"
        :filter-method="SearchFont"
        @change="change"
      >
        <el-option
          v-for="item in options2"
          :key="item.handle"
          :label="item.style_name"
          :value="item.handle"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import { getFontFamily } from "../../apis/api";
import { runInThisContext } from "vm";
export default {
  name: "fontfamily",
  props: ["dataInfo", "data", "settings", "id"],
  data() {
    return {
      options: [],
      val: "",
      options2: [],
      val2: "",
      namefont: ""
    };
  },
  created() {
    this.SearchFont();
    this.setData();
  },
  mounted() {
    
  },
  methods: {
    setData() {
      let settings = this.$store.getters.pagesettings;
      if (this.data == "") {
        this.val = settings[this.dataInfo.id];
      } else {
        if (this.settings == "settings") {
          this.dataInfo.default =
            settings.sections[this.data.id][this.settings][this.dataInfo.id];
          this.$store.dispatch("savepagesettings", settings);
        } else if (this.settings == "blocks") {
          this.dataInfo.default =
            settings.sections[this.id.id][this.settings][this.data.id].settings[
              this.dataInfo.id
            ];
        }
      }
    },
    SearchFont(val) {
      if (val === undefined) {
        val = "";
      }
      getFontFamily(val).then(res => {
        this.options = res.data.data.font_families;
        this.options.forEach(ele => {
          if (this.val == ele.default_variant_handle) {
            this.options2 = ele.variants;
            ele.variants.forEach(item => {
              if (this.val == item.handle) {
                this.namefont = item.name;
                this.val2 = item.handle;
              }
            });
          }
        });
      });
    },

    selectfont(val) {
      this.val2 = "";
      this.options.forEach(item => {
        if (val === item.default_variant_handle) {
          this.options2 = item.variants;
          this.namefont = item.name;
        }
      });
      this.change();
    },
    change() {
      this.nameselect();
      let settings = this.$store.getters.pagesettings;
      let arr = this.$store.getters.startedit;
      let obj = this.deepClone(settings);
      arr.push({ data: obj, name: this.data.id });
      this.$store.dispatch("savestartdata", arr);
      let num = this.$store.getters.Num;
      this.$store.dispatch("Num", ++num);
      if (this.data == "") {
        settings[this.dataInfo.id] = this.val2 || this.val;
        this.$store.dispatch("savepagesettings", settings);
        this.$emit("watchopenajsx");
      } else {
        if (this.settings == "settings") {
          settings.sections[this.data.id][this.settings][this.dataInfo.id] =
            this.val2 || this.val;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.data.id);
        } else if (this.settings == "blocks") {
          settings.sections[this.id.id][this.settings][this.data.id].settings[
            this.dataInfo.id
          ] = this.val2 || this.val;
          this.$store.dispatch("savepagesettings", settings);
          this.$emit("openajsx", this.id.id);
        }
      }
    },
    nameselect() {
      this.options.forEach(ele => {
        if (this.val == ele.default_variant_handle) {
          ele.variants.forEach(item => {
            if (this.val2 == item.handle) {
              this.namefont = item.name;
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.view {
  margin-bottom: 10px;
}
.tit {
  margin-bottom: 10px;
  text-align: center;

  font-size: 14px;
}
.te-setting-preview {
  background: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-bottom: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  width: 90%;
  height: 60px;
  margin: 0 auto;
  padding: 15px;
  box-sizing: border-box;
  p {
    max-width: 230px;
  }
}
.sel {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
}
.selectfont {
  width: 50%;
  .el-input.is-focus .el-input__inner {
    border-left: 0px solid #dcdfe6;
  }
}
.selectfont .el-input__inner {
  border-right: 0px;
}
.selfontshu /deep/ .el-input__inner {
  border-left: 0px;
}
.el-select /deep/ .el-input__inner:focus {
  // border-color: #3ca860;
}
.el-select /deep/ .el-input__inner {
  padding: 0%;
  padding-left: 5px;
  border-radius: 0;
}
.el-select /deep/ .el-input__suffix {
  display: none;
}
/deep/ .el-select .el-input.is-focus .el-input__inner {
  border: 1px solid #dcdfe6;
}
/deep/ .selfontshu {
  .el-input.is-focus .el-input__inner {
    border: 1px solid #dcdfe6;
    border-left: 0px solid #dcdfe6;
  }
}
</style>


