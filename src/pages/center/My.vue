<!--我的-->
<template>
    <div class="my">
      <div class="panel user-panel">
        <div class="panel-bd">
          <img :src="userData.touxiang?userData.touxiang:defaultAvatar">
          <p class="name">{{userData.realname}}</p>
          <div class="data-row">
            <div class="item"><i class="icon diamond-icon"></i><span>{{'初级会员'}}</span></div>
            <div class="item"><i class="icon score-icon"></i><span>积分{{userData.score?userData.score:0}}</span></div>

          </div>
        </div>
        <router-link :to="{name:'store',params: { userId: userData.id},query:{storeId:userData.storeid}}" tag="div" class="panel-ft">
          <span class="label">关联体控所</span>
          <span class="value" v-if="userData.storename">{{userData.storename}}</span>
          <span class="cm-btn handle" v-if="!userData.storename">前往绑定</span>
        </router-link>
      </div>
      <div class="panel list-panel">
        <ul class="entry-list">
          <router-link :to="{ name: 'memberData', params: {id: userData.id,mainId:'M'}}" tag="li">
            <span class="icon-wrap"><i class="icon data-min-icon"></i></span>
            <p>基本资料</p>
          </router-link>
          <router-link :to="{ name: 'search', params: {},query:{type:'Physical'}}" tag="li">
            <span class="icon-wrap"><i class="icon stethoscope-min-icon"></i></span>
            <p>体检预约</p>
          </router-link>
          <router-link :to="{ name: 'score', params: {}}" tag="li">
            <span class="icon-wrap"><i class="icon score-lg-icon"></i></span>
            <p>积分明细</p>
          </router-link>
          <router-link tag="li" :to="{ name: 'myOrder', query: {pageType:'10'}}">
            <span class="icon-wrap"><i class="icon order-icon"></i></span>
            <p>历史订单</p>
          </router-link>
          <li>
            <span class="icon-wrap"><i class="icon report-min-icon"></i></span>
            <p>体检报告</p>
          </li>
          <router-link tag="li" :to="{ name: 'diary', params: {}}">
            <span class="icon-wrap"><i class="icon diary-icon"></i></span>
            <p>食用日记</p>
          </router-link>
          <router-link :to="{ name: 'msg', params: {}}" tag="li">
            <span class="icon-wrap"><i class="icon msg-icon"></i></span>
            <p>消息中心</p>
          </router-link>
          <router-link :to="{ name: 'feedback', params: {}}" tag="li">
            <span class="icon-wrap"><i class="icon feedback-icon"></i></span>
            <p>意见反馈</p>
          </router-link>
          <li>
            <span class="icon-wrap"><i class="icon about-icon"></i></span>
            <p>关于我们</p>
          </li>
          <li>
            <span class="icon-wrap"><i class="icon add-member-icon"></i></span>
            <p>邀请好友</p>
          </li>
        </ul>
      </div>
      <nav-bar></nav-bar>
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
              defaultAvatar:require('../../images/common/default-avatar.png'),
              userData:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          getMyData:function () {
            Vue.api.getMyData({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.userData=JSON.parse(resp.message);
                console.log('this.userData:',this.userData);
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          this.getMyData();
        },

    };
</script>
