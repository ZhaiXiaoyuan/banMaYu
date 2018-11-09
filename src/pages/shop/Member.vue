<!--选择用户-->
<template>
    <div class="member-page selector-page">
      <div class="cur-panel">
        <div class="item selected" v-if="curEntry">
          <div class="item-bd">
            <p class="title">当前食用者：{{curEntry.realname}}</p>
            <p>可购买数量：{{curEntry.count}}</p>
            <p>可购买期限：{{curEntry.finaltime}}</p>
          </div>
        </div>
      </div>
      <div class="list-panel">
        <div class="panel-hd">全部用户</div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="item" v-for="item in entryList" :key="item.id" :class="{'active':curEntry&&curEntry.id==item.id,'cm-disabled':item.count==0}" @click="select(item)">
              <div class="item-hd">
                <span class="status"><i class="icon"></i></span>
              </div>
              <div class="item-bd">
                <p class="title">{{item.realname}}</p>
                <p>可购买数量：{{item.count}}</p>
                <p>可购买期限：{{item.finaltime}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
     <!-- <div class="cm-btn-wrap">
        <div class="cmb-tn btn" @click="ok()">确&nbsp;&nbsp;定</div>
      </div>-->
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
              id:null,
              userId:null,
              productId:null,
              curEntry:null,
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
          getList:function () {
            Vue.api.getUserFoodQualificationList({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.entryList=data;
                this.curEntry=this.entryList.find((item,i)=>{
                  return item.id==this.id;
                });
                console.log('this.entryList:',this.entryList);
              }
            })
          },
          select:function (item) {
           this.curEntry=item;
           this.ok();
          },
          ok:function () {
            localStorage.setItem('curMember',JSON.stringify(this.curEntry));
            this.$router.go(-1);
          }
        },

        created: function () {
        },
        mounted: function () {
          this.userId=this.$route.params.userId;
          this.id=this.$route.query.id;
          /**/
          this.getList();
        },

    };
</script>
