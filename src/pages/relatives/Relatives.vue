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
            <router-link :to="{ name: 'memberData', params: {mainId:'S'}}" tag="li" class="add-btn" v-if="relativeList.length<6">
              <i class="icon add-lg-icon"></i>
              <p>添加成员</p>
            </router-link>
          </ul>
        </div>
        <div class="panel-ft">
          <span class="label">绑定体控所</span>
          <span class="value" v-if="curMember">{{curMember.storename}}</span>
          <span class="handle">{{curMember&&curMember.storename?'更改':'绑定'}}</span>
        </div>
      </div>
      <div class="panel record-panel">
        <div class="panel-hd">
          <span class="title-text">健康档案</span>
        </div>
        <div class="panel-bd">
          <div class="cm-btn btn">
            <span class="icon-wrap"><i class="icon report-icon"></i></span>
            <p>体检报告</p>
          </div>
          <router-link  v-if='curMember' :to="{ name: 'memberData', params: {mainId:curMember.mainid,id:curMember.id}}" tag="div" class="cm-btn btn">
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
            <li>
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">预约单号</span>
                  <span class="value">12345678910</span>
                </div>
                <div class="info-row">
                  <span class="label">预约日期</span>
                  <span class="value">2018.10.25</span>
                </div>
                <div class="info-row">
                  <span class="label">预约套餐</span>
                  <span class="value">斑马鱼精选中老年体检套餐斑马鱼精选中老年体检套餐</span>
                </div>
                <div class="info-row">
                  <span class="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                  <span class="value">已付款</span>
                </div>
              </div>
            </li>
            <li>
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">预约单号</span>
                  <span class="value">12345678910</span>
                </div>
                <div class="info-row">
                  <span class="label">预约日期</span>
                  <span class="value">2018.10.25</span>
                </div>
                <div class="info-row">
                  <span class="label">预约套餐</span>
                  <span class="value">斑马鱼精选中老年体检套餐斑马鱼精选中老年体检套餐</span>
                </div>
                <div class="info-row">
                  <span class="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                  <span class="value">已付款</span>
                </div>
              </div>
            </li>
            <li>
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">预约单号</span>
                  <span class="value">12345678910</span>
                </div>
                <div class="info-row">
                  <span class="label">预约日期</span>
                  <span class="value">2018.10.25</span>
                </div>
                <div class="info-row">
                  <span class="label">预约套餐</span>
                  <span class="value">斑马鱼精选中老年体检套餐斑马鱼精选中老年体检套餐</span>
                </div>
                <div class="info-row">
                  <span class="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                  <span class="value">已付款</span>
                </div>
              </div>
            </li>
            <li>
              <div class="process">
                <div class="line"><i class="icon node-icon"></i></div>
              </div>
              <div class="msg">
                <div class="info-row">
                  <span class="label">预约单号</span>
                  <span class="value">12345678910</span>
                </div>
                <div class="info-row">
                  <span class="label">预约日期</span>
                  <span class="value">2018.10.25</span>
                </div>
                <div class="info-row">
                  <span class="label">预约套餐</span>
                  <span class="value">斑马鱼精选中老年体检套餐斑马鱼精选中老年体检套餐</span>
                </div>
                <div class="info-row">
                  <span class="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</span>
                  <span class="value">已付款</span>
                </div>
              </div>
            </li>
          </ul>
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
              defaultAvatar:require('../../images/common/default-avatar.png'),
              relativeList:[],
              curMember:null,
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
                this.curMember=this.relativeList[0];
                console.log('data:',data);
              }
            })
          },
          selectMember:function (item) {
            this.curMember=item;
          }
        },

        created: function () {
        },
        mounted: function () {
          this.getRelativeList();
        },

    };
</script>
