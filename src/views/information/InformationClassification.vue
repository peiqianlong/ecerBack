<template>
  <div class="qianjuproduct" :class="itemColorFun">
    <transition name="slide-fade">
      <div>
        <div class="pro">
          <div class="memu">
            <div style="width:100%;display:flex">
              <el-input
                class="inputsearch"
                placeholder="请输入分类名称"
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
            <div style="margin-left:56px">
              <savebtn tit="添加分类" @Fun="addDuct(null)"></savebtn>
            </div>
          </div>
          <div class="table" style=" padding-bottom: 0px;">
            <transition name="el-zoom-in-top">
              <div class="operation" v-if="menuShow">
                <div @click="delInfoArr">删除</div>
              </div>
            </transition>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              header-row-class-name="headerTable"
            >
              <el-table-column width="100" type="selection"></el-table-column>
              <el-table-column label="分类名称">
                <template slot-scope="scope">
                  <div class="name" @click="addDuct(scope.row)">{{ scope.row.term_name }}</div>
                </template>
              </el-table-column>
              <el-table-column label="更新时间" width="118">
                <template slot-scope="scope">
                  <div class="date">{{ scope.row.updated_date }}</div>
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
      <addinfodialog v-if="dialogFormVisible" @sub="foromSub" :dataInfo="dataInfo"></addinfodialog>
    </transition>
  </div>
</template>
<script>
import {
  ListNewsTerm,
  SearchNewListTerm,
  DelyNewsArrTerm
} from "../../apis/api";
export default {
  name: "InformationClassification",
  components: {
    addinfodialog: resolve =>
      require(["../../components/informationCon/addclassification"], resolve),
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      options: [],
      value: "",
      tableData3: [],
      dialogFormVisible: false,
      PageInfo: {
        count: 10,
        limit: 10,
        page: 1
      },
      dataInfo: null,
      delList: [],
      name_value: "",
      menuShow: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      ListNewsTerm().then(res => {
        // this.options = res.data.data.news_term_list;
        this.PageInfo = res.data.data.page_info;
        this.tableData3 = res.data.data.news_term_list;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.PageInfo.page = val;
      this.search();
    },
    addDuct(val) {
      this.dataInfo = val;
      this.dialogFormVisible = true;
    },
    foromSub(val) {
      this.search();
      this.dialogFormVisible = false;
    },
    //查询
    search() {
      let parms = {
        s_news_term_name: this.name_value,
        p: this.PageInfo.page
      };
      SearchNewListTerm(parms).then(res => {
        this.PageInfo = res.data.data.page_info;
        this.tableData3 = res.data.data.news_term_list;
      });
    },
    //清空
    clear() {
      debugger;
      this.name_value = "";
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
    delInfoArr(val) {
      if (val) {
        //单个删除
        let prames = {
          news_term_id_list: this.delList
        };
        DelyNewsArrTerm(prames).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
          this.getInfo();
        });
      } else {
        //批量删除
        let prames = {
          news_term_id_list: this.delList
        };
        DelyNewsArrTerm(prames).then(res => {
          this.$message({
            message: res.data.msg,
            type: res.data.type,
            customClass: "msgposition",
            center: true
          });
          this.getInfo();
        });
      }
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