<template>
  <div class="qianjuproduct" :class="itemColorFun">
    <transition name="slide-fade">
      <div>
        <div class="pro">
          <div class="memu">
            <div style="width:100%;display:flex">
              <el-input
                class="inputsearch"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="name_value"
              ></el-input>
              <div style="margin-left:12px">
                <savebtn tit="搜索" @Fun="search"></savebtn>
              </div>
              <div style="margin-left:12px">
                <cancelbtn tit="清除" @Fun="clear"></cancelbtn>
              </div>
            </div>
            <div style="margin-left:12px">
              <savebtn tit="添加分类" @Fun="addDuct(null)"></savebtn>
            </div>
          </div>
          <div class="table" style=" padding-bottom: 0px;">
            <transition name="el-zoom-in-top">
              <div class="operation" v-if="menuShow">
                <div @click="AlldelInfo">删除</div>
              </div>
            </transition>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              header-row-class-name="headerTable"
            >
              <el-table-column width="100" type="selection" :selectable="checkboxT"></el-table-column>
              <!-- <el-table-column label="序号" width="100">
                <template slot-scope="scope">
                  <div style="padding-left:11px;">{{ scope.row.num }}</div>
                </template>
              </el-table-column>-->
              <el-table-column label="分类名称">
                <template slot-scope="scope">
                  <div
                    class="name"
                    :style="{'padding-left':scope.row.term_level == 2 ?'30px' : ''}"
                    @click="addDuct(scope.row)"
                  >{{ scope.row.term_name }}</div>
                </template>
              </el-table-column>
              <el-table-column label="产品数量" width="95">
                <template slot-scope="scope">
                  <div style="padding-left:11px;">{{scope.row.product_count}}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div :class="storeItemList.itemColor.id === '0' ? 'pagination_white' : 'pagination_black'">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="PageInfo.page"
            layout=" total,prev, pager, next, sizes, jumper"
            :total="PageInfo.count"
            background
            :popper-class="storeItemList.itemColor.id === '0' ?  'popper_white': 'popper_black'"
          ></el-pagination>
        </div>
      </div>
    </transition>
    <!-- 添加分类 -->
    <transition name="fade">
      <adddialog :dataInfo="modefl" v-if="dialogFormVisible" @sub="foromSub"></adddialog>
    </transition>
  </div>
</template>
<script>
import {
  ProductListproDuctterm,
  DelProductTerm,
  SearchProductListDuctterm
} from "../../apis/api";
export default {
  name: "productCategories",
  components: {
    adddialog: resolve =>
      require(["../../components/Product/fenlei.vue"], resolve),
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      menuShow: false,
      options: [],
      PageInfo: {},
      name_value: "",
      tableData3: [],
      multipleSelection: [],
      dialogFormVisible: false,
      modefl: null,
      delList: []
    };
  },
  created() {
    this.getInfoList();
  },
  methods: {
    //获取列表
    getInfoList() {
      
      ProductListproDuctterm().then(res => {
        this.tableData3 = res.data.data.product_term_list;
        this.PageInfo = res.data.data.page_info;
      });
    },
    //删除多个
    AlldelInfo() {
      let prames = {
        product_term_id_list: this.delList
      };
      DelProductTerm(prames).then(res => {
        this.$message({
          message: res.data.msg,
          type: res.data.type,
          customClass: "msgposition",
            center: true
        });
        this.getInfoList();
      });
    },
    handleSelectionChange(val) {
      if (val.length == 0) {
        this.menuShow = false;
      } else {
        this.menuShow = true;
      }
      let arr = [];
      val.forEach(element => {
        arr.push(element.id);
      });
      this.delList = arr;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.PageInfo.page = val;
      this.search();
    },
    //添加
    addDuct(val) {
      this.modefl = val;
      this.dialogFormVisible = true;
    },
    foromSub(val) {
      let Page = this.PageInfo.page;
      if (val !== 0) {
        this.search();
      }
      this.dialogFormVisible = false;
    },
    // 查询
    search() {
      let prams = {
        p: this.PageInfo.page,
        s_product_term_name: this.name_value
      };
      SearchProductListDuctterm(prams).then(res => {
        this.tableData3 = res.data.data.product_term_list;
        this.PageInfo = res.data.data.page_info;
      });
    },
    //回调勾选
    checkboxT(row, index) {
      if (row.product_count + row.term_son_count > 0) {
        return 0;
      } else {
        return 1;
      }
    },
    //清除
    clear() {
      this.name_value = "";
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "product_white";
        case "1":
          return "product_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.product {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  .memu {
    width: 100%;
    padding: 34px;
    padding-bottom: 16px;
    display: flex;
    .prodoctclass {
      margin-left: 12px;
      width: 240px;
    }
    .prodoctstats {
      width: 180px;
      margin-left: 12px;
    }
  }
}
</style>