<template>
  <div class="addressAll" :class="itemColorFun">
    <span>
      <b class="warning"></b> 地址
    </span>
    <div class="city">
      <el-select
        v-model="cityone"
        placeholder="请选择"
        @change="SelectCity"
        :popper-class="`pop${storeItemList.itemColor.id}`"
      >
        <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select
        v-model="citytwo"
        :value-key="citytwo"
        placeholder="请选择"
        class="citytwo"
        @change="CitySel"
        :popper-class="`pop${storeItemList.itemColor.id}`"
      >
        <el-option v-for="item in cityp" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-input v-if="!addr" class="xiangxi" placeholder="请输入详细地址" v-model="text"></el-input>
    </div>
  </div>
</template>
<script>
import { CityList } from "../../apis/api";
export default {
  name: "addresscity",
  props: ["cityid", "provinceid", "province", "cityaddr", "citylist", "addr"],
  data() {
    return {
      value: "",
      cityone: "",
      cityoneid: "",
      citytwo: "",
      citytwoid: "",
      cityp: "",
      text: "",
      storeItemList: this.$store.getters
    };
  },
  methods: {
    SelectCity(val) {
      this.cityp = "";
      this.citytwo = "";
      this.province.forEach(element => {
        if (element.name === val) {
          this.cityone = element.name;
          this.cityoneid = element.id;
          CityList(element.id).then(res => {
            this.cityp = res.data.data.city_list;
          });
        }
      });
    },
    CitySel(val) {
      this.cityp.forEach(element => {
        if (element.name === val) {
          this.citytwo = element.name;
          this.citytwoid = element.id;
        }
      });
    }
  },
  watch: {
    provinceid() {
      this.province.forEach(element => {
        if (element.id === this.provinceid) {
          this.cityone = element.name;
          this.cityoneid = element.id;
        }
      });
    },
    cityid() {
      this.citylist.forEach(element => {
        if (element.id === this.cityid) {
          this.citytwo = element.name;
          this.citytwoid = element.id;
        }
      });
    },
    citylist() {
      this.cityp = this.citylist;
    },
    cityaddr(val) {
      this.text = val;
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "addressAll_white";
        case "1":
          return "addressAll_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less">
.addressAll {
  min-width: 500px;
  span {
    text-align: left;
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.45);
  }
  .city {
    display: flex;
    justify-content: start;
    .el-select {
      width: 260px;
      box-sizing: border-box;
      .el-input__inner {
        border: 1px solid rgba(0, 0, 0, 0.039);
        background: rgba(0, 0, 0, 0.02);
      }
      .is-focus {
        .el-input__inner {
          background: transparent;
        }
      }
    }
    .citytwo {
      margin: 0 12px;
      display: flex;
      justify-content: space-between;
    }
  }
  .xiangxi {
    // margin-top: 20px;
    width: 260px;
    .el-input__inner {
      border: 1px solid rgba(0, 0, 0, 0.039);
      background: rgba(0, 0, 0, 0.02);
    }
  }
  .xiangxi .el-input__inner:focus {
    background: transparent;
    // border: 1px solid #1ac257;
  }
  .xiangxi::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    opacity: 1;
    border-radius: 4px;
  }
}
.addressAll_black {
  span {
    color: rgba(255, 255, 255, 0.65);
  }
}
.addressAll_black /deep/ .city {
  .el-select {
    .el-input__inner {
      background: rgba(255, 255, 255, 0.06);
    }
  }
  .el-input__inner:focus {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
}
.addressAll_black .xiangxi .el-input__inner {
  background: rgba(255, 255, 255, 0.04);
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


