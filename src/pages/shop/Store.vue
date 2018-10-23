<!--体控所-->
<template>
    <div class="store" :class="{'selector-page':pageType=='selector'}">
      <div class="cur-panel">
        <div class="item selected" v-if="curEntry">
          <div class="item-bd">
            <p class="title">当前绑定体控所：{{curEntry.fullname}}</p>
            <p>体控所地址：{{curEntry.addrdetail}}</p>
            <p>联系电话：{{curEntry.phone}}</p>
            <p>营业时间：{{curEntry.begintime+'-'+curEntry.endtime}}</p>
          </div>
        </div>
      </div>
      <div class="list-panel">
        <div class="panel-hd">全部体控所</div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="item" v-for="item in entryList" :key="item.id" :class="{'active':curEntry&&curEntry.id==item.id}" @click="pageType=='selector'&&select(item)">
              <div class="item-hd">
                <span class="status"><i class="icon"></i></span>
              </div>
              <div class="item-bd">
                <p class="title">{{item.fullname}}</p>
                <p>体控所地址：{{item.addrdetail}}</p>
                <p>联系电话：{{item.phone}}</p>
                <p>营业时间：{{item.begintime+'-'+item.endtime}}</p>
              </div>
              <div class="item-ft" v-if="!curEntry||curEntry.id!=item.id">
                <span class="cm-btn btn" @click="bind(item)">绑定</span>
              </div>
            </li>
          </ul>
          <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
        </div>
      </div>
      <div class="cm-btn-wrap">
        <div class="cmb-tn btn" @click="ok()">确&nbsp;&nbsp;定</div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'


    export default {
        components: {

        },
        data: function () {
            return {
              storeId:null,
              userId:null,
              productId:null,
              pageType:null,//selector:'选择器类型'
              curEntry:null,
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
            if(this.pageType!='selector'||!this.productId){
              Vue.api.getStoreList(params).then((resp)=>{
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
            }else{
              params.productid=this.productId;
              Vue.api.getStoreListByProductId(params).then((resp)=>{
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
            }
          },
          bind:function (item) {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.userId,
              storeid:item.id
            }
            let fb=this.operationFeedback({text:'绑定中...'});
            Vue.api.bindStore(params).then((resp)=>{
              if(resp.status=='success'){
                this.curEntry=item;
                fb.setOptions({type:'complete',text:'绑定成功'});
                this.$router.go(-1);
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            })
          },
          select:function (item) {
           this.curEntry=item;
          },
          ok:function () {
            localStorage.setItem('selectedStore',JSON.stringify(this.curEntry));
            this.$router.go(-1);
          }
        },

        created: function () {
        },
        mounted: function () {
          this.userId=this.$route.params.userId;
          this.storeId=this.$route.query.storeId;
          this.pageType=this.$route.query.pageType;
          this.productId=this.$route.query.productId;
          console.log('ddd:',document.referrer);
          if(this.userId&&this.$route.query.source=='relatives'){
            localStorage.setItem('curId',this.userId);
          }
          /**/
          this.getList();
        },

    };
</script>
