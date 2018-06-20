<template>
    <div class="langWarp">
        <div
        @click="changeLang" 
        class="lang">
            <span>{{langList[lang]}}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            langList:['EN','中'],
            lang:0
        }
    },
    computed:{
        languageValue: function() {
            var curlang = this.$store.getters.lang;
            return curlang;
        }
    },
    methods:{
        init(){
            this.lang = this.languageValue
            if(this.languageValue){
                this.$i18n.locale = "en";
            }else{
                this.$i18n.locale = "zh"; 
            }
        },
        changeLang(){
            if(this.lang){
                this.lang=0
                this.$store.commit("setlang", 0);
                this.$i18n.locale = "zh";
            }else{
               this.lang=1
               this.$store.commit("setlang", 1);
               this.$i18n.locale = "en"; 
            }
        }
    },
    created(){
        this.init()
    }
}
</script>
<style scoped>
    .langWarp{
        cursor:pointer;
        margin-left: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: MicrosoftYaHei;
    }
    .lang{
        width: 32px;
        height: 32px;
        border: 1px solid #000;
        border-radius: 50%;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #141721;
    }
    .page-view.active .lang{
        border: 1px solid #8992a8;
        color: #fff;
    }
</style>


