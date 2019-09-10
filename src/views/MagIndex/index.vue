<template>
  <div class="indexhome" :class="itemColorFun">
    <template v-if="showpage">
      <div class="header">SUMMER,欢迎使用ecer!</div>
      <div class="index">
        <div class="index-left">
          <div class="bg mysummun">
            <div class="mysummun_img">
              <div class="img">
                <img src="../../assets/img/temp.png" alt />
              </div>
              <div class="template_src">
                <p>我的樱花小店</p>
                <a
                  href="https://cauyuli.ecersite.com/mysite-05"
                >https://cauyuli.ecersite.com/mysite-05</a>
              </div>
            </div>
            <div class="mysummun_tit container-fluid">
              <div class="row">
                <div class="list col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="icon_img">
                    <i class="iconfont icon-yuming"></i>
                    <div class="yuming_tit">
                      <p>
                        域名：
                        <span>未连接</span>
                      </p>
                      <div class="btncli">
                        <span>已有域名连接</span>
                      </div>
                      <div class="btncli">
                        <span>新域名购买</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="icon_img">
                    <i class="iconfont icon-fabu"></i>
                    <div class="yuming_tit">
                      <p>
                        发布状态：
                        <span>未连接</span>
                      </p>
                      <div class="btncli">
                        <span>去发布</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="icon_img">
                    <i class="iconfont icon-fufeizhuanqu"></i>
                    <div class="yuming_tit">
                      <p>
                        域名：
                        <span>未连接</span>
                      </p>
                      <div class="btncli">
                        <span>我要升级</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index-right">
          <div class="bg">
            <div class="tit">为您推荐</div>
            <div class="list">
              <img src="../../assets/img/home_icon_maijiayi2@2x.png" alt />
              <p>买家易</p>
              <p>外贸电子商务整合营销服务</p>
            </div>
            <div class="list"></div>
            <div class="list"></div>
          </div>
        </div>
      </div>
      <!-- <div class="start container-fluid" style="margin-top:0;">
        <div class="tit">了解一下，ecer可以为您提供哪些服务吧！</div>
        <div class="row start_main">
          <div
            class="list col-lg-4 col-md-4 col-sm-6 col-xs-12"
            v-for=" (item , index) in content"
            :key="index"
          >
            <div class="main_logo">
              <img :src="itemColorFun === 'index_white' ? item.img2 : item.img" alt />
            </div>
            <div class="content_tit">{{item.tit}}</div>
            <div class="content_main">{{item.main}}</div>
            <div class="btn" :class="index ==0?'btn1':''" @click="Go(index)">{{item.btnconten}}</div>
          </div>
        </div>
      </div>
      <div class="start more container-fluid">
        <div class="tit">在这里，您可以找到更多和ecer同样优质的产品！</div>
        <div class="row start_main">
          <div
            class="list col-lg-4 col-md-4 col-sm-6 col-xs-12"
            v-for=" (item , index) in 3"
            :key="index"
          >
            <div class="Seller">
              <img
                v-if="itemColorFun !== 'index_white'"
                src="../../assets/img/home_icon_maijiayi2@2x.png"
                alt
              />
              <img v-else src="../../assets/img/home_icon_maijiayi@2x.png" alt />
            </div>
            <div class="content_main content_main2">“买家易”是宜选网为外贸企业提供的真正按效果付费的外贸电子商务整合营销服务。</div>
            <div class="btn btnliaojie">去了解</div>
          </div>
        </div>
      </div>
      <div class="footer start">
        <div class="tit">更多疑问</div>
        <ul class="listcontent">
          <li class="content" v-for="(i,n) in footercontent" :key="n">{{i}}</li>
        </ul>
      </div>-->
    </template>
    <template v-else>
      <div class="pageadd">
        <img src="../../assets/img/bg@2x.png" alt />
        <p>您还没有添加任何产品哦！马上开始添加，丰富您的产品库吧</p>
        <div class="btn btn1" @click="Go(0)">添加产品</div>
      </div>
    </template>
  </div>
