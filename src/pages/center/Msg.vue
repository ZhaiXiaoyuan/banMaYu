<!--消息中心-->
<template>
    <div class="msg">
      <div class="panel">
        <div class="panel-hd">
          <i class="icon msg-icon"></i>
          <span class="title">消息中心</span>
        </div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="entry">
              <div class="entry-hd">水电费几十块的房间</div>
              <div class="entry-bd">sfdjsjdflajjsdfajsdjf时代峻峰老是觉得斐林试剂砥砺奋进圣诞节反倒是</div>
              <div class="entry-ft">1231231</div>
            </li>
          </ul>
          <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .msg{
    .msg-icon{
      display: inline-block;
      background: url("../../images/common/msg-icon.png") no-repeat;
      width: 0.48rem;
      height: 0.48rem;
      background-size: 100% 100%;
    }
    .panel{
      background: none;
      padding: 0px;
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
        padding: 0.2rem 0.3rem;
        background: #fff;
      }
      .entry-list{
        >li{
          background: #fff;
          padding: 0.2rem 0.3rem;
          .entry-hd{
            font-size: 0.32rem;
            color: #333;
          }
          .entry-bd{
            font-size: 0.28rem;
            color: #666;
            padding: 0.1rem 0rem;
            line-height: 0.44rem;
            text-indent: 2em;
          }
          .entry-ft{
            text-align: right;
            color: #333;
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
              lng:null,
              lat:null,
              ...pager
            }
            Vue.api.getMsgList(params).then((resp)=>{
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
