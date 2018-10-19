<!--积分明细-->
<template>
    <div class="score">
      <div class="panel survey-panel">
        <p>我的积分</p>
        <p v-if="entryList.length>0">{{entryList[0].totalscore.split('.')[0]}}</p>
      </div>
      <div class="panel list-panel">
        <div class="panel-hd">
          <i class="icon score-min-icon"></i>
          <span class="title">积分明细</span>
        </div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="entry" v-for="(entry,index) in entryList" :key="entry.id">
              <div class="entry-bd">
                <div class="info">
                  <p class="title">{{entry.biztypeLabel}}</p>
                  <p class="sub">{{entry.createtime}}</p>
                </div>
                <div class="score">{{entry.pmflag=='P'?'+':'-'}}{{entry.score}}</div>
              </div>
              <div class="entry-ft">积分来源：{{entry.bizname}}</div>
            </li>
          </ul>
        </div>
      </div>
      <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .score{
    .survey-panel{
      background: #0091e0;
      text-align: center;
      font-size: 0.28rem;
      color: #fff;
      padding: 0.3rem 0.3rem;
      p+p{
        margin-top: 0.16rem;
        font-size: 0.32rem;
      }
    }
    .score-min-icon{
      display: inline-block;
      background: url("../../images/common/score-min-icon.png") no-repeat;
      width: 0.48rem;
      height: 0.48rem;
      background-size: 100% 100%;
    }
    .list-panel{
      background: none;
      padding: 0px;
      box-shadow: none;
      .panel-hd{
        display: flex;
        align-items: center;
        color: #0091e0;
        font-size: 0.32rem;
        padding: 0.2rem 0.3rem;
        border: none;

        .icon{
          margin-right: 0.1rem;
        }
      }
      .panel-bd{
        padding: 0rem 0.3rem;
        background: #fff;
      }
      .entry-list{
        >li{
          background: #fff;
          padding: 0.3rem 0rem;
          .entry-hd{
            font-size: 0.32rem;
            color: #333;
          }
          .entry-bd{
            display: flex;
            align-items: center;
            .title{
              font-size: 0.32rem;
              color: #333;
            }
            .sub{
              margin-top: 0.2rem;
              font-size: 0.28rem;
              color: #999;
            }
            .score{
              margin-left: auto;
              color: #0091e0;
              font-size: 0.32rem;
            }
          }
          .entry-ft{
            text-align: right;
            color: #0091e0;
            font-size: 0.28rem;
          }
          &+li{
            border-top: 1px solid #e5e5e5;
          }
        }
      }
    }
  }
</style>

<script>
    import Vue from 'vue'


    export default {
        components: {

        },
        data: function () {
            return {
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false
              },
              entryList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getList:function (isInit) {
            if(isInit){
              this.pager.pageNum = 1;
              this.entryList = [];
            }
            let pager={
              'pager.pageNumber':this.pager.pageNum,
              'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...pager
            }
            Vue.api.getScoreList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
                this.curEntry=this.entryList.find((item,i)=>{
                  return item.id==this.storeId;
                });
                console.log('this.entryList:',this.entryList);
              }
            })
          },
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getList(true);
        },

    };
</script>