</template>
<script>
import { ProductList } from "../../apis/api";
export default {
  name: "index",
  data() {
    return {
      footercontent: [
        "网站发布需要提前准备什么工作，具体步骤是怎么样，ecer帮助申请域名？",
        "如何选择适合自己的网站？",
        "如何进行网站编辑，具体的操作指南？",
        "网站发布需要提前准备什么工作？"
      ],
      showpage: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    Go(index) {
      if (index === 0) {
        this.$router.push("/producr/myProduct");
      } else if (index === 1) {
        this.$router.push("/WebsiteEditor");
      } else if (index === 2) {
      }
    },
    getlist() {
      ProductList().then(res => {
        if (res.data.data.product_list.length <= 0) {
          this.showpage = false;
        } else {
          this.showpage = true;
        }
      });
      let id = this.$route.params.type;
      if (id == ":b2b") {
        this.reload();
      }
    }
  },
  computed: {
    itemColorFun() {
      let id = this.$store.getters.itemColor.id;
      switch (id) {
        case "0":
          return "index_white";
        case "1":
          return "index_black";
        default:
          return;
      }
    }
  }
};
</script>
<style lang="less" scoped>
// 总体编辑
.indexhome {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .header {
    width: 100%;
    font-weight: 600;
    color: rgba(60, 168, 96, 1);
    opacity: 1;
    border-radius: 4px;
    text-align: left;
    position: relative;
    font-size: 28px;
    line-height: 28px;
    margin-bottom: 12px;
  }
  .index {
    display: flex;
    .index-left {
      flex: 1;
      .mysummun {
        .mysummun_img {
          display: flex;
          padding-bottom: 34px;
          border-bottom: 1px solid rgba(238, 238, 238, 1);
          .img {
            width: 372px;
            height: 228px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
            border-radius: 4px;
            padding: 12px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .template_src {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            text-align: left;
            p {
              margin: 0;
              padding-bottom: 8px;
              height: 28px;
            }
            a {
              display: block;
              height: 19px;
              font-size: 14px;
              font-weight: 400;
              line-height: 19px;
              color: rgba(60, 168, 96, 1);
              opacity: 1;
            }
          }
        }
        .mysummun_tit {
          padding-top: 33px;
          .list {
            padding: 0;
            .icon_img {
              display: flex;
              i {
                font-size: 32px;
                line-height: 64px;
                width: 64px;
                height: 64px;
                background: #eff9f4;
                border-radius: 50%;
                color: #3ca860;
              }
            }
          }
          .yuming_tit {
            margin-left: 16px;
            display: flex;
            flex-direction: column;
            p {
              text-align: left;
              font-size: 14px;
              font-weight: 600;
              line-height: 20px;
              color: rgba(17, 17, 17, 1);
              margin-bottom: 8px;
              span {
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                color: rgba(119, 119, 119, 1);
              }
            }
            .btncli {
              width: 100px;
              height: 28px;
              border: 1px solid rgba(60, 168, 96, 1);
              border-radius: 4px;

              padding: 0;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              span {
                font-size: 12px;
                font-weight: 400;
                line-height: 28px;
                color: rgba(60, 168, 96, 1);
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
              }
            }
            .btncli:nth-child(3) {
              margin-top: 8px;
            }
            .btncli:before {
              content: "";
              display: block;
              width: 0;
              height: 0;
              border-radius: 50%;
              position: absolute;
              background: rgba(32, 137, 67, 1);
              background: transparent\0;
              transition: all 200ms linear;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
            .btncli:hover {
              border: rgba(32, 137, 67, 1);
              span {
                color: #fff;
                // color: rgba(32, 137, 67, 1) \9;
              }
            }
            .btncli:hover::before {
              width: 100px;
              height: 100px;
              border-radius: 0%;
            }
          }
        }
      }
    }
    .index-right {
      width: 308px;
      margin-left: 16px;
      .tit {
        height: 28px;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: rgba(17, 17, 17, 1);
        opacity: 1;
        text-align: left;
      }
      .list {
        margin-top: 34px;
        img {
          width: 94px;
          height: 72px;
        }
        p: nth-child;
      }
    }
    .bg {
      padding: 34px;
      background-color: #fff;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
  }
  // .start {
  //   width: 100%;
  //   background: rgba(255, 255, 255, 1);
  //   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  //   opacity: 1;
  //   border-radius: 4px;
  //   margin-top: 16px;
  //   display: flex;
  //   flex-direction: column;
  //   padding: 34px;
  //   height: 380px\0;
  //   .tit {
  //     font-size: 20px;
  //     font-weight: 600;
  //     line-height: 28px;
  //     opacity: 1;
  //     text-align: left;
  //     margin-bottom: 16px;
  //     margin-left: 0;
  //     margin-right: 0;
  //   }

  //   .row {
  //     flex: 1;
  //     margin: 0;
  //     .list {
  //       height: 100%;
  //       padding: 0;
  //       padding: 0 34px;
  //       .main_logo {
  //         width: 60px;
  //         height: 60px;
  //         border-radius: 50%;
  //         margin: auto;
  //         margin-top: 10px;

  //         img {
  //           width: 100%;
  //           height: 100%;
  //         }
  //       }

  //       .content_tit {
  //         font-size: 16px;
  //         line-height: 22px;
  //         color: rgba(0, 0, 0, 0.85);
  //         font-weight: 600;
  //         margin-top: 34px;
  //         margin-bottom: 12px;
  //       }

  //       .content_main {
  //         width: 100%;
  //         font-size: 14px;
  //         height: 64px;
  //         font-weight: 400;
  //         line-height: 22px;
  //         color: rgba(0, 0, 0, 0.65);
  //         // min-height: 100px;
  //         overflow: hidden;
  //         text-overflow: ellipsis; //文本溢出显示省略号
  //         display: -webkit-box;
  //         -webkit-line-clamp: 4;
  //         -webkit-box-orient: vertical;
  //       }
  //       .content_main2 {
  //         height: 40px;
  //         -webkit-line-clamp: 2;
  //         height: 42px;
  //       }
  //       .btn {
  //         background: rgba(255, 255, 255, 1);
  //         border: 1px solid rgba(60, 168, 96, 1);
  //         color: rgba(60, 168, 96, 1);
  //         opacity: 1;
  //         border-radius: 4px;
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         margin: auto;
  //         font-size: 14px;
  //         width: 100px;
  //         height: 32px;
  //         line-height: 32px;
  //         // margin-bottom: 24px;
  //         margin-top: 34px;
  //         position: relative;
  //         z-index: 5;
  //         overflow: hidden;
  //       }
  //       .btn:before {
  //         content: "";
  //         display: block;
  //         width: 0;
  //         height: 0;
  //         border-radius: 50%;
  //         position: absolute;
  //         background: rgba(32, 137, 67, 1);
  //         background: transparent\0;
  //         z-index: -1;
  //         transition: all 200ms linear;
  //       }
  //       .btn:hover {
  //         color: #fff;
  //         color: rgba(32, 137, 67, 1) \9;
  //       }
  //       .btn:hover::before {
  //         width: 100px;
  //         height: 100px;
  //         border-radius: 0%;
  //       }
  //       .btn.active,
  //       .btn:active {
  //         box-shadow: none;
  //       }
  //       .btn1 {
  //         background: rgba(60, 168, 96, 1);
  //         color: #fff;
  //       }
  //     }
  //   }
  // }

  // .more {
  //   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  //   height: 314px\0;
  //   .row {
  //     .list {
  //       .Seller {
  //         width: 65px;
  //         height: 50px;
  //         margin: 10px auto 34px;

  //         img {
  //           width: 100%;
  //           height: 100%;
  //         }
  //       }

  //       .btnliaojie {
  //       }
  //     }
  //   }
  // }

  // .footer {
  //   width: 100%;
  //   background: rgba(255, 255, 255, 1);
  //   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  //   opacity: 1;
  //   border-radius: 4px;
  //   margin-top: 16px;
  //   margin-bottom: 20px;
  //   padding-bottom: 16px;
  //   .listcontent {
  //     margin: 0;
  //     padding-left: 0px;
  //     margin-top: 4px;
  //     display: flex;
  //     flex-wrap: wrap;
  //     .content {
  //       white-space: nowrap;
  //       height: 20px;
  //       width: 50%;
  //       min-width: 500px;
  //       flex-shrink: 0;
  //       font-size: 14px;
  //       font-weight: 400;
  //       line-height: 22px;
  //       color: rgba(0, 0, 0, 0.65);
  //       opacity: 1;
  //       margin-bottom: 8px;
  //       text-align: left;
  //       list-style: none;
  //       position: relative;
  //       padding-left: 8px;
  //     }
  //     .content::before {
  //       content: "";
  //       left: 0px;
  //       position: absolute;
  //       display: block;
  //       top: 50%;
  //       transform: translateY(-50%);
  //       width: 4px;
  //       height: 4px;
  //       background: rgba(60, 168, 96, 1);
  //       border-radius: 50%;
  //     }
  //   }
  // }
  .pageadd {
    margin-top: 104px;
    height: 100%;

    img {
      width: 360px;
      height: 252px;
    }
    p {
      width: 240px;
      height: 50px;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.65);
      margin: 32px auto 24px;
    }
    .btn {
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(60, 168, 96, 1);
      color: rgba(60, 168, 96, 1);
      opacity: 1;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      font-size: 14px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      // margin-bottom: 24px;
      margin-top: 34px;
      position: relative;
      z-index: 5;
      overflow: hidden;
    }
    .btn:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-radius: 50%;
      position: absolute;
      background: rgba(32, 137, 67, 1);
      z-index: -1;
      transition: all 200ms linear;
    }
    .btn:hover {
      // background: rgba(32, 137, 67, 1);
      // border: 1px solid transparent;
      color: #fff;
    }
    .btn:hover::before {
      width: 100px;
      height: 100px;
      border-radius: 0%;
    }
    .btn.active,
    .btn:active {
      box-shadow: none;
    }
    .btn1 {
      background: rgba(60, 168, 96, 1);
      color: #fff;
    }
  }
}

//黑色
.index_black {
  .header {
    color: rgba(26, 194, 87, 1);
  }
  .header,
  .start,
  .footer {
    box-shadow: none;
  }
  .start {
    background: rgba(34, 38, 67, 1);

    .tit {
      color: rgba(255, 255, 255, 1);
    }

    .row {
      .list {
        .content_tit {
          color: rgba(255, 255, 255, 0.85);
        }

        .content_main {
          color: rgba(255, 255, 255, 0.65);
        }

        .btn {
          background: rgba(34, 38, 67, 1);
          color: rgba(26, 194, 87, 1);
        }
        .btn1 {
          background: rgba(26, 194, 87, 1);
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .footer .listcontent .content {
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>


