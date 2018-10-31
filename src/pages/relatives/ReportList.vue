<!--体检报告列表-->
<template>
    <div class="report-list">
      <div class="page-content">
        <div class="page-bd">
          <ul class="entry-list">
            <li class="item" v-for="item in entryList" :key="item.id">
              <div class="entry-bd">
                <img :src="item.customerTouxiang?item.customerTouxiang:defaultAvatar">
                <div class="text">
                  <p class="title">{{item.customername}}（{{item.relative?item.relative:'本人'}}）</p>
                  <p class="desc">{{item.storename}}</p>
                  <p class="">{{item.examdate}}</p>
                </div>
              </div>
              <div class="entry-ft">
                <div @click="toDetail(item)" class="cm-btn btn">查看详情</div>
              </div>
            </li>
          </ul>
          <div class="cm-btn-wrap" style="position: static;margin-top: 0.4rem;">
            <div class="cm-btn btn">报告对比</div>
          </div>
        </div>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .report-list{
    .entry-list{
      li{
        padding: 0.3rem 0.3rem;
        background: #fff;
        .entry-bd{
          display: flex;
        }
        img{
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
        .text{
          width: 80%;
          margin-left: auto;
          padding-left: 0.2rem;
          line-height: 0.5rem;
          font-size: 0.28rem;
          color: #999;
        }
        .title{
          display: block;
          font-size: 0.32rem;
          color: #333;
          text-align: left;
          padding: 0rem 0.1rem;
        }
        .entry-ft{
          text-align: right;
          .btn{
            display: inline-block;
            height: 0.5rem;
            line-height: 0.5rem;
            background: #0091e0;
            font-size: 0.24rem;
            color: #fff;
            text-align: center;
            padding: 0rem 0.4rem;
            border-radius: 0.06rem;
          }
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
              id:null,
              defaultAvatar:require('../../images/common/default-avatar.png'),
              entryList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getList:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.id,
            }
            Vue.api.getReportList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.entryList=data;
                console.log('this.entryList233:',data);
              }
            })
          },
          toDetail:function (item) {
            localStorage.setItem(item.id,JSON.stringify(item));
            this.$router.push({ name: 'report', query: {id: item.id }});
          }
        },

        created: function () {
        },
        mounted: function () {
          this.id=this.$route.query.id;
          this.id=this.id?this.id:null;
          if(this.id){
            if(this.$route.query.source=='relatives'){
              localStorage.setItem('curId',this.id);
            }
          }else{

          }
          //
          this.getList();
        },

    };
</script>
