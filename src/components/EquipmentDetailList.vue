<template>
  <div class="equipmentDetailList">
    <header :style="{height:liHeight + 'px'}">
      <div>资产名称</div><div>资产编号</div><div>维护人</div>
    </header>
    <main class="mint-loadmore-box">
      <mt-loadmore
        :bottom-method="loadBottom"
        :top-method="loadTop"
        :bottom-all-loaded="allLoaded"
        :bottomPullText='bottomPullTextVal'
        :bottomDropText='bottomDropTextVal'
        :bottomLoadingText='bottomLoadingTextVal'
        topPullText
        :topDropText='topDropTextVal'
        :topLoadingText='topLoadingTextVal'
        :autoFill="false"
        @bottom-status-change="handleBottomChange"
        @top-status-change="handleTopChange"
        ref="loadmore">
        <ul class='ulcont' ref="list">
          <li v-for="(item,index) in list" v-cloak :key="index" :style="{height:liHeight + 'px'}">
            <div>{{item.name}}</div>
            <div>{{item.id}}</div>
            <div>{{item.maintainer}}</div>
          </li>
        </ul>
      </mt-loadmore>
    </main>
  </div>
</template>
<script>
  import MtLoadmore from "../../node_modules/mint-ui/packages/loadmore/src/loadmore.vue";
  import '@/assets/layui-laydate/src/laydate.js'
  import '@/assets/layui-laydate/src/theme/default/laydate.css'
  export default {
      components: {MtLoadmore},
      data(){
          return {
            list: [{name:"小型机",id:"SVR-24467","maintainer":"张三"},{name:"小型机",id:"SVR-24467","maintainer":"张三"},
              {name:"小型机",id:"SVR-24467","maintainer":"张三"},
              {name:"小型机",id:"SVR-24467","maintainer":"张三"},
              {name:"小型机",id:"SVR-24467","maintainer":"张三"},
              {name:"小型机",id:"SVR-24467","maintainer":"张三"},{name:"小型机",id:"SVR-24467","maintainer":"张三"}
            ],
            bottomPullTextVal: '上划加载更多数据',
            bottomDropTextVal: '释放更新',
            bottomLoadingTextVal: '加载中...',
            topPullTextVal: '下拉加载更多数据',
            topDropTextVal: '释放更新',
            topLoadingTextVal: '刷新中...',
            allLoaded: false,
            topStatus:'',
            bottomStatus: '',
            total:11,
            liHeight:Math.floor((document.body.clientHeight)/11)
          }
      },
      created: function () {
//        this.total = this.list.length;//表格数据的总条
      },
      methods:{
        loadTop(){ //下拉刷新
          //将list 表格数据重新初始化
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom: function () { // 上滑加载更多
          if(this.list.length==this.total){
            this.allLoaded = true;// 若数据已全部获取完毕
            this.bottomPullTextVal="数据已经全部加载";
            return;
          }
          this.list.push({name:"1111",id:"SVR-24467","maintainer":"张三"});
          this.$refs.loadmore.onBottomLoaded();
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
      }
    }
</script>
<style scoped>
.equipmentDetailList{
  height: 100%;
}
.equipmentDetailList .scroll-wrapper{
  width: 100%;
}
.equipmentDetailList header{
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  align-items:center;
  height: 9%;
  background: #f7f7f7;
  border-bottom: 1px solid #dadada;
  padding: 0 3%;
  font-size: 0.4rem;
  color: #454545;
}
.equipmentDetailList header>div{
  float: left;
  width: 33.3333%;
}
.equipmentDetailList header>div:nth-child(2){
  text-align: center;
}
.equipmentDetailList header>div:nth-child(3){
  text-align: right;
}
.equipmentDetailList>main .ulcont{
  background: #fff;
}
.equipmentDetailList>main .ulcont li{
  display: -webkit-flex;
  display: flex;
  justify-content:space-between;
  align-items:center;
  font-size: 0.39rem;
  margin: 0 3%;
  border-bottom: 1px solid #dadada;
  box-sizing: border-box;
}
.equipmentDetailList>main .ulcont li div{
    flex-grow:1;
  }
.equipmentDetailList>main .ulcont li div:nth-child(2){
  text-align: center;
}
.equipmentDetailList>main .ulcont li div:nth-child(3){
  text-align: right;
  color: #479efd;
}
  .mint-loadmore{
    overflow: scroll;
  }
</style>
