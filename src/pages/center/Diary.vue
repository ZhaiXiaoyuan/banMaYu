<!--食用日记-->
<template>
    <div class="diary">
      <div class="panel info-panel">
        <div class="info-row">
          <span class="label">购买日期</span>
          <span class="value">{{diaryData.buydate}}</span>
        </div>
        <div class="info-row">
          <span class="label">签&nbsp;&nbsp;到&nbsp;&nbsp;率</span>
          <span class="value">{{diaryData.signs}}/{{diaryData.amount}}</span>
        </div>
        <div class="info-row">
          <span class="label" @click="showIntroduce()">食用日记说明<i class="icon question-icon"></i></span>
         <!-- <span class="value">{{diaryData.foodexplans}}</span>-->
        </div>
      </div>
      <div class="panel entry-panel">
        <div class="panel-hd">签到天数表</div>
        <div class="panel-bd">
          <ul  class="date-list">
            <li v-for="(item,index) in dateList" :key="item.dateStr" :class="{'waiting':item.status=='waiting','finish':item.status=='finish','missed':item.status=='missed','able':item.status=='able'}" @click="sign(item)">
              <p>{{item.dateStr}}</p>
              <p>{{index+1}}</p>
              <i class="icon waiting-icon"></i>
              <i class="icon finish-icon"></i>
              <i class="icon missed-icon"></i>
            </li>
          </ul>
        </div>
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
              curDate:new Date(),
              diaryData:{},
              dateList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getDiary:function () {
            let params={
              ...Vue.tools.sessionInfo(),
            }
            Vue.api.getDiary(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.diaryData=data;
            /*    this.diaryData.buydate='2018.10.1'*/
                console.log('this.diaryData:',this.diaryData);
                let buyDate=this.diaryData.buydate.replace(/\./g,"/");
                let startDate=new Date(buyDate);
                for(let i=1;i<=this.diaryData.amount;i++){
                  let date=new Date(new Date(buyDate).setDate(startDate.getDate()+i));
                  let gap=this.dateDiff(date,this.curDate);
                  let status=null;
                  //临时测试
               /*   if(gap<0){
                    status='waiting';
                  }else*/
                   /* if(gap>=0&&gap<=2){*/
                      if(gap<=40){
                    status='able';
                  }else{
                    status='missed';
                  }
                  let fullDateStr=this.formatDate(date,'yyyy-MM-dd');
                  if(this.diaryData.signinfo.indexOf(fullDateStr)>-1){
                    status='finish';
                  }
                  this.dateList.push({
                    date:date,
                    dateStr:date.getMonth()+1+'.'+date.getDate(),
                    fullDateStr:fullDateStr,
                    status:status,
                  });
                }
              }else{
                this.operationFeedback({type:'warn',text:'暂无食用日记数据！'});
              }
            })
          },
          dateDiff:function (sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
            var dateSpan,
              tempDate,
              iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = dateSpan;
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
          },
          sign:function (item) {
            let params={
              ...Vue.tools.sessionInfo(),
              id:this.diaryData.id,
              date:item.fullDateStr
            }
            let fb=this.operationFeedback({text:'取消中...'});
            Vue.api.sign(params).then((resp)=>{
              if(resp.status=='success'){
                item.status='finish';
                this.diaryData.signs++;
                fb.setOptions({type:'complete',text:resp.message});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
          showIntroduce:function () {
            this.alert({
              title:'食用日记说明',
              html:'<div style="text-align: left;">' +
              '<p>温馨提醒：</p>' +
              '<p>1.您的按时服用产品积分将被添加到主账户的共享积分中，不可随子账户进行转移。</p>'+
              '<p>2.食用日记只记录主用户日记。</p>'+
              '<p>3.主用户第一次购买产品日40天内，签到服用至少32天，可获得100积分。</p>'+
              '<p>4.服用说明：每日三餐前各1袋。</p>'+
              '<p>5.当天日期24点前可补签前2天内的日记。</p>'+
              '<p>6.本食用日记只记录栋食系列产品的食用记录。</p>'+
              '</div>'
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          this.getDiary();
          //
        },

    };
</script>
