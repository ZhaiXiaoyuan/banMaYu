<!--亲友-->
<template>
    <div class="relatives">
      <div class="panel member-panel">
        <div class="panel-bd">
          <ul class="member-list">
            <li v-for="item in relativeList" :key="item.iid" :class="{'active':curMember&&(item.id==curMember.id)}" @click="selectMember(item)">
              <img :src="item.touxiang?item.touxiang:defaultAvatar">
              <p>{{item.realname}}</p>
            </li>
            <router-link :to="{ name: 'memberData', params: {mainId:'S'}}" tag="li" class="add-btn" v-if="relativeList.length<6&&userInfo.mainid=='M'">
              <i class="icon add-lg-icon"></i>
              <p>添加成员</p>
            </router-link>
          </ul>
        </div>
        <div class="panel-ft">
          <div class="ft-row" v-if="curMember&&curMember.mainid!='M'" >
            <span class="label">绑定关系</span>
            <span class="value">{{curMember.relative}}</span>
            <span class="cm-btn handle" v-if="curMember.id==userInfo.id" @click="unbindRelative()">解绑</span>
          </div>
          <div class="ft-row">
            <span class="label">绑定体控所</span>
            <span class="value" v-if="curMember">{{curMember.storename}}</span>
            <span v-if="curMember" @click="()=>{$router.push({  name:'store',params: { userId: curMember.id},query:{storeId:curMember.storeid,source:'relatives'}})}" class="handle" >{{curMember&&curMember.storename?'更改':'绑定'}}</span>
          </div>
        </div>
      </div>
      <div class="panel record-panel">
        <div class="panel-hd">
          <span class="title-text">健康档案</span>
        </div>
        <div class="panel-bd">
          <router-link v-if='curMember' :to="{ name: 'reportList', query: {id:curMember.id,source:'relatives'}}" class="cm-btn btn">
            <span class="icon-wrap"><i class="icon report-icon"></i></span>
            <p>体检报告</p>
          </router-link>
          <router-link  v-if='curMember' :to="{ name: 'memberData', params: {mainId:curMember.mainid,id:curMember.id},query:{source:'relatives'}}" tag="div" class="cm-btn btn">
            <span class="icon-wrap"><i class="icon data-icon"></i></span>
            <p>基本资料</p>
          </router-link>
        </div>
      </div>
      <div class="panel order-panel">
        <div class="panel-hd">
          <span class="title-text">体检预约</span>
        </div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li v-for="(entry,index) in entryList" :key="entry.id">
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">预约单号</span>
                  <span class="value">{{entry.code}}</span>
                </div>
                <div class="info-row">
                  <span class="label">预约日期</span>
                  <span class="value">{{entry.examdate}}</span>
                </div>
                <div class="info-row">
                  <span class="label">预约套餐</span>
                  <span class="value">{{entry.productname}}</span>
                </div>
                <div class="info-row">
                  <span class="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                  <span class="value">{{entry.statusLabel}}</span>
                </div>
              </div>
            </li>
          </ul>
          <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
        </div>
      </div>
      <nav-bar></nav-bar>
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
              userInfo:{},
              defaultAvatar:require('../../images/common/default-avatar.png'),
              relativeList:[],
              curMember:null,
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
          getRelativeList:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              'pager.pageSize':6,
              'pager.pageNumber':1
            }
            Vue.api.getRelativeList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.relativeList=data.result.reverse();
                //
                let curId=localStorage.getItem('curId');
                if(curId){
                  this.curMember=this.relativeList.find((item,i)=>{
                    return item.id==curId;
                  });
                  localStorage.clear('curId');
                }else{
                  this.curMember=this.relativeList[0];
                }
                this.getList(true);
                console.log('this.curMember:',this.curMember);
              }
            })
          },
          getSubAccountRelativeList:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              'pager.pageSize':6,
              'pager.pageNumber':1
            }
            Vue.api.getSubAccountRelativeList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.relativeList=data.result.reverse();
                this.curMember=this.relativeList[this.userInfo.mainid=='M'?0:1];
                this.getList(true);
              /*  console.log('data2:',data);*/
              }
            })
          },
          selectMember:function (item) {
            if(this.userInfo.mainid!='M'){
              return;
            }
            this.curMember=item;
            this.getList(true);
          },
          unbindRelative:function () {
            this.confirm({
              html:'确定解除与主账号的账号关系？',
              ok:()=>{
                let params={
                  ...Vue.tools.sessionInfo(),
                }
                let fb=this.operationFeedback({text:'解绑中...'});
                Vue.api.unbindRelative(params).then((resp)=>{
                  if(resp.status=='success'){
                    this.userInfo.mainid='M';
                    Vue.cookie.set('userInfo',JSON.stringify(this.userInfo),{ expires: '12h' });
                    fb.setOptions({type:'complete',text:'解绑成功'});
                    setTimeout(()=>{
                      window.location.reload();
                    },1000)
                  }else{
                    fb.setOptions({type:'warn',text:resp.message});
                  }
                })
              }
            });
          },
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
              id:this.curMember.id,
              ...pager
            }
            Vue.api.getPhysicalList(params).then((resp)=>{
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
          this.userInfo=Vue.cookie.get('userInfo')?JSON.parse(Vue.cookie.get('userInfo')):{};
          console.log('this.userInfo:',this.userInfo);
          //
          if(this.userInfo.mainid=='M'){
            this.getRelativeList();
          }else{
            this.getSubAccountRelativeList();
          }
        },

    };
</script>
