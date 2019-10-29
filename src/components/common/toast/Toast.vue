<template>
 <div class="toast" v-show='isShow'>
     {{ message }}
     
 </div>
</template>

<script>
export default {
    data(){
        return {
        message:'默认内容',
        isShow:false,
        }
    },
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     show:{
    //         type:Boolean,
    //         default:false
    //     }
    // }
    methods:{
        show(message,duration=1500){
            this.isShow=true
            this.message=message
            setTimeout(()=>{
                this.isShow=false
                this.message=''
            },duration)
        }
    }
}
</script>
<style scoped>
.toast{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #fff;
    background-color: rgba(0,0,0,0.75);
    z-index: 999;
}
</style>