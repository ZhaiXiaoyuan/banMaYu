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
            <li :class="{'active':tabType=='draw'}" @click="tabType='draw'">改善指标图形对比</li>
            <li :class="{'active':tabType=='table'}" @click="tabType='table'">指标表格对比</li>
          </ul>
        </div>
        <div class="panel-bd" v-show="tabType=='draw'" style="width: 100%;overflow: hidden;">
          <div v-for="(entry,index) in improveList" :id="'abnormal'+entry.name" style="width: 90%;height: 6rem;margin: 0px auto;position: relative;"></div>
        </div>
        <div class="panel-bd" v-show="tabType=='table'">
          <p class="warn-tips" style="padding-top: 0rem;">红色数值表示该指标体检结果异常</p>
          <table>
            <tr>
              <td colspan="2">{{exam1.realname}}</td>
              <td>{{date2}}</td>
              <td>{{date1}}</td>
              <td class="status">趋势</td>
            </tr>
            <tr v-for="(entry,index) in tableData" :key="index">
              <td :rowspan="entry.length" class="p-name" v-if="entry.length">{{entry.pName}}</td>
              <td style="text-align: left;">{{entry.name}}</td>
              <td :class="{'warn':entry.result2=='异常'}">{{entry[date2]?entry[date2]:'/'}}</td>
              <td :class="{'warn':entry.result1=='异常'}">{{entry[date1]?entry[date1]:'/'}}</td>
              <td>
                <span  v-if="entry.compare=='-1'">降低<span  v-if="entry.valid=='1'">(有效)</span></span>
                <span  v-if="entry.compare=='0'">持平</span>
                <span  v-if="entry.compare=='1'">升高<span  v-if="entry.valid=='1'">(有效)</span></span>
                <span  v-if="entry.valid=='9'">/</span>
              </td>
            </tr>
          </table>
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
              improveList:[],
              entryList:[],
              tableData:[],
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
                Object.keys(data.data).forEach((pKey)=>{
                  let list=data.data[pKey];
                  let itemList=[];
                  this.entryList.push({
                    name:pKey,
                    list:itemList
                  })
                  Object.keys(list).forEach((key)=>{
                    itemList.push({pName:pKey,...list[key]});
                    if(list[key].valid=='1'){
                      this.improveList.push({key:key,...list[key]});
                    }
                  });
                });
                this.entryList.forEach((entry,index)=>{
                  entry.list.forEach((item,i)=>{
                    this.tableData.push({length:i==0?entry.list.length:null,...item});
                  })
                })
                setTimeout(()=>{
                  this.improveList.forEach((entry,index)=>{
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
                text: entry.name,
                top:'10',
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
                    color:'#333',
                    fontSize:'14',
                    align:'center',
                    position:'inside',
                  },
                  itemStyle:{

                  },
                  emphasis:{
                    label:{

                    }
                  },
                  data: [ [{
                    yAxis: entry.vmin,
                    name: '参考值：'+entry.vmin+'~'+entry.vmax,
                    itemStyle:{},
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
