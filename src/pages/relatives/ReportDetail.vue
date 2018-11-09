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
          <table>
            <tr>
              <td colspan="2">项目名称</td>
              <td>结果</td>
              <td>参考范围</td>
              <td class="status">指标情况</td>
            </tr>
            <tr v-for="(entry,index) in tableData" :key="index">
              <td :rowspan="entry.length" class="p-name" v-if="entry.length">{{entry.pName}}</td>
              <td style="text-align: left;">{{entry.entityattr}}</td>
              <td :class="{'warn':entry.result2=='异常'}">{{entry.avalue}}</td>
              <td>{{entry.standard}}</td>
              <td>{{entry.result}}</td>
            </tr>
          </table>
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
    table{
      border-left: 1px solid #e5e5e5;
      font-size: 0.24rem;
      text-align: center;
      tr{
        border-top: 1px solid #e5e5e5;
      }
      td{
        border-right: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        padding: 0.08rem 0.1rem;
      }
      .p-name{
        width: 0.4rem;
      }
      .warn{
        color: #F56C6C;
      }
      .status{
        width: 1.44rem;
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
              entryList:[],
              tableData:[],
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
             /*   console.log('this.detail:',this.detail);*/
                Object.keys(this.detail).forEach((pKey)=>{
                /*  console.log('pKey:',pKey);*/
                  let list= this.detail[pKey]
                  list.forEach((item,i)=>{
                    this.tableData.push({pName:pKey,length:i==0?this.detail[pKey].length:null,...item});
                  })
                });
                /*console.log('this.tableData:',this.tableData);*/
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
