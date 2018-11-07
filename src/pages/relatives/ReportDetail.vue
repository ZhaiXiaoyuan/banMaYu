<!--体检报告-->
<template>
    <div class="report report-detail">
      <div class="panel user-panel">
        <img :src="curItem.customerTouxiang?curItem.customerTouxiang:defaultAvatar">
        <div class="text-info">
          <p class="name">{{curItem.customername}}</p>
          <p class="result">体检体控所：<span>{{curItem.storename}}</span>项</p>
          <p class="time">体检时间：{{curItem.examdate}}</p>
        </div>
      </div>
      <div class="panel entry-panel">
        <div class="panel-bd">
          <div class="block" v-for="(entry,index) in detail" :key="index">
            <div class="block-field">{{index}}</div>
            <div class="block-value">
              <div class="row">
                <span class="name">项目名称</span>
                <span class="num">结果</span>
                <span class="range">参考范围</span>
                <span class="result">指标情况</span>
              </div>
              <div class="row" v-for="(item,i) in entry">
                <span class="name">{{item.entityattr}}</span>
                <span class="num">{{item.avalue}}</span>
                <span class="range">{{item.standard}}</span>
                <span class="result">{{item.result}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .entry-panel{
    box-shadow: none;
    .panel-hd{
      padding-top: 0.3rem !important;
    }
    padding: 0rem !important;
    .text-info{

    }
  }
  .report-detail{
    .block{
      display: flex;
      font-size: 0.24rem;
      .block-field{
        display: flex;
        align-items: center;
        width: 5%;
        padding: 0.04rem 0.08rem;
        border-right: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
      }
      .block-value{
        width: 100%;
      }
      .row{
        display: flex;
        >span{
          padding: 0.06rem 0.08rem;
          border-bottom: 1px solid #e5e5e5;
          border-right: 1px solid #e5e5e5;
          word-break: break-all;
        }
        .name{
          width: 100%;
        }
        .warn{
          color: #F56C6C;
        }
        .num{
          width: 25%;
        }
        .range{
          width: 40%;
        }
        .result{
          width: 32%;
          text-align: center;
        }
      }
      &:first-child{
        border-top: 1px solid #e5e5e5;
      }
    }
  }
</style>

<script>
    import Vue from 'vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        components: {

        },
        data: function () {
            return {
              defaultAvatar:require('../../images/common/default-avatar.png'),
              curItem:{},
              detail:{},
              link:null,
              picLink:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getDetail:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.curItem.id,
              type:'all',
            }
            Vue.api.getReportDetail(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.detail=data;
                console.log('this.detail:',this.detail);
              }
            })
          },
        },

        created: function () {
        },
        mounted: function () {
          this.curItem=JSON.parse(localStorage.getItem(this.$route.query.id));
          console.log('this.curItem:',this.curItem);
          this.getDetail();
        },

    };
</script>
