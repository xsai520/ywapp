<template>
      <div class="notice">
          <header>{{header}}</header>
          <main>
            {{main}}
          </main>
          <footer>发布<span>{{footer}}</span></footer>
      </div>
</template>
<script>
    export default{
      data(){
          return {
              header:"国家网络安全宣传周活动方案",
              footer:"2017-08-31",
              main:""
          }
      }
    }
</script>
<style>
  .notice{
    width: 100%;
    height:100%;
    font-family: "微软雅黑";
  }
  .notice header{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    width: 100%;
    height:6%;
    padding:0 3%;
    font-size:0.4rem;
    font-weight:600;
    border-bottom: 1px solid #dadada;
  }
  .notice footer{
    position: absolute;
  }
</style>
