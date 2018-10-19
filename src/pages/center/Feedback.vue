<!--意见反馈-->
<template>
    <div class="feedback">
      <div class="panel">
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="entry" v-for="(entry,index) in entryList" :key="entry.id">
              <div class="entry-bd">
            <!--    <p>反馈对象：</p>-->
                <p>反馈内容：{{entry.content}}</p>
                <p>反馈时间：{{entry.createtime}}</p>
                <p v-if="entry.replyinfo">回复内容：{{entry.replyinfo}}</p>
                <p v-if="entry.replytime">回复时间：{{entry.replytime}}</p>
              <!--  <i class="icon del-icon cm-btn" @click="deleteFeedback(index)"></i>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
      <div class="cm-btn-wrap">
        <router-link tag="div" :to="{ name: 'addFeedback', params: {}}" class="cmb-tn btn">新增反馈</router-link>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .feedback{
    padding-bottom: 1.6rem;
    .panel{
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
        padding: 0rem;
      }
      .entry-list{
        padding-top: 0.4rem;
        >li{
          position: relative;
          display: flex;
          background: #fff;
          padding: 0.2rem 0.3rem;
          font-size: 0.28rem;
          color: #333;
          line-height: 0.44rem;
          box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
          .icon{
            position: absolute;
            top:-0.24rem;
            right: 0.1rem;
            width: 0.56rem;
            height: 0.56rem;
          }
          &+li{
            margin-top: 0.3rem;
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
            Vue.api.getFeedbackList(params).then((resp)=>{
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
          deleteFeedback:function (index) {
            let fb=this.operationFeedback({text:'删除中...'});
            let params={
              ...Vue.tools.sessionInfo(),
             id:this.entryList[index].id
            }
            Vue.api.deleteFeedback(params).then((resp)=>{
              if(resp.status=='success'){
                this.entryList.splice(index,1);
                if(this.entryList.length==0){
                  this.getList(true);
                }
                fb.setOptions({type:'complete',text:'删除成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getList(true);
        },

    };
</script>
