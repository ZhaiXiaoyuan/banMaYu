<!--体检报告-->
<template>
    <div class="report">
      <div class="panel user-panel">
        <div class="text-info">
          <div class="row">
            <span class="filed">报告对比人：</span>
            <div class="value">{{exam1.realname}}</div>
          </div>
          <div class="row">
            <span class="filed">对比体检报告：</span>
            <div class="value">
              <a :href="exam2.phyurl" target="_blank" class="cm-link-btn">{{exam2.phyname}}</a>
              <a :href="exam1.phyurl" target="_blank" class="cm-link-btn">{{exam1.phyname}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="panel entry-panel">
        <div class="panel-hd">
          <ul class="tab-list">
            <li :class="{'active':tabType=='draw'}" @click="tabType='draw'">异常指标图形对比</li>
            <li :class="{'active':tabType=='table'}" @click="tabType='table'">指标表格对比</li>
          </ul>
        </div>
        <div class="panel-bd" v-show="tabType=='draw'" style="width: 100%;overflow: hidden;">
          <div v-for="(entry,index) in abnormalList" :id="'abnormal'+entry.name" style="width: 90%;height: 6rem;margin: 0px auto;position: relative;"></div>
        </div>
        <div class="panel-bd" v-show="tabType=='table'">
          <div class="block">
            <div class="block-field" style="border-right: none;">&nbsp;</div>
            <div class="block-value">
              <div class="row">
                <span class="name" style="text-align: center;">{{exam1.realname}}</span>
                <span class="date">{{date2}}</span>
                <span class="date">{{date1}}</span>
                <span class="result">趋势</span>
              </div>
            </div>
          </div>
          <div class="block" v-for="(entry,index) in detail" :key="index">
            <div class="block-field">{{index}}</div>
            <div class="block-value">
              <div class="row" v-for="(item,i) in entry">
                <span class="name">{{i}}</span>
                <span class="date" :class="{'warn':item.result2=='异常'}">{{item[date2]}}</span>
                <span class="date" :class="{'warn':item.result1=='异常'}">{{item[date1]}}</span>
                <span class="result">
                  <span  v-if="item.compare=='-1'">降低</span>
                  <span  v-if="item.compare=='0'">持平</span>
                  <span  v-if="item.compare=='1'">升高</span>
                  <span  v-if="item.valid=='1'">(有效)</span>
                  <span  v-if="item.valid=='0'">(无效)</span>
                  <span  v-if="item.valid=='9'">(忽略)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .report{
    padding-bottom: 1.6rem;
    .panel{
      .panel-hd{
        .title-text{
          font-size: 0.38rem;
        }
      }
    }
    .user-panel{
      padding: 0.4rem 0.3rem;
      background: url("../../images/common/top-panel-bg.png") no-repeat;
      background-size: cover;
      .text-info{
        padding-left: 0.3rem;
        color: #fff;
        width: 100%;
        .cm-link-btn{
          display: block;
          color: #fff;
        }
        .row{
          display: flex;
          .filed{
            flex: 1;
            text-align: right;
          }
          .value{
            flex: 2;
          }
          &+.row{
            margin-top: 5px;
          }
        }
      }
    }
    .entry-panel{
      padding: 0rem;
      .panel-hd{
        padding-top: 0rem;
      }
      .panel-bd{
        min-height: 5rem;
        padding: 0.2rem 0rem 0.8rem 0rem;
      }
    }
    .tab-list{
      border-bottom: 1px solid #e5e5e5;
      width: 100%;
      li{
        padding: 10px 20px;
        display: inline-block;
        font-size: 0.32rem;
        color: #666;
        &.active{
          color: #0091e0;
          border-bottom: 1px solid #0091e0;
        }
      }
    }
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
        }
        .name{
          width: 100%;
        }
        .warn{
          color: #F56C6C;
        }
        .date{
          width: 25%;
        }
        .result{
          width: 40%;
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

    export default {
        components: {

        },
        data: function () {
            return {
              id:null,
              curItem:{},
              detail:{},
              exam1:{},
              exam2:{},
              date1:'',
              date2:'',
              abnormalList:[],
              tabType:'draw',//draw,table
            }
        },
        computed: {},
        watch: {},
        methods: {
          gerReportCompare:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.id,
            }
            Vue.api.gerReportCompare(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                this.exam1=data.exam1;
                this.exam2=data.exam2;
                this.date1=data.exam1.examdate;
                this.date2=data.exam2.examdate;
                this.detail=data.data;
                Object.keys(data.data).forEach((key)=>{
                  let list=data.data[key];
                  Object.keys(list).forEach((key)=>{
                    if(list[key].result1=='异常'){
                      this.abnormalList.push({key:key,...list[key]});
                    }
                  });
                });
                console.log('this.abnormalList:',this.abnormalList);
                setTimeout(()=>{
                  this.abnormalList.forEach((entry,index)=>{
                    this.drawLine(entry);
                  })
                },500);

              }else if(resp.code=='439999'){
                this.alert({
                  title:"温馨提示",
                  lock:true,
                  html:resp.message,
                  ok:()=>{
                    this.$router.go(-1);
                  },
                  cancel:()=>{
                    this.$router.go(-1);
                  },
                });
              }
            })
          },
          drawLine(entry){
            var myChart = echarts.init(document.getElementById('abnormal'+entry.name));

            // 指定图表的配置项和数据
            var option = {
              title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                data:['销量']
              },
              xAxis: {
                data: [entry.date2,entry.date1]
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [entry[entry.date2], entry[entry.date1]]
              }]
            };

            option = {
              title: {
                text: entry.name,
                top:'15',
                left:'center',
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                  interval:0
                },
                data: ['',entry.date2,entry.date1,'']
              },
              yAxis: {
                type: 'value',
                offset:-1,
                axisLabel:{

                },
                max: function(value) {
                  return value.max>entry.vmax?value.max:entry.vmax;
                }
              },
              series: [{
                itemStyle : { normal: {label : {show: true}}},
                data: ['',entry[entry.date2], entry[entry.date1],''],
                type: 'line',
                markArea: {
                  label:{
                    show:true,
                    color:'#fff',
                    fontSize:'14',
                    position:'inside'
                  },
                  emphasis:{
                    label:{

                    }
                  },
                  data: [ [{
                    yAxis: entry.vmin,
                    name: '参考值：'+entry.vmin+'~'+entry.vmax,
                  }, {
                    yAxis: entry.vmax
                  }]]
                }
              }],
              grid: {
                left: 60
              },
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
          }
        },

        created: function () {
        },
        mounted: function () {
          //
          this.id=this.$route.query.id?this.$route.query.id:null;
          //
          this.gerReportCompare();

        },

    };
</script>
