<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isChecked="isSelectAll" class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
     <div class="price">合计:{{totalPrice}}</div>
     <div class="calculate">
       去计算({{checkLength}})
     </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'
export default {
     data(){
       return {

       }
     },
     components:{
       checkButton
     },
     computed:{
       totalPrice(){
         return '￥'+ this.$store.state.cartList.filter(item=>{
           return item.checked
         }).reduce((preValue,item)=>{
           return preValue+item.price*item.count
         },0)
       },
       checkLength(){
         return this.$store.state.cartList.filter(item=>item.checked).length
       },
       isSelectAll(){
      //    if(this.$store.state.cartList.length===0){
      //      return false
      //    }else{
      //    return !this.$store.state.cartList.find( item => !item.checked)
      //  }
      return this.$store.state.cartList.length === 0 ? false : !this.$store.state.cartList.find( item => !item.checked )
       } 
     },
     methods:{
       checkClick(){
         if(this.isSelectAll){
           this.cartList.forEach(item => item.checked = false)
         }else{
           this.cartList.forEach(item => item.checked = true)
         }
        // 不能按以下简便写法写，会出现全选按钮混乱
        // this.cartlist.forEach(item=> item.checked =!this.isSelectAll)
       }
     }
} 
</script>

<style>
.bottom-bar{
  height: 40px;
  position: fixed;
  background-color: #eee;
  bottom:40px;
  right: 0;
  left: 0;
  line-height:40px;
  display: flex;
  
}
.check-content{
  display: flex;
  align-items: center;
  margin-left:10px;
  width:60px;
  font-size: 14px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right:5px;
}
.price{
  margin-left:20px;
  flex:1;
  font-size: 14px;

}
.calculate{
  width:80px;
  color: #fff;
  background-color: red;
  font-size: 14px;
  text-align: center;

}
</style>