<template>
  <div class="home">
    <mt-swipe :auto="3000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  import MtSwipe from "../../node_modules/mint-ui/packages/swipe/src/swipe";
  import MtSwipeItem from "../../node_modules/mint-ui/packages/swipe/src/swipe-item";
    export default{
      components: {MtSwipeItem, MtSwipe}, name:'Home',
        data(){
            return {

            }
        }
    }
</script>
<style>
  .home{
    width: 100%;
    height: 100%;
  }
  .home .mint-swipe{
    height: ;
  }
</style>
