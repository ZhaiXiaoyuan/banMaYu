<!--体检预约-->
<template>
    <div class="physical-list">
      <div class="page-content">
        <div class="page-hd">
          <span class="title">请选择体检套餐</span>
          <router-link tag="span" :to="{ name: 'myOrder', query: {pageType:'20'}}" class="cm-btn btn link-btn">我的体检预约</router-link>
        </div>
        <div class="page-bd">
          <ul class="entry-list">
            <router-link tag="li" :to="{ name: 'goodsDetail', params: {type:'physical',id: item.id }}" class="item" v-for="item in entryList" :key="item.id">
              <div class="text">
                <p class="title">{{item.name}}</p>
                <p class="desc">{{item.introduce}}</p>
                <p class="price"><span class="icon">￥</span><span>{{item.price.toFixed(2)}}</span></p>
              </div>
              <img :src="item.pic1">
            </router-link>
          </ul>
        </div>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .physical-list{
    .page-hd{
      padding: 0.4rem 0.3rem 0.2rem 0.3rem;
      .title{
        font-size: 0.32rem;
        color: #000;
      }
      .link-btn{
        float: right;
        font-size: 0.32rem;
        color:#0091e0;
        text-decoration: underline;
      }
    }
    .entry-list{
      li{
        display: flex;
        padding: 0.4rem 0.3rem;
        background: #fff;
        .text{
          width: 55%;
        }
        .title{
          margin-top: 0.2rem;
          display: block;
          font-size: 0.32rem;
          color: #333;
          min-height: 0.6rem;
          text-align: left;
          padding: 0rem 0.1rem;
        }
        .price{
          margin-top: 0.4rem;
          font-size: 0.34rem;
          color: #f8664c;
          padding:0rem 0.1rem 0.2rem 0.1rem;
          text-align: left;
          .icon{
            position: relative;
            top:0.04rem;
            font-size: 0.26rem;
          }
        }
        img{
          margin-left: auto;
          width: 3rem;
          height: 3rem;
        }
        &+li{
          border-top:1px solid #e5e5e5;
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
                pageSize: 50,
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
            Vue.api.getPhysicalGoodsList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
                console.log('this.entryList:',this.entryList);
              }
            })
          },
        },

        created: function () {
        },
        mounted: function () {
          this.getList(true);
        },

    };
</script>
