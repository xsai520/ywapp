<template>
  <div class="equipmentDetailList">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded" :max-distance="150"
                 @top-status-change="handleTopChange" ref="loadmore">
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus === 'pull'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
        <span v-show="topStatus === 'drop'">释放更新</span>
      </div>

      <ul class="scroll-wrapper">
        <li v-for="item in list" @click="itemClick(item)">{{ item }}</li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
  import MtLoadmore from "../../node_modules/mint-ui/packages/loadmore/src/loadmore.vue";

    export default {
      components: {MtLoadmore},
      data(){
          return {
            list: [],
            allLoaded: false,
            topStatus: '',
            count:0
          }
      },
      created: function () {
        let i =0;
        let len=20;
        for (; i< len; i++){
          this.list.push('demo' + i);
        }
      },
      methods:{
        loadTop: function (a) {  // 刷新数据的操作
          let self = this;
          setTimeout(function () {
            self.list.splice(0, self.list.length);
            let len=20;
            for (let i =0; i< len; i++){
              self.list.push('demo' + i);
            }
            self.$refs.loadmore.onTopLoaded();
          }, 2000);
        },
        loadBottom: function (a) { // 加载更多数据的操作
          this.count++;
          console.log(this.count)
          //load data

          //this.allLoaded = true;// 若数据已全部获取完毕
          let self = this;
          setInterval(function () {
            let i =0;
            let len = 10;
            for (; i< len; i++){
              self.list.push('dddd' + i);
            }
            self.$refs.loadmore.onBottomLoaded();
          }, 2000);

        },
        handleTopChange: function (status) {
          this.topStatus = status;
        },
        itemClick: function (data) {
          console.log('item click, msg : ' + data);
        }
      }
    }
</script>
<style>
.equipmentDetailList{
  height: 100%;
}
</style>
