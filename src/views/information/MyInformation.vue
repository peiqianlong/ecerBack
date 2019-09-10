<template>
  <div class="qianjuproduct" :class="itemColorFun" style="height:100%;">
    <transition name="slide-fade">
      <div v-if="isview" style="height:100%;">
        <div>
          <div class="pro">
            <div class="memu">
              <div style="width:100%;display:flex">
                <el-select
                  style="margin-left:0;"
                  v-model="value_id"
                  placeholder="请选择"
                  :popper-class="`pop${storeItemList.itemColor.id}`"
                  class="producrselect prodoctclass"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.term_name"
                    :value="item.id"
                  ></el-option>
                </el-select>

                <div style="margin-left:12px">
                  <savebtn tit="查询" @Fun="getInfo"></savebtn>
                </div>
                <div style="margin-left:12px">
                  <cancelbtn tit="清空" @Fun="clear"></cancelbtn>
                </div>
              </div>
              <div style="margin-left:56px">
                <savebtn tit="添加资讯" @Fun="addDuct(null)"></savebtn>
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
                <el-table-column type="selection" width="100"></el-table-column>

                <el-table-column label="标题">
                  <template slot-scope="scope">
                    <div class="name" @click="addDuct(scope.row)">{{ scope.row.news_title }}</div>
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
          <div
            :class="storeItemList.itemColor.id === '0' ? 'pagination_white' : 'pagination_black'"
          >
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
      </div>
    </transition>
    <!-- 添加 -->
    <transition name="slide-fade">
      <div v-if="!isview">
        <addinformation :dataInfo="dataInfo" @clear="back"></addinformation>
      </div>
    </transition>
  </div>
</template>
<script>
import { SearchNewList, DelyNewsArr } from "../../apis/api";
export default {
  name: "MyInformation",
  components: {
    addinformation: resolve =>
      require(["../../components/informationCon/addinformation"], resolve),
    savebtn: resolve =>
      require(["../../components/input/savebtn.vue"], resolve),
    cancelbtn: resolve =>
      require(["../../components/input/cancelbtn.vue"], resolve)
  },
  data() {
    return {
      storeItemList: this.$store.getters,
      options: [],
      value_id: "",
      tableData3: [],
      dialogFormVisible: false,
      isview: true,
      PageInfo: {
        count: 10,
        limit: 10,
        page: 1
      },
      delList: [],
      dataInfo: null,
      menuShow: false
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      let prams = {
        s_term_id: this.value_id,
        p: this.PageInfo.page
      };
      SearchNewList(prams).then(res => {
        this.value_id = res.data.data.news_term_list[0].id;
        this.options = res.data.data.news_term_list;
        this.PageInfo = res.data.data.page_info;
        this.tableData3 = res.data.data.news_list;
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
      this.PageInfo.page = val;
      this.getInfo();
    },
    addDuct(val) {
      this.dataInfo = val;
      this.isview = false;
    },
    back() {
      this.isview = true;
      this.getInfo();
    },
    //清空
    clear() {
      this.value_id = "";
    },
    //删除
    delInfoArr(val) {
      debugger;
      if (val) {
        //单个删除
        let prames = {
          news_id_list: this.delList
        };
        DelyNewsArr(prames).then(res => {
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
          news_id_list: this.delList
        };
        DelyNewsArr(prames).then(res => {
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

<style scoped lang="less" >
</style>

