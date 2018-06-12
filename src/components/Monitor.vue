<template>
    <div class="monitor">
      <header>
        <div>
          <p>平台告警总数</p>
          <canvas id="warning" :width="canvasW" :height="canvasH"></canvas>
        </div>
      </header>
    </div>
</template>
<script>
  export default{
      data(){
          let obj = this.getPhoneWidth();
          return {
            canvasW:obj.canvasW,
            canvasH:obj.canvasH
          }
      },
    mounted(){
      this.getCircle()
    },
    methods:{
        getCircle(){
          let c=document.getElementById("warning");
          let ctx=c.getContext("2d");
          let w = c.width;
          let r = w/2;
          let lineWidth = 5;
          let cR = (w-2*lineWidth)/2;
          ctx.lineWidth = lineWidth;
          //绘制透明层的圆环
          ctx.beginPath();
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.arc(r,r,cR,0,2*Math.PI);
          ctx.stroke();
          ctx.closePath();
          //绘制百分比的圆环 ctx.createLinearGradient(x0.y0,x1,y1)x0,y0渐变开始点的坐标，x1,y1渐变结束点的坐标
          let x0 = Math.sin(2*Math.PI/3)*r;
          let y0 = Math.cos(2*Math.PI/3)*r;
          let x1 = Math.sin(3*Math.PI/2)*r;
          let y1 = Math.cos(3*Math.PI/2)*r;
          let g = ctx.createLinearGradient(x0,y0,x1,y1);
          g.addColorStop(0, 'rgba(60,233,180,0.8)'); //添加颜色点 60,233,180
         g.addColorStop(0.5, 'rgba(60,233,180,0.1)'); //添加颜色点
          g.addColorStop(1, 'rgba(255,255,255,0.1)'); //添加颜色点

          ctx.strokeStyle = g;     //使用渐变对象作为圆环的颜色
          ctx.beginPath();
          ctx.arc(r,r,cR,2*Math.PI/3,3*Math.PI/2,true);
          ctx.stroke();
          ctx.closePath();
        },
       getPhoneWidth(){
        //获取手机屏幕的宽度
         let obj = {};
         let phoneWidth = document.body.clientWidth;
         //修改canvas的宽高
         obj.canvasW = phoneWidth/3.6;
         obj.canvasH = phoneWidth/3.6;
          return  obj;
      }
    }
  }
</script>
<style>
  .monitor{
    width: 100%;
    height: 100%;
  }
  .monitor>header{
    height:28.7%;
    background: url("../assets/img/headBg.png") no-repeat;
    background-size: cover;
    overflow: hidden;

  }
  .monitor>header>div{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    width:100%;
    height: 100%;
  }
  .monitor>header>div>p{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    width:55%;
    height: 100%;
    color: #fff;
    font-size:0.45rem;
  }
  .monitor>header>canvas{
    width:45%;
    height: 100%;
  }
</style>

