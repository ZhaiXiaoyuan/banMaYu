<!--地址管理-->
<template>
    <div class="address">
      <div class="panel cur-panel">
        <div class="address-item active" v-if="curEntry">
          <div class="status"><i class="icon selected-icon"></i></div>
          <div class="text-info">
            <p><span>{{curEntry.username}}</span>&nbsp;&nbsp;<span>{{curEntry.mobilephone|phoneTextFormat}}</span></p>
            <p>{{curEntry.detail}}</p>
          </div>
        </div>
      </div>
      <div class="panel list-panel">
        <div class="panel-hd">我的历史收货地址</div>
        <div class="panel-bd">
          <div class="address-item" v-for="(item,index) in entryList" :key="item.id">
            <div class="status" @click="select(item)"><i class="icon selected-icon"></i></div>
            <div class="text-info" @click="select(item)">
              <p><span>{{item.username}}</span>&nbsp;&nbsp;<span>{{item.mobilephone|phoneTextFormat}}</span></p>
              <p>{{item.detail}}</p>
            </div>
            <div class="handle">
              <span class="cm-btn btn" @click="editAddress(item)">编辑</span>
              <span class="cm-btn btn" @click="deleteAddress(item)" v-if="defaultEntry.id!=item.id">默认</span>
              <span class="cm-btn btn del-btn" @click="deleteAddress(index)">删除</span>
            </div>
            <i class="icon default-icon" v-if="defaultEntry.id==item.id"></i>
          </div>
        </div>
        <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn btn" @click="addressModalFlag=true">新增收货地址</div>
      </div>

      <mt-popup
        v-model="addressModalFlag"
        position="right" class="address-modal">
        <div class="modal-content">
          <div class="modal-header">
            {{addressModalType=='edit'?'编辑':'新建'}}收货人
          </div>
          <div class="modal-body">
            <div class="item">
              <div class="label">收货人</div>
              <div class="value">
                <input type="text" v-model="addressForm.username" placeholder="请输入姓名">
              </div>
            </div>
            <div class="item">
              <div class="label">联系方式</div>
              <div class="value">
                <input type="text" v-model="addressForm.mobilephone" placeholder="请输入手机号码">
              </div>
            </div>
            <div class="item" @click="regionPickerModalOptions.show=true">
              <div class="label">国家地区</div>
              <div class="value">
                <input type="text" v-model="addressForm.pcdname" readonly placeholder="请选择">
              </div>
            </div>
            <div class="item textarea-item">
              <div class="label">详细地址</div>
              <div class="value">
                <textarea cols="30" rows="10" v-model="addressForm.detail" placeholder="请输入详细收货地址"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="btn-list">
              <div class="cm-btn btn cancel-btn" @click="closeAddressForm()">返回</div>
              <div class="cmb-tn btn" @click="saveAddress()">保存</div>
            </div>
          </div>
        </div>
      </mt-popup>

      <region-picker :options="regionPickerModalOptions" ref="regionPicker"></region-picker>

    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .address-modal{
    width: 100%;
    height: 100%;
    .modal-content{
      position: relative;
      width: 100%;
      height: 100%;
    }
    .modal-header{
      padding: 0.2rem 0.3rem;
      border-bottom: 1px solid #e5e5e5;
      background: #fafafa;
      text-align: center;
    }
    .modal-body{
      padding-bottom: 1.2rem;
      .item{
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        padding: 0rem 0.3rem;
        border-bottom:1px solid #eee;
        .label{
          color: #333;
          flex: 1;
        }
        .value{
          margin-left: auto;
          color: #333;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 3;
          input{
            width: 100%;
            height: 0.88rem;
            text-align: right;
            border: none;
            outline: none;
            color: #333;
          }
        }
        &+.item{
          /*border-top:1px solid #eee;*/
        }
      }
      .textarea-item{
        padding: 0.3rem 0rem;
        flex-direction: column;
        align-items: flex-start;
        .label{
          width: 100%;
          color: #333;
          padding: 0rem 0.3rem;
        }
        .value{
          margin-top: 0.2rem;
          width: 100%;
          textarea{
            padding: 0.2rem 0.3rem;
            width: 100%;
            height: 1.6rem;
            border: none;
            outline: none;
            color: #333;
            resize: none;
            border-top:1px solid #eee;
          }
        }
      }
    }
    .modal-footer{
      position: absolute;
      width: 100%;
      left: 0rem;
      bottom: 0rem;
      .btn-list{
        margin-left: auto;
        display: flex;
      }
      .btn{
        flex: 1;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 0.32rem;
        color: #fff;
        background: linear-gradient(to right, #0091e0 , #017ecc);
      }
      .cancel-btn{
        color: #999;
        border:1px solid #ddd;
        background: none;
      }
    }
  }
</style>

<script>
    import Vue from 'vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import RegionPicker from '../../components/RegionPicker'

    export default {
        components: {
          RegionPicker
        },
        data: function () {
            return {
              curEntry:null,
              defaultEntry:null,
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false
              },
              entryList:[],
              addressModalFlag:false,
              addressModalType:'add',
              addressForm:{
                pcdname:null,
              },
              selectedProvince:null,
              selectedCity:null,
              selectedArea:null,
              regionPickerModalOptions:{
                show:false,
                default:null,//{provinceCode:'130000',cityCode:'130200',areaCode:'130205'},
                ok:(data)=>{
                  console.log('data:',data);
                  this.addressForm.pcdname='';
                  if(data.province){
                    this.selectedProvince=data.province;
                    this.addressForm.pcdname+=data.province.label;
                  }
                  if(data.city){
                    this.selectedCity=data.city;
                    this.addressForm.pcdname+=data.city.label;
                  }
                  if(data.area){
                    this.selectedArea=data.area;
                    this.addressForm.pcdname+=data.area.label;
                  }
                  console.log('this.addressForm:',this.addressForm);
                }
              }
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
              lng:null,
              lat:null,
              ...pager
            }
            Vue.api.getAddressList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
              }
            })
          },
          select:function (item) {
            this.curEntry=item;
            localStorage.setItem('selectedAddress',JSON.stringify(this.curEntry));
            this.$router.go(-1);
          },
          editAddress:function (item) {
            this.addressModalFlag=true;
            this.addressModalType='edit';
            this.addressForm={...this.addressForm,...item}
            this.$refs.regionPicker.setDefault({provinceCode:item.procode,cityCode:item.citycode,areaCode:item.distcode});
            this.addressForm.pcdname=item.pcdname;
          },
          closeAddressForm:function () {
            this.addressForm={
              pcdname:null,
            };
            this.selectedProvince=null;
            this.selectedCity=null;
            this.selectedArea=null;
            this.addressModalFlag=false;
          },
          saveAddress:function () {
            if(!this.addressForm.username){
              this.operationFeedback({type:'warn',text:'请输入姓名'});
              return;
            }
            if(!this.addressForm.mobilephone){
              this.operationFeedback({type:'warn',text:'请输入手机号码'});
              return;
            }
            if(!this.addressForm.pcdname){
              this.operationFeedback({type:'warn',text:'请输入国家地区'});
              return;
            }
            if(!this.addressForm.detail){
              this.operationFeedback({type:'warn',text:'请输入详细收货地址'});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              username:this.addressForm.username,
              mobilephone:this.addressForm.mobilephone,
              procode:this.selectedProvince.value,
              citycode:this.selectedCity.value,
              distcode:this.selectedArea.value,
              pcdname:this.addressForm.pcdname,
              detail:this.addressForm.pcdname+this.addressForm.detail,
            }
            let fb=this.operationFeedback({text:'保存中...'});
            if(this.addressModalType=='add'){
              Vue.api.addAddress(params).then((resp)=>{
                if(resp.status=='success'){
                  this.getList(true);
                  fb.setOptions({type:'complete',text:'保存成功'});
                  this.closeAddressForm();
                }else{
                  fb.setOptions({type:'warn',text:resp.message});
                }
              });
            }else{
              params.id=this.addressForm.id;
              Vue.api.saveAddress(params).then((resp)=>{
                if(resp.status=='success'){
                  this.getList(true);
                  fb.setOptions({type:'complete',text:'保存成功'});
                  this.closeAddressForm();
                }else{
                  fb.setOptions({type:'warn',text:resp.message});
                }
              });
            }
          },
          deleteAddress:function (index) {
            let item=this.entryList[index];
            let params={
              ...Vue.tools.sessionInfo(),
              id:item.id
            }
            this.alert({
              html:'确定删除该收获地址？',
              ok:()=>{
                let fb=this.operationFeedback({text:'删除中...'});
                Vue.api.deleteAddress(params).then((resp)=>{
                  if(resp.status=='success'){
                    fb.setOptions({type:'complete',text:'删除成功'});
                    this.entryList.splice(index,1);
                  }else{
                    fb.setOptions({type:'warn',text:resp.message});
                  }
                });
              }
            });
          },
          getDefaultAddress:function () {
            Vue.api.getDefaultAddress({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                if(resp.message){
                  this.defaultEntry=JSON.parse(resp.message);
                }
              }
            });
          },
          deleteAddress:function (item) {
            let params={
              ...Vue.tools.sessionInfo(),
              addressid:item.id
            }
            let fb=this.operationFeedback({text:'设置中...'});
            Vue.api.setDefaultAddress(params).then((resp)=>{
              if(resp.status=='success'){
                this.defaultEntry=item;
                fb.setOptions({type:'complete',text:'设置成功'});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          },
        },

        created: function () {
        },
        mounted: function () {
          //
          this.getDefaultAddress();
          this.getList(true);
          if(localStorage.getItem('selectedAddress')){
            this.curEntry=JSON.parse(localStorage.getItem('selectedAddress'));
            localStorage.setItem('selectedAddress',JSON.stringify(this.curEntry));
          }
        },

    };
</script>
