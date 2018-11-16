<!--商品搜索-->
<template>
    <div class="shop search">
      <div class="page-content">
        <div class="search-box">
          <div class="input-item">
            <i class="icon search-icon" @click="search()"></i>
            <input type="text" v-model="keyword" @keypress="enterSearch"  placeholder="搜索全部商品">
          </div>
        </div>
        <div class="product-panel">
          <div class="panel-hd">
            <div class="condition-block">
              <div class="row">
                <span class="label">类型：</span>
                <div class="value">
                  <ul>
                    <li :class="{'active':type==''}" @click="setType('')">全部</li>
                    <li :class="{'active':type=='Physical'}" @click="setType('Physical')">体控检测</li>
                    <li :class="{'active':type=='Food'}" @click="setType('Food')">栋食产品</li>
                    <li :class="{'active':type=='Health'}" @click="setType('Health')">健康产品</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-bd">
            <div class="item-list">
              <router-link :to="{ name: 'goodsDetail', params: {type:(item.type?item.type:type).toLowerCase(),id: item.id }}" class="item" v-for="(item,index) in entryList" :key="item.id">
                <img :src="item.pic1">
                <p class="title">{{item.name}}</p>
                <p class="price"><span class="icon">￥</span><span>{{item.price.toFixed(2)}}</span></p>
              </router-link>
            </div>
          </div>
        </div>
        <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
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
              keyword:null,
              type:'',//'':所有,Physical:体检套餐,Food:栋食产品,Health:健康产品
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
              name:this.keyword,
              type:this.type,
              ...pager
            }
            Vue.api.getGoodsList(params).then((resp)=>{
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
          setType:function (value) {
            this.type=value;
            this.getList(true);
          },
          search:function () {
            this.type='';
            this.getList(true);
          },
          enterSearch:function (event) {
            if (event.keyCode == 13) { //如果按的是enter键 13是enter
              event.preventDefault(); //禁止默认事件（默认是换行）
              this.search();
            }
          }
        },

        created: function () {
        },
        mounted: function () {
          //
          let keyword=this.$route.query.keyword;
          let type=this.$route.query.type;
          if(keyword&&keyword!='undefined'){
            this.keyword=keyword;
          }
          if(type&&type!='undefined'){
            this.type=type;
          }
          //
          this.getList(true);
        },

    };
</script>
