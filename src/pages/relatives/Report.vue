<!--体检报告-->
<template>
    <div class="report">
      <div class="panel user-panel">
        <img :src="curItem.customerTouxiang?curItem.customerTouxiang:defaultAvatar">
        <div class="text-info">
          <p class="name">{{curItem.customername}}（{{curItem.relative?curItem.relative:'本人'}}）</p>
          <p class="result">您本次体检共有异常指标<span>{{detail.length}}</span>项</p>
          <p class="time">体检时间：{{curItem.examdate}}</p>
        </div>
      </div>
      <div class="panel entry-panel">
        <div class="panel-hd">
          <span class="title-text">主要异常指标</span>
        </div>
        <div class="panel-bd">
          <ul class="entry-list" v-if="detail.length>0">
            <li v-for="(item,index) in detail" :key="index">
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">{{item.name}}{{item.result}} </span>
                  <span class="value">{{item.avalue}}</span>
                </div>
                <div class="info-row">
                  <span class="label">正常范围</span>
                  <span class="value">{{item.range}}{{item.unit}}</span>
                </div>
              </div>
            </li>
          </ul>
          <p v-if="detail.length==0" style="text-align: center;padding: 20px;">无异常指标</p>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn">查看完整体检报告</div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
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
            }
        },
        computed: {},
        watch: {},
        methods: {
          getDetail:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.curItem.id
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
