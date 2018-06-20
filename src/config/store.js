import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        lang:'',
        theme:null,
        certifiedBusinessStatus:'',
        coins: {
            _map: [
                {baseUsdRate:'1'},
                {baseUsdRate:'1'},
                {baseUsdRate:'1'}

            ]
        }
    },
    mutations: {
        navigate(state,nav){
            state.activeNav = nav;
        },
        setMember(state,member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state){
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        },
        setlang(state,lang){
            state.lang = lang;
            localStorage.setItem('LANGUAGE', JSON.stringify(lang));
        },
        initLang(state){
            if(localStorage.getItem('LANGUAGE') == null) {
              state.lang = "简体中文";
            }else {
                state.lang = JSON.parse(localStorage.getItem('LANGUAGE'));
            }
        },
        certiStatus(state,status){
            state.certifiedBusinessStatus=status;
        },
        setTheme(state,data){
            state.theme=data
        }
    },
    getters: {
        member(state) {
            return state.member;
        },
        isLogin(state){
            return state.member != null;
        },
        lang(state){
            return state.lang;
        },
        certifiedBusinessStatus(state){
            return state.certifiedBusinessStatus;
        },
        getTheme(state){
            console.log(state)
            return state.theme
        }
    }
});